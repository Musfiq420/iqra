import db from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { addFileNo, topicList, totalFileNo } from '@/app/utils/functions'

import Rendering from './components/rendering'
import Link from 'next/link'
import { CiLock, CiStickyNote } from 'react-icons/ci'
import { FaCheckCircle } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";

import RenderingQuiz from './components/rendering quiz'


const getFileIndex = (chapters, nodeId) => {
  const res = chapters.find(e => e.id.toString() === nodeId);
  return res.fileNo;
}

const Node = async ({params}) => {
  const course = await db.collection("courses").findOne({_id: new ObjectId(params.course)})
  const nodes = await db.collection("nodes").find({course:params.course}).toArray();
  const chapter = await db.collection("nodes").findOne({_id: new ObjectId(params.node)})


  const session = await getServerSession(authOptions);
  const student = session?await db.collection("students").findOne({email: session.user.email}):null;
  

  const chapters = topicList(nodes, null, 0, []);
  const chaptersFinal = addFileNo(chapters);
  const fileNo = getFileIndex(chaptersFinal, params.node);

  console.log(chaptersFinal)

  const completed = student?student.courses&&student.courses[params.course]?student.courses[params.course]:0:-1;

  const totalFiles = totalFileNo(chapters);

  const addCourseProgress = async () => {
    "use server"
    const completed = student?student.courses&&student.courses[params.course]?student.courses[params.course]:0:-1;
    const updatedObj = {
      "courses": {
        [params.course]: completed + 1
      }
    }
    if(completed<=fileNo)
    {
      await db.collection("students").updateOne({email: session.user.email}, { $set: {
        [`courses.${params.course}`]: completed + 1
      }}  );
    }
    
    revalidatePath(`/student/${params.course}`);
    redirect(`/student/${params.course}`);

  }

  const chapterFailed =  async() => {
    'use server'
    redirect(`/student/${params.course}`);
  }
  

  if(!chapter.data)
    return 
    <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:'100px'}}>
      <p>No Cards added</p>
    </div>
  
  return (
    <div style={{height:"100vh", display:"flex", width:"100%"}}>
      <div style={{ margin:"5px", width:"30%", paddingTop:"50px", overflowY:"scroll", borderRight:'1px solid lightgray'}}>          
        <div style={{marginTop:"5px",marginLeft:`${20}px`, padding:"5px"}}>
          <h3 style={{paddingBottom:'5px'}}>{course.title}</h3>
          <p style={{opacity:0.7, fontSize:14, paddingBottom:'5px'}}>{course.instructor}</p>
          <hr style={{marginBottom:'15px', opacity:0.3}} />
        </div>
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
        <div style={{paddingTop:"60px", width:"70%"}}>
        {chapter.type==='file'?<Rendering data={chapter.data.content} params={params} chapters={chaptersFinal} currentNode={params.node} addCourseProgress={addCourseProgress} chapter={chapter} />
        :<RenderingQuiz data={chapter.data.content} params={params} chapters={chaptersFinal} currentNode={params.node} addCourseProgress={addCourseProgress} chapter={chapter} />}
        </div>
    </div>
    
  )
}

export default Node