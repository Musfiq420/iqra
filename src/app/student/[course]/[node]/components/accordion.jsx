'use client'
import MdText from "@/app/utils/mdText";
import React, { useState } from "react";

const Accordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={styles.accordion}>
      {data.map((item, index) => (
        <div key={index} style={styles.accordionItem}>
          <div
            style={styles.accordionHeader}
            onClick={() => handleClick(index)}
          >
            {item.title}
            <span style={styles.icon}>
              {index === activeIndex ? "-" : "+"}
            </span>
          </div>
          <div
            style={{
              ...styles.accordionBody,
              display: index === activeIndex ? "block" : "none",
            }}
          >
            <MdText>{item.body}</MdText>
          </div>
        </div>
      ))}
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  accordion: {
    width: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  accordionItem: {
    borderBottom: "1px solid #ccc",
  },
  accordionHeader: {
    padding: "15px",
    cursor: "pointer",
    backgroundColor: "#f7f7f7",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
  },
  accordionBody: {
    padding: "15px",
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
    color: "#333",
  },
  icon: {
    fontWeight: "bold",
    fontSize: "18px",
  },
};
export default Accordion