'use client'
import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import Editor from '@/app/utils/puckEditor/editor'
import { initialData } from '@/app/utils/puckEditor/config'
import EditorQuiz from '@/app/utils/puckEditor/editor quiz'

const LessionConfig = ({chapter, params, type}) => {
  const [data, setData] = useState(chapter?chapter.data?chapter.data:initialData:initialData)
  const router = useRouter()

  const goBackAndReload = () => {
    router.back(); // Go back to the previous page
    setTimeout(() => {
      window.location.reload(); // Reload the page after navigating back
    }, 100); // Slight delay to ensure the navigation happens before reload
  };
  

  const addData = async () => {
    const res = await fetch(`/api/addDataChapter`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data: data,
      id: chapter._id
    }),
    });

    const result = await res.json()
    
    goBackAndReload();
    
    

  }
  
  return (
    <div style={{}}>
        <div>
          {type==='file'?
          <Editor data={data} setData={setData} />:
          <EditorQuiz data={data} setData={setData} />
          }
        </div>
        
        
        <button onClick={addData}>Submit</button>
    </div>
    
      )
}

export default LessionConfig