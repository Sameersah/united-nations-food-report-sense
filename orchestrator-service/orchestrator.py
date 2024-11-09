import os

import pika
from pika.exceptions import AMQPConnectionError
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext, load_index_from_storage

os.environ["OPENAI_API_KEY"] = "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"


PERSIST_DIR = "./saved_index"
RABBITMQ_HOST = "localhost"

def build_and_save_index():
    documents = SimpleDirectoryReader("./knowledge_base").load_data()
    index = VectorStoreIndex.from_documents(documents)
    index.storage_context.persist(persist_dir=PERSIST_DIR)
    print("Index has been successfully built and saved.")
    return index

def load_or_build_index():
    if os.path.exists(PERSIST_DIR) and os.listdir(PERSIST_DIR):
        print("Loading existing index...")
        storage_context = StorageContext.from_defaults(persist_dir=PERSIST_DIR)
        index = load_index_from_storage(storage_context)
    else:
        print("Index not found. Building a new index...")
        index = build_and_save_index()
    return index

def connect_to_rabbitmq():
    try:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
        channel = connection.channel()
        print("Connected to RabbitMQ successfully.")
        return connection, channel
    except AMQPConnectionError as e:
        print(f"Error: Unable to connect to RabbitMQ at {RABBITMQ_HOST}. Is the server running?")
        print("Details:", str(e))
        exit(1)

# Load or build the index
index = load_or_build_index()
print("Index loaded successfully.")
query_engine = index.as_query_engine()

# Query the index
def on_message(ch, method, properties, body):
    question = body.decode()
    print(f"Received question: {question}")

    try:
        # Query the index
        response = query_engine.query(question)
        print(f"Response: {response}")

        # Send the response back to the response queue
        ch.basic_publish(
            exchange='',
            routing_key='response_queue',  # Replace with your response queue name
            body=str(response)
        )
        print("Response sent to response queue.")
    except Exception as e:
        print(f"Error processing question: {e}")





connection, channel = connect_to_rabbitmq()

# Declare queues
channel.queue_declare(queue='question_queue')
channel.queue_declare(queue='response_queue')

# Set up RabbitMQ consumer
channel.basic_consume(queue='question_queue', on_message_callback=on_message)

print("Waiting for questions...")
channel.start_consuming()
