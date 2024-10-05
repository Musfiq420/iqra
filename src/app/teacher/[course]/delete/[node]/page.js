import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

const deleteDecendant = async (id) => {
  console.log(id);
  await db.collection("nodes").deleteOne({_id: new ObjectId(id)});
  const dec = await db.collection("nodes").find({parent: id}).toArray();
  if(!dec)
    return;
  else {
    dec.forEach(async (element) => {
      await deleteDecendant(element._id.toString());
    });
  }
  
  
} 

const Node = async ({params}) => {
  const nodeId = params.node;

  const deleteNode = async () => {
    'use server'
    
    await deleteDecendant(nodeId);
    revalidatePath(`/teacher/${params.course}`);
    redirect(`/teacher/${params.course}`)
  }

  return (
    <div>
      <div style={{height:"60px"}} />
      <form action={deleteNode}>
        <p>Are you sure to Delete?</p>
        <button type="submit">Yes</button>
      </form>
    </div>
  )
}

export default Node