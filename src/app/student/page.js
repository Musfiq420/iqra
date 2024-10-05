import db from '@/lib/mongodb';
import React from 'react'
import CourseList from './components/courseList';

const Student = async() => {
  const courses = await db.collection("courses").find({"published":true}).toArray();
  return (
    <div style={{marginLeft:"80px", marginTop:"40px"}}>
      <br />
      <br />
      <div style={{padding:"10px", marginTop:"10px", marginBottom:"10px"}}>
        <p style={{ fontSize:24}}>Browse Courses</p>
      </div>
      
     
      <CourseList courses={courses} />
    </div>
  )
}

export default Student