import React from 'react'
import Markdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import remarkMath from 'remark-math'
import Image from 'next/image'
import rehypeRaw from 'rehype-raw'
// &nbsp;  
// ( with two spaces after &nbsp; )
// https://amirardalan.com/blog/use-next-image-with-react-markdown#add-custom-metastring-logic

const imgCustom = (imageData) => {

  const size = imageData.alt?.match(/\{(\d+)x(\d+)\}/)  // Regex to look for sizing pattern  
  const width = size ? size[1] : "400"
  const height = size ? size[2] : "250"

  console.log(imageData);
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <img
        src={imageData.src?imageData.src:""}
        width={width}
        height={height}
      />
    </div>
  )
}

const MdText = ({children}) => {
  
  return (
    // <div style={{paddingLeft:"10px", paddingTop:"5px", paddingBottom:"5px", marginLeft:"10px"}}>
    <div>  
      <Markdown components={{ img: imgCustom }} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeRaw]} >{children}</Markdown>
    </div>
  )
}

export default MdText