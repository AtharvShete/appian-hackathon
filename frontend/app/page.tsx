'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUp } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [htmlContent, setHtmlContent] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setHtmlContent(content)
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (htmlContent) {
      localStorage.setItem('htmlContent', htmlContent)
      router.push('/editor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>HTML Editor</CardTitle>
          <CardDescription>
            Upload your HTML file or paste your HTML content to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                type="file"
                accept=".html"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Or paste your HTML here..."
                className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!htmlContent}>
              <FileUp className="mr-2 h-4 w-4" />
              Open in Editor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

