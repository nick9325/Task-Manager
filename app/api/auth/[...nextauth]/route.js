import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';

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
                    // const userr=user.username;
                    // console.log(userr);
                    // return {userr,email};

                    return user;
                    
                } catch (error) {
                    console.log("Error :",error);
                }
               
            }
            
            ,
        })
    ],
    session : {
        strategy: "jwt",
        jwt: true,
    },
    secrete: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login"
    },

    // callbacks: {
    //     session: async ({ session, token }) => {
    //         session.userr = token.user.username;
    //         return session;
    //     },
    // }

};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};