'use client'
import { config } from '@/app/utils/puckEditor/config';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ProgressBar from '@ramonak/react-progress-bar';
import MCQ from './mcq';
import { CiCircleQuestion } from 'react-icons/ci';
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

const getTotal = (quizes) => {
  let total = 0;
  quizes.forEach(element => {

    if(element.type==="MCQ")
    {
      const text = element.props.text;
      console.log(element)
      // const temp = text.match(/(@\[[^\]]+\]\(\d+\))/g);
      const temp = text.match(/@[^@]*:[^@]*@/g);
      const answers = temp? temp.map((e) => e.slice(1)):[];
      total = total + answers.length;
    }
  });

  console.log("Total: "+total);

  return total;
}

const RenderingQuiz = ({data, params, chapters, currentNode, addCourseProgress, chapter}) => {
  const [slide, setSlide] = useState(0);
  const [mark, setMark] = useState(0);
  const [total, setTotal] = useState(0);
  const [finish, setFinish] = useState(false);
  const router = useRouter()

  const addMark = () => {
    setMark(mark+1);
  }

  useEffect(() => {
    setTotal(getTotal(data));
  }, [])

  console.log(data);

  return (
    <div>
        <div style={{width:"100%", height:"5vh",  padding:'10px'}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:24, paddingBottom:'5px'}}>
            <div style={{paddingTop:"6px", paddingRight:"5px"}}>
              <CiCircleQuestion color='gray' />
            </div>
            <p style={{fontWeight:"normal"}} > {chapter.title}</p>
          </div>
          <ProgressBar isLabelVisible={false} bgColor='#e7b3ff' height='5px' completed={((slide+1)/(data.length))*100} />
        </div>
        
        {!finish?
        <>
        <div style={{height:"75vh", display:"flex",justifyContent:"center", alignItems:"center", padding:"10%"}}>
          {/* {config.components[data[slide].type].render(data[slide].props)} */}
          <MCQ instruction={data[slide].props.instruction} text={data[slide].props.text} explanation={""} style={data[slide].props.style} addMark={addMark} addTotal={null} />
          
          
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
            else 
            {
              setFinish(true);
            } 
          
          }}>Next</button>
        </div>
        </>:
        <div style={{height:"75vh", display:"flex",justifyContent:"center", alignItems:"center", padding:"10%"}}>
          <div>
            <h3>Quiz Finished</h3>
            <p>Marks: {((mark/total)*100).toFixed(2)}%</p>
            {(mark/total)>0.8?
            <div>
              <h4>Chapter Passed</h4>
              <button style={{border:'none',margin:"10px", padding:"5px", paddingLeft:"20px", paddingRight:"20px", backgroundColor:"#9757b5", color:"white", cursor:"pointer", borderRadius:"5px"}} onClick={async() => {
                const nextCh = getNextChapter(chapters, currentNode);
                if(nextCh!=='finished')
                  {
                    await addCourseProgress();
                    router.push(`/student/${params.course}/${nextCh.id}`);
                  } else {
                    await addCourseProgress();
                    router.push(`/student/${params.course}`);
                  }
              }}>Next</button>
            </div>
            :
            <div>
              <h4>Chapter Failed</h4>
              <button style={{border:'none',margin:"10px", padding:"5px", paddingLeft:"20px", paddingRight:"20px", backgroundColor:"#9757b5", color:"white", cursor:"pointer", borderRadius:"5px"}} onClick={async() => {
                router.replace(`/student/${params.course}/${params.node}`);
                window.location.reload();
              }}>Start Again</button>
            </div>
            }
          </div>
        </div>
        }
    </div>
  )
}

export default RenderingQuiz