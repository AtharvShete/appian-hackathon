from models.groq_integration import create_improvement_chain
from models.prompts import get_prompt

# Create the chain with JSON output
accessibility_chain = create_improvement_chain(get_prompt("accessibility"))

def process_accessibility(chunk):
    """
    Process HTML chunk to improve accessibility features.
    
    Args:
        chunk (str): HTML code segment to process
        
    Returns:
        Optional[Dict[str, Any]]: Structured improvements with changes and suggestions
    """
    try:
        if not chunk or not isinstance(chunk, str):
            raise ValueError("Invalid HTML input")
            
        result = accessibility_chain.invoke({"html_code": chunk.strip()})
        return result
    except Exception as e:
        print(f"Error processing accessibility improvements: {str(e)}")
        return None
