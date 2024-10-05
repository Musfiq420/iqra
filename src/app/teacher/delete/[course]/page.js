import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const Course = async({params}) => {
    const courseId = params.course;

    const deleteCourse = async () => {
        'use server'
        await db.collection("courses").deleteOne({_id: new ObjectId(courseId)});
        revalidatePath(`/teacher`);
        redirect(`/teacher`);
      }

    return (
    <div>
      <div style={{height:"60px"}} />
      <form action={deleteCourse}>
          <p>Are you sure to Delete?</p>
          <button type="submit">Yes</button>
      </form>
    </div>
  )
}

export default Course