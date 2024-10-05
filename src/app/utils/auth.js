import db from "@/lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  
  providers: [
    GoogleProvider({
      id: "student",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "student",
        };
      },
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    }),
    GoogleProvider({
      id: "teacher",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "teacher",
        };
      },
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user) token.role = user.role;
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    },
    async signIn({ user }) {
      console.log(user.role);
      
      const exist = await db.collection("students").findOne({email: user.email});
      if(exist)
      {
        // await db.collection("students").updateOne({email:user.email}, {$set:{loggedIn:true}})
      }
      else{
        await db.collection("students").insertOne({email:user.email, loggedIn:true})
      }

      return true;
    }
  }
  
}