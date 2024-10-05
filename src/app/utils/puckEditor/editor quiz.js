'use client'
import { Drawer, Puck, Render } from '@measured/puck';
import React, { useState } from 'react'
import "@measured/puck/puck.css";
import { configQuiz } from './config quiz';

const EditorQuiz = ({data, setData}) => {
  const [state, setState] = useState("editor");

  
  return (
    <div style={{padding:"10px"}}>
    {/* <button onClick={() => setState("render")}>Render</button>
    <button onClick={() => setState("editor")}>Editor</button> */}
    <div>
    {
      state==="editor"?
      <Puck config={configQuiz} data={data} onChange={(data) => setData(data)}>
        <div style={{display:"flex", flexDirection:'row'}}>
          <div style={{display:"flex", flexDirection:'row'}}>
            <button onClick={() => setState("render")}>Render</button>
            <button onClick={() => setState("editor")}>Editor</button>  
          </div>
          <Drawer direction='horizontal'>
            <div style={{display:"flex", flexDirection:"row"}}>
            <Drawer.Item name="MCQ" index={0} />
            </div>
          </Drawer>
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>
          
          <div style={{width:"50%", height:"50vh", overflowY:"scroll", padding:"10px"}}>
            <Puck.Preview />
          </div>
          <div style={{width:"50%", height:"50vh", overflowY:"scroll"}}>
            <Puck.Fields />
          </div>
        </div>
      
      {/* <button onClick={() => onPublish(appState.data)}>Print</button> */}
      </Puck>
      :
      <div style={{display:"flex", flexDirection:"row"}}>
          <div>
            <button onClick={() => setState("render")}>Render</button>
            <button onClick={() => setState("editor")}>Editor</button>  
          </div>
        
        <div style={{ height:"50vh", overflowY:"scroll"}}>
          <Render config={config} data={data} />
        </div>
        <div style={{width:"45%"}} />
      </div>
      
    }
    </div>
  </div>
  )
}

export default EditorQuiz