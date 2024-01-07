import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers'



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const {email, password} = credentials;
                try {
                    await connectMongoDB();
                    const user = await User.findOne({email});
    
                    if(!user){
                        return null;
                    }
    
                    const passwordsMatch = await bcrypt.compare(password,user.password);
    
    
                    if(!passwordsMatch){
                        return null;
                    }          

                    return user;
                    
                } catch (error) {
                    console.log("Error :",error);
                }
               
            }
            
            ,
        })
    ],
 
    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login"
    },

    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.uid;
            session.user.username=token.uusername;
            cookies().set('username',session.user.username);
            cookies().set('id',session.user.id);
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
            token.uusername=user.username;
          }
          return token;
        },

    },
    
      session : {
        strategy: "jwt",
    },



};


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};