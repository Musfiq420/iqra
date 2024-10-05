'use client'
import Link from 'next/link'
import React, { useRef } from 'react'
import { CiCircleQuestion } from 'react-icons/ci'
import { FaRegFile, FaRegFolder } from 'react-icons/fa'

const ChapterList = ({chapters, params, handleSort, nodes}) => {

  const dragItem = useRef(null);
	const dragOverItem = useRef(null);


  return (
    <div>
      {
            chapters.map((e, i) =>             
                <div style={{paddingLeft:`${20+e.lvl*20}px`}}>
                  <div>
                    {e.type==='path'?
                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"5px", border:"2px solid lightgray", borderRadius:"5px", width:"80%"}}>
                        <FaRegFolder />
                        <span style={{marginLeft:"10px", marginRight:"40px", fontWeight:"bold", fontSize:(10 - e.lvl)*2}} > {e.index+1}. {e.title} </span>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/add/${e.id}`} > Add</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/edit/${e.id}`}> Rename</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/delete/${e.id}`} > Delete</Link>
                        
                        
                      </div>
                      :
                      <div
                      key={i}
                      draggable
                      onDragStart={(f) => (dragItem.current = e.id)}
                      onDragEnter={(f) => (dragOverItem.current = e.id)}
                      onDragEnd={() => {
                        const dragNode = nodes.filter((e) => e._id === dragItem.current)[0];
                        const dragOverNode = nodes.filter((e) => e._id === dragOverItem.current)[0];
                        const dragOverSiblings = nodes.filter((e) => e.parent === dragOverNode.parent);
                        
                        console.log(dragOverSiblings);
                        const sortedList = dragOverSiblings.sort((a,b) => a.index.localeCompare(b.index));
                        const dragOverIdx = sortedList.findIndex((e) => e._id === dragOverNode._id);
                        console.log(dragOverIdx);  

                        handleSort(dragNode, dragOverNode, dragOverIdx, dragOverSiblings);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      
                      style={{display:"flex", flexDirection:"row", alignItems:"center", padding:"5px", border:"2px solid lightgray", borderRadius:"5px", width:"80%"}}>
                        {e.type==='file'?<FaRegFile />:<CiCircleQuestion />}
                        <Link href={`/teacher/${params.course}/${e.id}`} style={{marginLeft:"10px", marginRight:"40px", fontWeight:"normal", fontSize:14}} > {e.index+1}. {e.title}</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/edit/${e.id}`}> Rename</Link>
                        <Link style={{padding:"5px"}} href={`/teacher/${params.course}/delete/${e.id}`} > Delete</Link>
                      </div>
                      
                    }
                  </div>
                </div>
                
            )
        }       
    </div>
  )
}

export default ChapterList