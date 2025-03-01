import db from '@/lib/mongodb';
import React from 'react';
import { ObjectId } from 'mongodb';
import { IoCheckmarkDone, IoSchoolOutline } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import { SlArrowDown } from "react-icons/sl";
import { CiCircleQuestion, CiStickyNote, CiLock } from "react-icons/ci";
import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { SignInStudent } from '@/app/signIn';
import { addFileNo, topicList, totalFileNo } from '@/app/utils/functions';
import MdText from '@/app/utils/mdText';
import Progressbar from './[node]/components/progressbar';
import styles from './page.module.css';

const Course = async ({ params }) => {
  const course = await db.collection("courses").findOne({ _id: new ObjectId(params.course) });
  const nodes = await db.collection("nodes").find({ course: params.course }).toArray();
  const session = await getServerSession(authOptions);
  const student = session ? await db.collection("students").findOne({ email: session.user.email }) : null;

  // const completed = student?.courses?.[params.course] ?? 0;
  // const completed = student?student.courses&&student.courses[params.course]?student.courses[params.course]:0:-1;
  const chapters = topicList(nodes, null, 0, []);
  const chaptersFinal = addFileNo(chapters);
  const totalFiles = totalFileNo(chapters);
  const completed = totalFiles

  return (
    <div className={styles.container}>
      <div className={styles.courseDetails}>
        <Image src={course.imgurl} className={styles.courseImage} width={520} height={250} />
        <p className={styles.category}>{course.category}</p>
        <h2 className={styles.title}>{course.title}</h2>
        <Progressbar completed={completed} total={totalFiles} />
        <div className={styles.infoRow}>
          <div>
            <MdOutlineClass /> <span>Level</span>
          </div>
          <div>
            Class {course.class.min === course.class.max ? `${course.class.min}` : `${course.class.min}-${course.class.max}`}
          </div>
        </div>
        <div className={styles.infoRow}>
          <div>
            <IoSchoolOutline /> <span>Instructor</span>
          </div>
          <div>{course.instructor}</div>
        </div>
        <p className={styles.about}>{course.about}</p>
        {/* <MdText>{course.description}</MdText> */}
      </div>
      <div className={styles.courseContent}>
        {session ? (
          completed >= totalFiles ? (
            <div className={styles.completedMessage}>
              Course completed{' '}
              <Link href={`/certificate/${session.user.name}/${course.title}`} className={styles.certificateLink}>
                view certificate
              </Link>
            </div>
          ) : null
        ) : (
          <div className={styles.signInMessage}>
            <SignInStudent className={styles.button} />
          </div>
        )}
        {chaptersFinal.map((e) =>             
                    <>
                      {e.type==='path'?
                        <div style={{marginTop:"5px",marginLeft:`${20+e.lvl*20}px`, padding:"5px",  borderBottom:"1px solid lightgray", borderRadius:"5px"}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            {/* <div style={{paddingTop:"5px", paddingRight:"7px"}}>
                              <SlArrowDown />
                            </div> */}
                            <p style={{fontWeight:"bold", fontSize:(10 - e.lvl)*2}} > {e.title}</p>
                          </div>
                        </div>
                        :
                        <>
                        {e.fileNo<completed?
                        <div style={{marginTop:"5px",marginLeft:`${20+e.lvl*20}px`, padding:"5px",  borderBottom:"1px solid lightgray", borderRadius:"5px"}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <div style={{paddingTop:"3px", paddingRight:"5px"}}>
                              {e.type==='file'?<CiStickyNote color='gray' />:<CiCircleQuestion color='gray' />}
                            </div>
                            <Link href={`/student/${params.course}/${e.id}`} style={{fontWeight:"normal", fontSize:14, textDecoration:'underline'}} > {e.title}</Link>
                            <div style={{paddingLeft:"10px", fontSize:12, color:'#e7b3ff', paddingTop:'5px'}}>
                              <FaCheckCircle />
                            </div>
                          </div>
                        </div>
                        :
                        e.fileNo===completed?
                        <div style={{marginTop:"5px",marginLeft:`${20+e.lvl*20}px`, padding:"5px",  borderBottom:"1px solid lightgray", borderRadius:"5px"}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                          <div style={{paddingTop:"3px", paddingRight:"5px"}}>
                              {e.type==='file'?<CiStickyNote color='gray' />:<CiCircleQuestion color='gray' />}
                            </div>
                            <Link href={`/student/${params.course}/${e.id}`} style={{fontWeight:"bold", color:"#9757b5", fontSize:14, textDecoration:'underline'}} > {e.title}</Link>
                          </div>
                        </div>
                        :
                        <div style={{marginTop:"5px",marginLeft:`${20+e.lvl*20}px`, padding:"5px",  borderBottom:"1px solid lightgray", borderRadius:"5px"}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <div style={{paddingTop:"3px", paddingRight:"5px", opacity:"60%"}}>
                              {e.type==='file'?<CiStickyNote color='gray' />:<CiCircleQuestion color='gray' />}
                            </div>
                            <p style={{fontWeight:"normal", fontSize:14, opacity:"60%"}}> {e.title}</p>
                            <div style={{paddingLeft:"10px", opacity:"60%"}}>
                              <CiLock />
                            </div>
                          </div>
                        </div>
                        }
                        </>
                      }
                  </>      
                  )}
      </div>
    </div>
  );
};

export default Course;
