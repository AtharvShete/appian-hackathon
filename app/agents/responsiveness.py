from models.groq_integration import create_improvement_chain
from models.prompts import get_prompt

responsiveness_chain = create_improvement_chain(get_prompt("responsiveness"))

def process_responsiveness(chunk):
    """Process HTML chunk to improve responsive design features."""
    try:
        if not chunk or not isinstance(chunk, str):
            raise ValueError("Invalid HTML input")
            
        result = responsiveness_chain.invoke({"html_code": chunk.strip()})
        return result
    except Exception as e:
        print(f"Error processing responsive improvements: {str(e)}")
        return None
