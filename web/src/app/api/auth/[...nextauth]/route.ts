import { getUser } from '@/app/utils/getUsers';
import { compare } from 'bcrypt';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.email || !credentials.password) {
                        throw new Error('Credentials not found');
                    }
                    // Find the user from the Database
                    const user = await getUser('email', credentials.email);
                    if (!user) {
                        throw new Error('You are not registered. Please Signup')
                    }
                    // Compare the password to verify
                    const isPasswordValid = await compare(credentials?.password as any, user.password);
                    //If the password isn't valid then return the error
                    if (!isPasswordValid) {
                        throw new Error('Wrong email or password entered.')
                    }
                    //If password valid the return the user data.
                    if (isPasswordValid) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.name = user.name;
                token.email = user.email;
                token.phone = user.phone
                token.password = user.password;
                token.image = user.image;
                token.role = user.role;
                token.isActive = user.isActive;
            }
            return token;
        },
        async session({ session, token }) {
            // Find the user from the Database
            const user = await getUser('_id', token._id);
            if (user) {
                session.user = {
                    _id: user._id?.toString(),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    image: user.image,
                    role: user.role,
                    isActive: user.isActive,
                };
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };

