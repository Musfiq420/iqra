'use client'
import ProgressBar from '@ramonak/react-progress-bar'
import React from 'react'

const Progressbar = ({completed, total}) => {
  return (
    <div style={{width:"70%",  paddingBottom:"10px"}}>
        <ProgressBar isLabelVisible={false} borderRadius='5px'  bgColor='#9757b5' height='10px' completed={((completed)/(total))*100} />

    </div>
  )
}

export default Progressbar