'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { CiStickyNote, CiCircleQuestion, CiLock } from 'react-icons/ci';
import { GoSidebarCollapse } from "react-icons/go";
import styles from '../page.module.css';
import { FaCheckCircle } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";


const Sidebar = ({ course, chaptersFinal, completed, params }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log("sidebar is "+showSidebar)
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Floating Button for Mobile */}
      <button
        className={styles.floatingButton}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <GoSidebarCollapse size={24} />
      </button>

      {/* Sidebar */}
      <div className={`${showSidebar ? styles.showSidebar : styles.hideSidebar}`}>

        <button
            className={styles.crossButton}
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
        >
            <MdCancel size={24} />
        </button>
        <div style={{ marginTop: '5px', marginLeft: '20px', padding: '5px' }}>
          <h3>{course.title}</h3>
          <p style={{ opacity: 0.7, fontSize: 14 }}>{course.instructor}</p>
          <hr style={{ marginBottom: '15px', opacity: 0.3 }} />
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
    </>
  );
};

export default Sidebar;
