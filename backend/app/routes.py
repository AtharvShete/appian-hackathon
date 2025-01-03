from flask import Blueprint, request, jsonify
from app.utils import analyze_with_agents

routes = Blueprint('routes', __name__)

@routes.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    html_content = data.get('html', '')

    if not html_content:
        return jsonify({"error": "No HTML content provided."}), 400

    analysis_results = analyze_with_agents(html_content)
    return jsonify(analysis_results)