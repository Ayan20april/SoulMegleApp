from sentence_transformers import SentenceTransformer

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model.encode(["reading", "coding", "playing guitar"])

print(embeddings)  # This will return the embedding array
