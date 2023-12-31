import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

export const POST = async (req, res) => {
    console.log("🚀 ~ file: route.js:5 ~ POST ~ req:", req)
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDB()

        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt
        })

        await newPrompt.save()

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log('Error encountered creating prompt:', error)
        return new Response('Failed to create new prompt', {
            status: 500
        })
    }
}