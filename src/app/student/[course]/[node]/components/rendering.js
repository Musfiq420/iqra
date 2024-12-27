'use client'
import { config } from '@/app/utils/puckEditor/config';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProgressBar from '@ramonak/react-progress-bar';
import { CiStickyNote } from 'react-icons/ci';
// import { config } from '@/app/utils/puckEditor/config'

function getNextChapter(data, currentId) {
  // Sort the data by index to ensure correct order
  const sortedData = data
    .filter(item => (item.type === 'file'||item.type === 'quiz'))
    .sort((a, b) => a.index - b.index);

  // Find the current chapter based on fileNo
  const currentChapterIndex = sortedData.findIndex(item => item.id.toString() === currentId);

  // Check if it's the last chapter
  if (currentChapterIndex === -1 || currentChapterIndex === sortedData.length - 1) {
    return 'finished';
  }

  // Return the next chapter
  return sortedData[currentChapterIndex + 1];
}

const Rendering = ({data, params, chapters, currentNode, addCourseProgress, chapter}) => {
  const [slide, setSlide] = useState(0);
  const router = useRouter()

  console.log(currentNode);

  return (
    <div>
        <div style={{width:"100%", height:"10vh",  padding:'10px'}}>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:24, paddingBottom:'5px'}}>
            <div style={{paddingTop:"6px", paddingRight:"5px"}}>
              <CiStickyNote color='gray' />
            </div>
            <p style={{fontWeight:"normal"}} > {chapter.title}</p>
          </div>
          <ProgressBar isLabelVisible={false} bgColor='#e7b3ff' height='5px' completed={((slide+1)/(data.length))*100} />
        </div>
        <div style={{ height: "70vh", overflowY: "scroll" }}>
          <div style={{ display: "flex", justifyContent: "start", alignItems: "center", paddingTop: "5%", flexDirection: "column" }}>
            {config.components[data[slide].type].render(data[slide].props)}
          </div>
        </div>
        <hr style={{opacity:0.7}} />
        <div style={{display:"flex", flexDirection:"row",height:"10vh", justifyContent:"center" }}>
        
          {slide!==0?<button style={{border:'none',margin:"10px", padding:"5px", paddingLeft:"20px", paddingRight:"20px", backgroundColor:"#9757b5", color:"white", cursor:"pointer", borderRadius:"5px"}} onClick={() => setSlide(slide-1)}>Prev</button>:null}
          {/* <div style={{width:'min-content', textWrap:'nowrap', marginTop:"5px",backgroundColor:"#9757b5", padding:"10px", color:"white", cursor:"pointer", borderRadius:"5px", }}>
                  Go to courses
                </div> */}
          <button style={{border:'none',margin:"10px", padding:"5px", paddingLeft:"20px", paddingRight:"20px", backgroundColor:"#9757b5", color:"white", cursor:"pointer", borderRadius:"5px"}} onClick={async() => {
            const nextCh = getNextChapter(chapters, currentNode);
            console.log(nextCh)
            if(slide<data.length-1)
              setSlide(slide+1)
            else if(nextCh!=='finished')
            {
              await addCourseProgress();
              router.push(`/student/${params.course}/${nextCh.id}`);
            } else {
              await addCourseProgress();
              router.push(`/student/${params.course}`);
            }
          
          }}>Next</button>
        </div>
    </div>
  )
}

export default Rendering