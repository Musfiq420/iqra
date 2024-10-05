import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const Node = async({params}) => {
  const nodeId = params.node;
  const node = await db.collection("nodes").findOne({_id: new ObjectId(nodeId)});

  async function addNode(formData) {
    'use server'
 
    const rawFormData = {
      title: formData.get('title')
    }

    console.log(rawFormData);

    await db.collection("nodes").updateOne({_id : new ObjectId(nodeId)}, { $set: rawFormData}  )
    
    revalidatePath(`/teacher/${node.course}`);
    redirect(`/teacher/${node.course}`);
  }

  return (
    <div>
      <div style={{height:"60px"}} />
      <form action={addNode} method='POST' >
        <div>
          <label>
            Title
            <div>
              <input id="title" name='title' type='text' defaultValue={node.title}  />
            </div>
            
          </label>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Node