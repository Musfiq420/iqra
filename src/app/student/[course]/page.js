import db from '@/lib/mongodb';
import React from 'react'
import { ObjectId } from 'mongodb';
import { IoCheckmarkDone } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { SlArrowDown } from "react-icons/sl";
import { CiCircleQuestion, CiStickyNote } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import { SignInStudent } from '@/app/signIn';
import { addFileNo, topicList, totalFileNo } from '@/app/utils/functions';
import MdText from '@/app/utils/mdText';
import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { FaCheckCircle } from 'react-icons/fa';
import Progressbar from './[node]/components/progressbar';


const Course = async ({params}) => {
  const course = await db.collection("courses").findOne({_id: new ObjectId(params.course)})
  const nodes = await db.collection("nodes").find({course:params.course}).toArray();
  const session = await getServerSession(authOptions);
  const student = session?await db.collection("students").findOne({email: session.user.email}):null;
  
  const completed = student?student.courses&&student.courses[params.course]?student.courses[params.course]:0:-1;
  
  const chapters = topicList(nodes, null, 0, []);

  const chaptersFinal = addFileNo(chapters);

  const totalFiles = totalFileNo(chapters);

  console.log(totalFiles)
  console.log(completed)
  return (
    <>
      <div style={{ marginLeft:"40px", marginRight:"40px", marginBottom:"5vh", marginTop:"10vh", display:"flex", flexDirection:"row", height:"85vh"}}>
        
        <div style={{width:"50%", margin:"5px", overflowY:"auto", padding:"20px", borderRight:"1px solid lightgray", borderRadius:"5px"}}>
          <Image src={course.imgurl} style={{borderRadius:"5px"}} width={520} height={250} />
          <br />
          <br />
          <p style={{color:"#7A4E8F", opacity:0.7}}>{course.category}</p>
          {/* #FF9D25 */}
          <h2 style={{paddingBottom:"10px", paddingTop:"5px"}}>
        {course.title}
          </h2>
          <Progressbar completed={completed} total={totalFiles} />
          
          <div style={{width:'60%', display:"flex", flexDirection:"row", justifyContent:'space-between', color:"gray", borderBottom:'1px solid lightgray'}}>
            <div style={{paddingBottom:"5px",color:'black',paddingTop:"10px",}}>
              <MdOutlineClass /> <span style={{color:'black'}} >Level </span>           
            </div>
            <div style={{paddingBottom:"0px",paddingTop:"10px",}}>
            Class {course.class.min===course.class.max?`${course.class.min}`:`${course.class.min}-${course.class.max}`}
            </div>
            
          </div>
          <div style={{width:'60%',display:"flex", flexDirection:"row",  justifyContent:'space-between', color:"gray", borderBottom:'1px solid lightgray'}}>
            <div style={{paddingBottom:"10px", paddingTop:"10px",color:'black'}}>
              <IoSchoolOutline /> <span style={{color:'black'}} >Instructor </span>   
            </div>
            <div style={{paddingBottom:"0px",paddingTop:"10px",}}>
            {course.instructor}
            </div>
            
          </div>
          
          <br />
          <div style={{color:'#383838'}}>
            <p>{course.about}</p>
          </div>
          <br />
          <div style={{color:'#383838'}}>
            <MdText>{course.description}</MdText>
          </div>
          
        </div>
        <div style={{ margin:"5px", width:"50%",  overflowY:"scroll"}}>
          {session?
          completed>=totalFiles?
          <div style={{padding:"20px", marginBottom:"20px",  borderBottom:"1px solid lightgray", borderRadius:"5px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <p style={{padding:"5px"}}>Course completed <Link href={`/certificate/${session.user.name}/${course.title}`} style={{color:'#9757b5', textDecoration:'underline'}}>view certificate</Link></p>
          </div>
          :null
          :<div style={{padding:"20px", marginBottom:"20px", marginLeft:"20px", borderBottom:"1px solid lightgray",  display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            
            <SignInStudent stl={{padding:"10px", backgroundColor:'#9757b5', color:'white', borderRadius:'5px', border:'none', cursor:"pointer"}} />
          </div>}
          
          {
              chaptersFinal.map((e) =>             
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
                  )
          } 
        </div>
        </div>
        </>
  )
}

export default Course