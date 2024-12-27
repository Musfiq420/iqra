'use client'

import React, { useState } from "react";
import { addStyles, EditableMathField, StaticMathField } from "react-mathquill";

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.
addStyles();

const EditableMathExample = () => {
  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

  return (
    <div style={{marginTop:"80px"}}>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
      />
      <p>{latex}</p>
    </div>
  );
};

export default EditableMathExample