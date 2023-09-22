import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../../prisma/prisma";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
            });

            session.user = user

            return session;
        },

        async signIn({ profile }) {
            try {
                const user = await prisma.user.findUnique({
                    where: { email: profile.email },
                });

                if (!user) {
                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name.toLowerCase(),
                            image: profile.picture,
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error("Error checking if user exists:", error.message);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
});


export { handler as GET, handler as POST, handler as authOptions }