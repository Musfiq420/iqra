'use client'

import React, { useEffect, useState } from 'react'
import CourseCard from './courseCard'

const CourseList = ({courses}) => {

  const [filterCourses, setFilteredCourses] = useState(courses);
  const [selectedClass, setSelectedClass] = useState(6);

  useEffect(() => {
    const tempCourses = courses.filter((e) => e.class.min<=selectedClass && e.class.max>=selectedClass);
    setFilteredCourses(tempCourses);
  }, [selectedClass])

  

  return (
    <div>
      <div style={{display:"flex", flexWrap:"wrap", margin:"5px"}}>
        {[6,7,8,9,10,11,12].map((e) =>                 
        <div onClick={() => setSelectedClass(e)} style={{fontSize:12, margin:"5px", width:'min-content', textWrap:'nowrap', marginTop:"5px",backgroundColor:selectedClass===e?"#9757b5":"white", padding:"10px", color:selectedClass===e?"white":"#9757b5", cursor:"pointer", borderRadius:"5px",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)" }}>
          Class {e}
        </div>
        )}
      </div>
      <div style={{display:"flex", flexWrap:"wrap"}} >
        {
          filterCourses.map((e) => <CourseCard course={e} />)
        }
      </div>
    </div>
  )
}

export default CourseList