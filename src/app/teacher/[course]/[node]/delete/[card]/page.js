import db from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'
 

const Card = async ({params}) => {
  const cardId = params.card;

  async function deleteCard(formData) {
    'use server' 
    
    await db.collection("cards2").deleteOne({_id : new ObjectId(cardId)})
    await db.collection("quizes").deleteMany({ card: cardId })
    
    revalidatePath(`/teacher/${params.course}/${params.node}`);
    redirect(`/teacher/${params.course}/${params.node}`)
  }

  return (
    <div>
      <div style={{height:"80px"}} />
      <form action={deleteCard}>
          <p>Are you sure to Delete?</p>
          <button type="submit">Yes</button>
        </form>
    </div>
  )
}

export default Card