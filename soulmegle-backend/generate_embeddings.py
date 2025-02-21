import sys
import json
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def get_embedding(text):
    return model.encode([text]).tolist()[0]

if __name__ == "__main__":
    input_text = sys.stdin.read().strip()
    embeddings = get_embedding(input_text)
    print(json.dumps(embeddings))
