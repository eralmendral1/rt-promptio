'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = ({ params }) => {
    const promptId = params.id
    console.log("🚀 ~ file: page.jsx:10 ~ EditPrompt ~ promptId:", promptId)

    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [prompt, setPrompt] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        if (!promptId) return alert("Prompt ID not found.")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: prompt.prompt,
                    tag: prompt.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log('Error encountered: ', error)
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        const getPrompDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            
            setPrompt({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        console.log('promptid:', promptId)

        if (promptId) getPrompDetails()
    }, [promptId])

    return (
        <div>
            <Form
                type="Edit"
                prompt={prompt}
                setPrompt={setPrompt}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </div>
    )
}

export default EditPrompt