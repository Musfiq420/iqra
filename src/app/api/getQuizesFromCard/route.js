import db from "@/lib/mongodb";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url)
  const card = searchParams.get('card')
  console.log(JSON.stringify(searchParams));
  try {
    const quizes = await db.collection("quizes").find({card:card}).toArray();
    return Response.json(quizes);
  } catch(e) {
    console.error(e);
    throw new Error(e).message;
  }
}