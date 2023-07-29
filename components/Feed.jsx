'use client'

import React, { useEffect , useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 prompt_layout">
        {data && data.map(prompt => <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick} />)}
    </div>
)

const Feed = () => {
    const [searchText, setsearchText] = useState('')
    const [prompts, setPrompts] = useState([])

    const handleSearchChange = (e) => {

    }

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            console.log("🚀 ~ file: Feed.jsx:24 ~ fetchPrompts ~ data:", data)
            setPrompts(data)
        }

        fetchPrompts()
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList data={prompts} handleTagClick={() => { }} />
        </section>
    )
}

export default Feed