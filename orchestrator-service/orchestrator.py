import os
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

os.environ["OPENAI_API_KEY"] = "<API_KEY>"
documents = SimpleDirectoryReader("./data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

question = "List major Food insecurity reason in 2024 and also list the issn id of the document you use"

response = query_engine.query(question)

print(f"Q:{question}")
print(f"A:{response}")