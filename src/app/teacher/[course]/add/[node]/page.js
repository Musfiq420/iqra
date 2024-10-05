import db from '@/lib/mongodb';
import { LexoRank } from 'lexorank';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const Node = async({params}) => {
  const courseId = params.course;
  const parentId = params.node === 'null'?null:params.node;
  const nodes = await db.collection("nodes").find({parent: parentId, course: courseId}).toArray();
  
  
    

  console.log("node: " + JSON.stringify(nodes));

  async function addNode(formData) {
    'use server'

    let rank;
    if(nodes.length===0)
    {
      rank = LexoRank.middle();
    }
    else
    {
      console.log(nodes[nodes.length-1].index);
      rank = LexoRank.parse(nodes[nodes.length-1].index).genNext()
    }
 
    const rawFormData = {
      title: formData.get('title'),
      parent: parentId,
      course: courseId,
      type: formData.get('type'),
      index: rank.toString()
    }

    console.log(rawFormData);

    await db.collection("nodes").insertOne(rawFormData);
    
    revalidatePath(`/teacher/${courseId}`);
    redirect(`/teacher/${courseId}`);
  }

  return (
    <div>
      <div style={{height:"60px"}} />
      <form action={addNode} method='POST' >
        <div>
          <label>
            Title
            <div>
              <input id="title" name='title' type='text' />
            </div>
            
          </label>
        </div>
        <div>
          <label>
            Type
            <div>
              <select name='type' defaultValue={"file"} >
                <option value="path">Path</option>
                <option value="file">File</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
          </label>
        </div>
        
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Node