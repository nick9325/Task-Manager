import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

const authOptions = {

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            },
            async authorize(credentials) {
                const {username,email, password} = credentials;
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

    callbacks: {
        async jwt({token,user}){
            return {...token, ...user};
        },

        async session({session,token,user}){
            session.user=token;
            return session;
        }
    },
    session : {
        strategy: "jwt",
    },
    secrete: process.env.NEXTAUTH_SECRETE,

    pages: {
        signIn: "/login"
    },

};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};