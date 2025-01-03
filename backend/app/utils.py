from bs4 import BeautifulSoup
from app.agents import responsiveness, accessibility, aesthetics, semantics
from config import CHUNK_SIZE, CHUNK_OVERLAP
from concurrent.futures import ThreadPoolExecutor
import logging
from dataclasses import dataclass

@dataclass
class AnalysisResult:
    content: str
    status: str
    error = None

def setup_logger():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    return logger

logger = setup_logger()

def validate_html(html_content):
    if not html_content or not isinstance(html_content, str):
        return False
    try:
        BeautifulSoup(html_content, 'html.parser')
        return True
    except Exception:
        return False

def chunk_html(html_content):
    try:
        soup = BeautifulSoup(html_content, 'html.parser')
        raw_text = soup.prettify()
        chunks = []
        
        for i in range(0, len(raw_text), CHUNK_SIZE - CHUNK_OVERLAP):
            chunk = raw_text[i:i + CHUNK_SIZE]
            if chunk.strip():
                chunks.append(chunk)
        
        return chunks
    except Exception as e:
        logger.error(f"Error chunking HTML: {str(e)}")
        return []

def process_chunk(chunk, processor_func):
    try:
        result = processor_func(chunk)
        return AnalysisResult(
            content=result if result else "",
            status="success"
        )
    except Exception as e:
        logger.error(f"Error processing chunk: {str(e)}")
        return AnalysisResult(
            content="",
            status="error",
            error=str(e)
        )

def analyze_with_agents(html_content, selected_improvements=None):
    try:
        if not validate_html(html_content):
            raise ValueError("Invalid HTML content provided")

        chunks = chunk_html(html_content)
        if not chunks:
            raise ValueError("Failed to generate valid chunks from HTML")

        available_processors = {
            "responsiveness": responsiveness.process_responsiveness,
            "accessibility": accessibility.process_accessibility,
            "aesthetics": aesthetics.process_aesthetics,
            "semantics": semantics.process_semantics
        }

        processors = {
            k: v for k, v in available_processors.items()
            if not selected_improvements or k in selected_improvements
        }

        results = {key: [] for key in processors.keys()}
        
        with ThreadPoolExecutor(max_workers=4) as executor:
            for processor_name, processor_func in processors.items():
                chunk_futures = [
                    executor.submit(process_chunk, chunk, processor_func)
                    for chunk in chunks
                ]
                
                processor_results = [
                    future.result() for future in chunk_futures
                ]
                
                # Filter out failed results and combine successful ones
                successful_results = [
                    result.content 
                    for result in processor_results 
                    if result.status == "success" and result.content
                ]
                
                results[processor_name] = "\n".join(successful_results)

        # Add processing metadata
        return {
            "status": "success",
            "results": results,
            "metadata": {
                "chunks_processed": len(chunks),
                "total_size": len(html_content),
                "improvements_applied": list(processors.keys())
            }
        }

    except Exception as e:
        logger.error(f"Analysis failed: {str(e)}")
        return {
            "status": "error",
            "error": str(e),
            "results": None
        }
