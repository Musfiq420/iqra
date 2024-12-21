'use client'

import React, { useState } from 'react'
import MathInput from 'react-math-keyboard'
import { addStyles, EditableMathField } from 'react-mathquill'

addStyles()

const Page = () => {
  const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2')


  return (
    <div style={{paddingTop:"70px"}}>
      <div>
        {/* <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex())
          }}
          
        /> */}
        <MathInput setValue={setLatex} />
      </div>
      <p>{latex}</p>
    </div>
  )
}

export default Page