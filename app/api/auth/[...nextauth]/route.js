import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            // to get user session, we have to sign user in.
            // every nextjs route is a serverless route
            // serverless -> lambda -> dynamodb
            // opens up only when it gets called
            // everytime it's called it needs to spin up server and connect to database.
            try {
                await connectToDB()

                // check if user already exists
                const userExists = await User.findOne({ email: profile.email })

                // if not, create the user
                if (!userExists) {
                   let user = await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                return false
            }
        }
    }
})

export { handler as GET, handler as POST }