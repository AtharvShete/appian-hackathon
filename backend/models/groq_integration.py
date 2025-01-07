from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from config import GROQ_API_KEY, GROQ_MODEL

html_improvements_parser = JsonOutputParser(
    pydantic_object={
        "type": "object",
        "properties": {
            "improved_html": {"type": "string"},
            "changes": {"type": "array", "items": {"type": "string"}},
            "suggestions": {"type": "array", "items": {"type": "string"}},
            "preview_url": {"type": "string"},
            "difficulty_level": {"type": "string"},
            "impact_score": {"type": "number"},
            "categories": {"type": "array", "items": {"type": "string"}},
        },
    }
)

llm = ChatGroq(
    api_key=GROQ_API_KEY, model_name=GROQ_MODEL, temperature=0.4, max_tokens=4096
)


def create_improvement_chain(system_prompt):
    """Create a chain that guarantees JSON output for HTML improvements"""
    prompt = ChatPromptTemplate.from_messages(
        [("system", system_prompt), ("user", "{html_code}")]
    )
    return prompt | llm | html_improvements_parser


__all__ = ["llm", "create_improvement_chain", "html_improvements_parser"]
