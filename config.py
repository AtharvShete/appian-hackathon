import os
# Configuration file for the application

# API key and model name for the Groq LLM
GROQ_API_KEY = os.environ['GROQ_API_KEY']
GROQ_MODEL = "llama-3.2-3b"

# Chunk processing configuration
CHUNK_SIZE = 5000  # Maximum characters per chunk
CHUNK_OVERLAP = 500  # Overlap between consecutive chunks
