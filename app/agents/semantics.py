from models.groq_integration import create_improvement_chain
from models.prompts import get_prompt

semantics_chain = create_improvement_chain(get_prompt("semantics"))

def process_semantics(chunk):
    try:
        if not chunk or not isinstance(chunk, str):
            raise ValueError("Invalid HTML input")
            
        result = semantics_chain.invoke({"html_code": chunk.strip()})
        return result
    except Exception as e:
        print(f"Error processing semantic improvements: {str(e)}")
        return None