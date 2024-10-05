'use client'
import MdText from "@/app/utils/mdText";
import { useState } from "react";

const TabbedView = ({ text,tabs }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    return (
      <div>
        <div style={{padding:"20px"}}>
          <MdText>{text}</MdText>
        </div>
        
        <div style={styles.container}>
          
          {/* Tab Titles */}
          <div style={styles.tabTitles}>
            {tabs.map((tab, index) => (
              <div
                key={index}
                style={{
                  ...styles.tabTitle,
                  ...(index === activeTab ? styles.activeTab : {}),
                }}
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </div>
            ))}
          </div>
    
          {/* Tab Body */}
          
          <div style={styles.tabBody}>
              <MdText>{tabs[activeTab].body}</MdText>
          </div>
        </div>
      </div>
    );
  };
  
  // CSS-in-JS style object
  const styles = {
    container: {
      // width: "400px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
    },
    tabTitles: {
      display: "flex",
      cursor: "pointer",
      backgroundColor: "#f1f1f1",
    },
    tabTitle: {
      flex: 1,
      padding: "10px 15px",
      textAlign: "center",
      backgroundColor: "#e0e0e0",
      borderBottom: "2px solid transparent",
      transition: "all 0.3s",
    },
    activeTab: {
      backgroundColor: "#fff",
      borderBottom: "2px solid #007bff",
      fontWeight: "bold",
    },
    tabBody: {
      padding: "20px",
      backgroundColor: "#fff",
      color: "#333",
      minHeight: "150px",
    },
  };

  export default TabbedView