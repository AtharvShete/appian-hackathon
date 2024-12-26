# HTML Enhancement Tool Documentation

## Overview
Tool that uses AI to automatically enhance HTML code by improving accessibility, aesthetics, responsiveness, and semantic structure.

## Installation
```bash
git clone https://github.com/AtharvShete/appian-hackathon.git
cd appian-hackathon
pip install -r requirements.txt
```

## Configuration
Create a `.env` file:
```env
GROQ_API_KEY=your-key-here
GROQ_MODEL = "llama-3.2-3b"
```

## Basic Usage

### API Endpoint
- **URL**: `/analyze`
- **Method**: POST
- **Content-Type**: application/json

### Example Request
```bash
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<div>Hello World</div>"
  }'
```

### Response Format
```json
{
  "status": "success",
  "results": {
    "accessibility": "...",
    "aesthetics": "...",
    "responsiveness": "...",
    "semantics": "..."
  },
  "metadata": {
    "chunks_processed": 1,
    "total_size": 100,
    "improvements_applied": [...]
  }
}
```

## Improvement Categories

### 1. Accessibility
- WCAG 2.1 compliance
- Screen reader optimization
- Keyboard navigation
- ARIA labels

### 2. Aesthetics
- Modern typography
- Color theory
- Spacing & layout
- Visual hierarchy

### 3. Responsiveness
- Mobile-first design
- Flexible layouts
- Responsive images
- Performance optimization

### 4. Semantics
- HTML5 best practices
- SEO optimization
- Document structure
- Content relationships

## Error Handling

### Common Error Codes
- 400: Bad Request (Invalid HTML)
- 500: Internal Server Error

### Error Response Format
```json
{
  "error": "Error message here"
}
```

## Limitations
- Maximum HTML size: 5000 characters per chunk
- Processing time varies with input size
- Requires valid HTML input

## Best Practices
1. Validate HTML before sending
2. Use smaller chunks for better results
3. Review suggestions before implementing
4. Test changes in multiple browsers

## Support
For issues and questions:
- Create GitHub issue
- Contact development team
