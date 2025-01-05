'use client'

import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wand2 } from 'lucide-react'
import { useState } from 'react'
import { modifyHtmlWithGroq } from '@/app/actions/groq'
import { Card } from '@/components/ui/card'

interface PreviewProps {
    html: string
    onHtmlChange: (newHtml: string) => void
}

const Preview: React.FC<PreviewProps> = ({ html, onHtmlChange }) => {
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        setIsLoading(true)
        try {
            const result = await modifyHtmlWithGroq(query, html)
            if (result.success && result.html) {
                onHtmlChange(result.html)
            }
        } finally {
            setIsLoading(false)
            setQuery('')
        }
    }

    return (
        <div className="flex-1 flex flex-col h-full">
            
            
            <Card className='flex-1 overflow-auto p-2 m-2'>
                <iframe
                    srcDoc={html}
                    sandbox="allow-scripts allow-same-origin"
                    className="w-full h-full border-none"
                />
            </Card>
            <form onSubmit={handleSubmit} className="p-4 border-b flex items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Describe how to modify the HTML..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-grow"
                />
                <Button type="submit" disabled={isLoading}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    {isLoading ? 'Modifying...' : 'Modify'}
                </Button>
            </form>
        </div>
    )
}

export default Preview

