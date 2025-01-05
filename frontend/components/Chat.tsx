'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from 'lucide-react'
import { useChat } from 'ai/react'


export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat',
    })

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full max-w-md bg-white border rounded-lg shadow-lg pointer-events-auto">
                <div className="flex flex-col h-[300px]">
                    <ScrollArea className="flex-1 p-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-3 mb-4 ${message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                                    }`}
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {message.role === 'assistant' ? 'AI' : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={`rounded-lg px-3 py-2 max-w-[80%] ${message.role === 'assistant'
                                            ? 'bg-muted'
                                            : 'bg-primary text-primary-foreground'
                                        }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <form
                        onSubmit={handleSubmit}
                        className="border-t p-4 flex items-center gap-2"
                    >
                        <Input
                            placeholder="Ask about the HTML or request changes..."
                            value={input}
                            onChange={handleInputChange}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon">
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

