import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import React from 'react';

const Teacher = async () => {
  const courses = await db.collection("courses").find({}).toArray();

  return (
    <div>
      <Link href="/">
      <div></div>
      <button style={{padding:"10px"}} >{`<-`} Go to Home Page</button>
      </Link>
      <br />
      <br />
      <h2>Courses</h2>
      <Link href="/teacher/addOrEdit/null" >Add New</Link>
      <table>
        <tr>
          <th>Course</th>
          <th>Instructor</th>
          <th>Published</th>
          <th>Action</th>
        </tr>
        {
          courses.map((e) => <tr>
          <td>{e.title}</td>
          <td>{e.instructor}</td>
          <td>{e.published?"Yes":"No"}</td>
          <td>
            <Link href={`/teacher/${e._id}`}>
              <button>Go</button>
            </Link>
            <Link href={`/teacher/addOrEdit/${e._id}`}>
              <button>Edit</button>
            </Link>
            <Link href={`/teacher/delete/${e._id}`}>
              <button>Delete</button>
            </Link>
            
          </td>
        </tr>)
        }
        
      </table>
      
    </div>
  )
}

export default Teacher