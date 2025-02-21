from sentence_transformers import SentenceTransformer
import sys
import json

print("Loading model...")  # Debugging

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

print("Model loaded successfully!")  # Debugging

def generate_embeddings(text):
    print(f"Generating embeddings for: {text}")  # Debugging
    embeddings = model.encode([text]).tolist()
    return embeddings

if __name__ == "__main__":
    try:
        print("Waiting for input...")  # Debugging
        input_text = sys.stdin.read().strip()
        print(f"Received input: {input_text}")  # Debugging

        embeddings = generate_embeddings(input_text)
        print(json.dumps(embeddings))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
