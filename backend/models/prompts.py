IMPROVEMENT_JSON_STRUCTURE = """{
    "improved_html": "enhanced HTML/CSS code here",
    "changes": [
        "List of specific changes made"
    ],
    "suggestions": [
        "List of additional improvement suggestions"
    ],
    "preview_url": "URL to preview changes",
    "difficulty_level": "easy/medium/hard",
    "impact_score": 0-10,
    "categories": ["relevant", "category", "tags"]
}"""

ACCESSIBILITY_PROMPT = f"""As an accessibility expert, improve the HTML code following WCAG guidelines. Output JSON with structure:
{IMPROVEMENT_JSON_STRUCTURE}

Focus on:
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

Original HTML:
{{html_code}}"""

AESTHETICS_PROMPT = f"""As a web design expert, enhance the visual design following modern principles. Output JSON with structure:
{IMPROVEMENT_JSON_STRUCTURE}

Focus on:
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

Original HTML:
{{html_code}}"""

RESPONSIVENESS_PROMPT = f"""As a responsive design expert, enhance the mobile compatibility. Output JSON with structure:
{IMPROVEMENT_JSON_STRUCTURE}

Focus on:
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

Original HTML:
{{html_code}}"""

# Semantics prompt template
SEMANTICS_PROMPT = f"""As an HTML structure expert, improve semantic markup. Output JSON with structure:
{IMPROVEMENT_JSON_STRUCTURE}

Focus on:
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

Original HTML:
{{html_code}}"""

# Export all prompts
PROMPTS = {
    "accessibility": ACCESSIBILITY_PROMPT,
    "aesthetics": AESTHETICS_PROMPT,
    "responsiveness": RESPONSIVENESS_PROMPT,
    "semantics": SEMANTICS_PROMPT,
}


def get_prompt(prompt_type):
    return PROMPTS.get(prompt_type, "")
