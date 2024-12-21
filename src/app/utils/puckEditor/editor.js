'use client'
import { Drawer, Puck, Render } from '@measured/puck';
import React, { useState } from 'react'
import "@measured/puck/puck.css";
import { config } from './config';
import './puck-style.css'

const Editor = ({data, setData}) => {
  const [state, setState] = useState("editor");

  
  return (
    <div style={{padding:"10px", height:"80vh"}}>
    {/* <button onClick={() => setState("render")}>Render</button>
    <button onClick={() => setState("editor")}>Editor</button> */}
    {
      state==="editor"?
      <Puck config={config} data={data} onChange={(data) => setData(data)}>
        <div style={{display:"flex", flexDirection:'row'}}>
          <div style={{display:"flex", flexDirection:'row'}}>
            <button onClick={() => setState("render")}>Render</button>
            <button onClick={() => setState("editor")}>Editor</button>  
          </div>
          <Drawer direction='horizontal'>
            <div style={{display:"flex", flexDirection:"row", flexWrap:'wrap'}}>
            <Drawer.Item name="Markdown" index={0} />
            <Drawer.Item name="Article" index={1} />
            <Drawer.Item name="IFrame" index={2} />
            <Drawer.Item name="MCQ" index={3} />
            <Drawer.Item name="ImageHotspot" index={4} />
            <Drawer.Item name="TabbedView" index={5} />
            <Drawer.Item name="Accordion" index={6} />
            <Drawer.Item name="RiveAnim" index={7} />
            <Drawer.Item name="Model3D" index={8} />
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
  )
}

export default Editor