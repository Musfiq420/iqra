import db from '@/lib/mongodb';
import React from 'react'
import { ObjectId } from 'mongodb';
import { IoCheckmarkDone } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { SlArrowDown } from "react-icons/sl";
import { CiStickyNote } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { SignInStudent } from '@/app/signIn';
import { addFileNo, topicList, totalFileNo } from '@/app/utils/functions';
import MdText from '@/app/utils/mdText';
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';


const Course = async ({params}) => {
  const course = await db.collection("courses").findOne({_id: new ObjectId(params.course)})
  const nodes = await db.collection("nodes").find({course:params.course}).toArray();
  const session = await getServerSession(authOptions);
  const student = session?await db.collection("students").findOne({email: session.user.email}):null;
  
  const completed = student?student.courses&&student.courses[params.course]?student.courses[params.course]:0:-1;
  
  const chapters = topicList(nodes, null, 0, []);

  const chaptersFinal = addFileNo(chapters);

  const totalFiles = totalFileNo(chapters);


  return (
    <div style={{marginTop:"80px"}}>
        <div style={{display:"flex", flexDirection:'row', padding:"30px",justifyContent:'center', alignItems:'flex-start'}}>
            <Image src={course.imgurl} style={{borderRadius:"5px"}} width={450} height={220} />
            
            <div style={{marginLeft:"40px"}}>
                <p style={{color:"#7A4E8F", opacity:0.7}}>{course.category}</p>
                <h2 style={{padding:"5px"}}>
                    {course.title}
                </h2>
                <div style={{display:"flex", flexDirection:"row",  color:"gray"}}>
                    <div style={{paddingRight:"5px", paddingLeft:"5px", paddingTop:"2px"}}>
                    <IoSchoolOutline />
                    </div>
                    <div style={{padding:"0px"}}>
                    {course.instructor}
                    </div>
                    
                </div>
                <div style={{display:"flex", flexDirection:"row",  color:"gray"}}>
                    <div style={{padding:"5px"}}>
                    <MdOutlineClass />            
                    </div>
                    <div style={{padding:"2px"}}>
                    class {course.class.min===course.class.max?`${course.class.min}`:`${course.class.min}-${course.class.max}`}
                    </div>
                    
                </div>
                <br />
                <div style={{padding:"5px",color:'#383838'}}>
                    <p>{course.about}</p>
                </div>

                <div style={{textAlign:'center', textWrap:'nowrap', marginTop:"5px",backgroundColor:"#9757b5", padding:"10px", color:"white", cursor:"pointer", borderRadius:"5px", }}>
                  Start
                </div>
            </div>
        </div>  
        <hr style={{marginLeft:"20%", marginRight:'20%'}} />
        <div style={{display:"flex", flexDirection:'row', padding:"30px",justifyContent:'center', alignItems:'flex-start'}}>
            <div style={{color:'#383838'}}>
                <MdText>{course.description}</MdText>
            </div>
            <div>
            {
              chaptersFinal.map((e) =>             
                    <>
                      {e.type==='path'?
                        <div style={{marginTop:"5px",marginLeft:`${30+e.lvl*10}px`, padding:"5px"}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            {/* <div style={{paddingTop:"5px", paddingRight:"7px"}}>
                              <SlArrowDown />
                            </div> */}
                            <p style={{ fontSize:(10 - e.lvl)*2}} > {e.title}</p>
                          </div>
                        </div>
                        :
                        <>
                        {e.fileNo<completed?
                        <div style={{marginTop:"5px",marginLeft:`${30+e.lvl*10}px`, marginRight:'20px', padding:"5px", borderRadius:"5px", backgroundColor:e.id.toString() === params.node?"#fbf2ff":null}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <div style={{paddingTop:"3px", paddingRight:"5px"}}>
                              {e.type==='file'?<CiStickyNote color='gray' />:<CiCircleQuestion color='gray' />}
                            </div>
                            <Link href={`/student/${params.course}/${e.id}`} style={{fontWeight:"normal", fontSize:14}} > {e.title}</Link>
                            <div style={{paddingLeft:"10px", fontSize:12, color:'#e7b3ff', paddingTop:'5px'}}>
                              <FaCheckCircle />
                            </div>
                          </div>
                        </div>
                        :
                        e.fileNo===completed?
                        <div style={{marginTop:"5px",marginLeft:`${30+e.lvl*10}px`,marginRight:'20px',  padding:"5px", borderRadius:"5px", backgroundColor:e.id.toString() === params.node?"#fbf2ff":null}}>
                          <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                            <div style={{paddingTop:"3px", paddingRight:"5px"}}>
                              {e.type==='file'?<CiStickyNote color='gray' />:<CiCircleQuestion color='gray' />}
                            </div>
                            <Link href={`/student/${params.course}/${e.id}`} style={{fontWeight:"normal", fontSize:14}} > {e.title}</Link>
                          </div>
                        </div>
                        :
                        <div style={{marginTop:"5px",marginLeft:`${30+e.lvl*10}px`,marginRight:'20px',  padding:"5px", borderRadius:"5px", backgroundColor:e.id.toString() === params.node?"#fbf2ff":null}}>
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
                  )
          } 
            </div>
        </div>
    </div>
  )
}

export default Course