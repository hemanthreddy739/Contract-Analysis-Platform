import google.generativeai as genai
import os

GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash')

def analyze_text(text: str, prompt: str) -> str:
    try:
        response = model.generate_content(f"{prompt}\n\n{text}")
        return response.text
    except Exception as e:
        return f"Error analyzing text: {e}"
