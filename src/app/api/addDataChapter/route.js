import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function POST(req, res) {
  const data = await req.json();
  console.log(data);

  
  await db.collection("nodes").updateOne({_id : new ObjectId(data.id)}, { $set: {data: data.data}}  )

    return Response.json("ok");
}