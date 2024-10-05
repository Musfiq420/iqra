'use client'
import MdText from '@/app/utils/mdText'
import React from 'react'

const IFrame = ({instruction,src,height,width}) => {
  return (
    <div style={{paddingLeft:"0px", marginLeft:"20px", marginBottom:"20px"}}>
        <div style={{ marginBottom:"10px"}}>
          {instruction?<MdText>{instruction}</MdText>:null}
        </div>
        <iframe scrolling='no' src={src} style={{ width:`${width}px`, height:`${height}px`}}>
        </iframe>
      </div>
  )
}

export default IFrame