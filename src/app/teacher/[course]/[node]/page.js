import db from '@/lib/mongodb';
import React from 'react'
import { ObjectId } from 'mongodb';
import LessionConfig from './components/lessionConfig';

const Node = async({params}) => {
  const chapter = await db.collection("nodes").findOne({_id: new ObjectId(params.node)})
  const cards = await db.collection("cards2").find({node: params.node}).sort( { index : 1 } ).toArray();
  const cardsId = cards.map(a => (a._id).toString());
  const quizes = cardsId==="null"?null:await db.collection("quizes").find({card: { $in: cardsId }}).toArray();
  
  console.log(quizes);
  
  return (
    <div>
      <div style={{height:"60px"}} />
      
        <LessionConfig chapter={chapter} params={params} type={chapter.type} />
    </div>
  )
}

export default Node