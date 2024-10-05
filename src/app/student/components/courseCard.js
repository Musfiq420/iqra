import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IoSchoolOutline } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";

const CourseCard = ({course}) => {
  return (
    <div style={{padding:"5px", width:"215px", margin:"10px", boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)", borderRadius:"5px"}}>
      <Image src={course.imgurl} style={{borderRadius:"5px"}} width={200} height={100} />

      <div style={{padding:"5px"}}>
        <Link href={`/student/${course._id}`}>
          <p style={{fontWeight:"bold"}}>{course.title}</p>
        </Link>
        <div style={{display:"flex", flexDirection:"row",  color:"gray"}}>
            <div style={{paddingRight:"5px", paddingTop:"5px", fontSize:12}}>
              <MdOutlineClass />            
            </div>
            <div style={{padding:"2px", fontSize:12}}>
            class {course.class.min===course.class.max?`${course.class.min}`:`${course.class.min}-${course.class.max}`}
            </div>
            
          </div>
          <div style={{display:"flex", flexDirection:"row",  color:"gray"}}>
            <div style={{paddingRight:"5px", paddingLeft:"0px", paddingTop:"2px", fontSize:12}}>
              <IoSchoolOutline />
            </div>
            <div style={{padding:"0px", fontSize:12}}>
            {course.instructor}
            </div>
            
          </div>
          <br />
          <div style={{color:'#383838', fontSize:12}}>
            <p>{course.about}</p>
          </div>
      </div>
    </div>
  )
}

export default CourseCard