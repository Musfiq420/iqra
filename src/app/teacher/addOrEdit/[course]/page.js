import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const Course = async ({params}) => {
  const courseId = params.course;
  const course = courseId==="null"?"":await db.collection("courses").findOne({_id: new ObjectId(courseId)});

  async function addCourse(formData) {
    'use server'
 
    const rawFormData = {
      title: formData.get('title'),
      class: {
        min: Number(formData.get('minCls')),
        max: Number(formData.get('maxCls')),
      },
      category: formData.get('category'),
      about: formData.get('about'),
      description: formData.get('description'),
      instructor: formData.get('instructor'),
      imgurl: formData.get('imgurl'),
      published: formData.get('published') === 'on'
    }

    console.log(rawFormData);

    if(courseId === "null")
      await db.collection("courses").insertOne(rawFormData);
    else 
      await db.collection("courses").updateOne({_id : new ObjectId(courseId)}, { $set: rawFormData}  )
    // mutate data
    // revalidate cache
    revalidatePath(`/teacher`);
    redirect('/teacher')
  }

  return (
    <div>
      <div style={{height:"60px"}} />
      <form action={addCourse} method='POST' >
        <div>
          <label>
            Title
            <div>
              <input id="title" name='title' type='text' defaultValue={course?course.title:""}  />
            </div>
            
          </label>
        </div>
        <div>
          <label>
            Category
            <div>
              <input id="category" name='category' type='text' defaultValue={course?course.category:""}  />
            </div>
            
          </label>
        </div>
        <div>
          <label>
            Instructor
            <div>
              <input id="instructor" name='instructor' type='text' defaultValue={course?course.instructor:""} />
            </div>
          </label>
        </div>
        <div>
          <label>
            Min Class
            <div>
              <input id="minCls" name='minCls' type='number' defaultValue={course?course.class.min:6} />
            </div>
          </label>
        </div>
        <div>
          <label>
            Max Class
            <div>
              <input id="maxCls" name='maxCls' type='number' defaultValue={course?course.class.max:6} />
            </div>
          </label>
        </div>
        <div>
          <label>
            About
            <div>
              <textarea style={{resize:'none'}} name="about" cols="40" rows="3" defaultValue={course?course.about:""}></textarea>
            </div>
          </label>
        </div>
        <div>
          <label>
            Description
            <div>
              <textarea style={{resize:'both'}}  name="description"  cols="40" rows="10" defaultValue={course?course.description:""}></textarea>
            </div>
          </label>
        </div>
        <div>
          <label>
            Cover Image URL
            <div>
              <input id="imgurl" name="imgurl" type='url'  defaultValue={course?course.imgurl:""} />
            </div>
          </label>
        </div>
        
        <div>
          <label>
            Published?
            <div>
              <input id="published" name='published' type='checkbox' defaultChecked={course?.published || false} />
              {/* {course?course.published:"false"} */}
            </div>
            
          </label>
        </div>
        
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Course