import db from "@/lib/mongodb";

export async function GET(req, res) {
    try {
      const courses = await db.collection("courses").find({}).toArray();
      return Response.json(courses);
    } catch(e) {
      console.error(e);
      throw new Error(e).message;
    }
  }