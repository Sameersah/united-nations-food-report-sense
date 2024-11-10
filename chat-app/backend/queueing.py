import aiormq
import asyncio
import threading
from data import Cache, Prompt, Response
from pika.exceptions import AMQPConnectionError


class Broker:
    def __init__(self, cache: Cache):
        self.cache = cache


    async def start(self):
        self.connection = await aiormq.connect("amqp://guest:guest@localhost//")
        self.channel = await self.connection.channel()
        self.receive_messages_task = asyncio.create_task(self.receive_messages())
        self.question_queue = await self.channel.queue_declare(queue='question_queue')
        self.response_queue = await self.channel.queue_declare(queue='response_queue')


    async def stop(self):
        print("Shutting down broker.")


    async def send_message(self, prompt: Prompt):
        print(prompt.id)
        print(prompt.message)
        await self.channel.basic_publish(
            exchange='',
            routing_key='question_queue',
            body=prompt.json().encode('utf-8')
        )


    async def receive_messages(self):
        async for response in self.response_queue:
            async with response.process():
                print(f"{response.body.decode()}")
