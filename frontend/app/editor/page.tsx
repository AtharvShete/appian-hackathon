'use client'

import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import Preview from "@/components/Preview"
import { Chat } from '@/components/Chat'
import { useRouter } from 'next/navigation'

export default function EditorPage() {
    const [html, setHtml] = useState('')
    const router = useRouter()

    useEffect(() => {
        const savedHtml = localStorage.getItem('htmlContent')
        if (!savedHtml) {
            router.push('/')
            return
        }
        setHtml(savedHtml)
    }, [router])

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setHtml(value)
            localStorage.setItem('htmlContent', value)
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full">
                <Editor
                    height="100%"
                    defaultLanguage="html"
                    value={html}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 16,
                        wordWrap: 'on',
                    }}
                />
            </div>
            <div className="w-1/2 h-full border-l border-gray-300 flex flex-col">
                <Preview html={html} onHtmlChange={setHtml} />
            </div>
        </div>
    )
}

