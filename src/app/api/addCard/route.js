import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  try {
    if(data.card===null)
    {
      await db.collection("cards2").insertOne({title: data.title, data: data.data, node: data.node, index: data.index});
    }
    else {
      await db.collection("cards2").updateOne({_id : new ObjectId(data.card)}, { $set: {title: data.title, data: data.data, node: data.node, index: data.index}}  )
    }

    return Response.json("ok");
  } catch(e) {
    console.error(e);
    throw new Error(e).message;
  }
}