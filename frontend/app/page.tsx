'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUp } from 'lucide-react'
import { modifyHtmlWithGroq } from '@/app/actions/groq'

export default function Home() {
  const router = useRouter()
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const query : string = `
    Improve the given HTML page in the 4 following aspects. 
    A. As an accessibility expert, improve the HTML code following WCAG guidelines. Focus on: 
        1. WCAG 2.1 Compliance
          - Proper heading structure
          - ARIA landmarks and labels
          - Focus management

        2. Keyboard Navigation
          - Logical tab order
          - Visible focus indicators
          - Skip links

        3. Screen Readers
          - Alternative text
          - Meaningful link text
          - proper table structure

        4. Forms and Inputs
          - Clear labels
          - Error messages
          - Input assistance
    B. As a web design expert, enhance the visual design of the HTML page following modern principles. Focus on:
        1. Modern Typography
          - System font stack
          - Proper font scaling (1.25 ratio)
          - Line height and letter spacing

        2. Color Theory
          - Consistent color palette
          - 60-30-10 color rule
          - Proper contrast ratios

        3. Spacing & Layout
          - 8-point grid system
          - Consistent padding/margins
          - White space utilization

        4. Visual Hierarchy
          - Clear content structure
          - Emphasis on important elements
          - Proper sizing relationships
    C. As a responsive design expert, enhance the mobile view compatibility of the page. Focus on:
        1. Mobile-First Approach
          - Viewport settings
          - Flexible layouts
          - Touch-friendly targets

        2. Responsive Images
          - Proper srcset usage
          - Image optimization
          - Art direction

        3. Flexible Grids
          - CSS Grid/Flexbox
          - Fluid typography
          - Breakpoint strategy

        4. Performance
          - Loading strategies
          - Content priorities
          - Progressive enhancement
    D. As an HTML structure expert, improve semantic markup in the HTML page. Focus on:
        1. HTML5 Semantics
          - Proper element choice
          - Document outline
          - Content relationships

        2. SEO Optimization
          - Meta information
          - Schema markup
          - Content structure

        3. Document Flow
          - Logical ordering
          - Content grouping
          - Relationship markers

        4. Best Practices
          - Valid HTML5
          - Progressive enhancement
          - Content accessibility
    `

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (htmlContent) {
      setIsLoading(true)
      localStorage.setItem('userHTMLContent', htmlContent)
      try {
        const result = await modifyHtmlWithGroq(query, htmlContent)
        if (result.success && result.html) {
          localStorage.setItem('newHTMLContent', result.html)
        }
      } finally {
      setIsLoading(false)
      }
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              <FileUp className="mr-2 h-4 w-4" />
              {isLoading ? 'Processing...' : 'Improve HTML'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

