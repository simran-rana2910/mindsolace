"""
MindSolace - Python Web Server & NLP Microservice
Serves static frontend files and provides an optional Python sentiment API endpoint.
Run using: python server.py
"""

import http.server
import socketserver
import json
import urllib.parse

PORT = 8000

class MindSolaceRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        # Optional Python NLP Sentiment Analysis API Endpoint (/api/sentiment)
        if self.path == '/api/sentiment':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            user_text = data.get('text', '').lower()
            
            # Python Sentiment Analysis Heuristics
            if any(w in user_text for w in ['sad', 'depressed', 'udass', 'crying']):
                emotion = 'Sadness'
            elif any(w in user_text for w in ['anxious', 'scared', 'stressed', 'panic', 'tention']):
                emotion = 'Anxiety'
            elif any(w in user_text for w in ['lonely', 'alone', 'akela', 'isolated']):
                emotion = 'Loneliness'
            elif any(w in user_text for w in ['angry', 'hate', 'gussa']):
                emotion = 'Anger'
            elif any(w in user_text for w in ['happy', 'khush', 'great', 'blessed']):
                emotion = 'Happy'
            else:
                emotion = 'Neutral'
                
            response_data = {
                'status': 'success',
                'emotion': emotion,
                'message': f'Python NLP Engine processed emotion: {emotion}'
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
        else:
            self.send_error(404, "Endpoint Not Found")

if __name__ == '__main__':
    print(f"🌿 Starting MindSolace Python Server at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), MindSolaceRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
