'use client'
import { Drawer, Puck, Render } from '@measured/puck';
import React, { useState } from 'react'
import "@measured/puck/puck.css";
import { config } from './config';

const Editor = ({data, setData}) => {
  const [state, setState] = useState("editor");

  
  return (
    <div style={{padding:"10px"}}>
    {/* <button onClick={() => setState("render")}>Render</button>
    <button onClick={() => setState("editor")}>Editor</button> */}
    <div>
    {
      state==="editor"?
      <Puck config={config} data={data} onChange={(data) => setData(data)}>
        <div style={{display:"flex", flexDirection:'row'}}>
          <div style={{display:"flex", flexDirection:'row'}}>
            <button onClick={() => setState("render")}>Render</button>
            <button onClick={() => setState("editor")}>Editor</button>  
          </div>
          <Drawer direction='horizontal'>
            <div style={{display:"flex", flexDirection:"row"}}>
            <Drawer.Item name="Markdown" index={0} />
            <Drawer.Item name="IFrame" index={1} />
            <Drawer.Item name="MCQ" index={2} />
            <Drawer.Item name="ImageHotspot" index={3} />
            <Drawer.Item name="TabbedView" index={4} />
            <Drawer.Item name="Accordion" index={5} />
            <Drawer.Item name="RiveAnim" index={6} />
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

export default Editor