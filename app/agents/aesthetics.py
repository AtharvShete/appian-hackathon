from models.groq_integration import create_improvement_chain
from models.prompts import get_prompt

aesthetics_chain = create_improvement_chain(get_prompt("aesthetics"))

def process_aesthetics(chunk):
    """Process HTML chunk to improve visual aesthetics and design."""
    try:
        if not chunk or not isinstance(chunk, str):
            raise ValueError("Invalid HTML input")
            
        result = aesthetics_chain.invoke({"html_code": chunk.strip()})
        return result
    except Exception as e:
        print(f"Error processing aesthetic improvements: {str(e)}")
        return None

