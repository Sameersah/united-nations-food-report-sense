import pika
from data import Cache, Prompt, Response


class Broker:
    def __init__(self, cache: Cache):
        self.cache = cache


    def send(self, prompt: Prompt):
        pass


    # Receive message and call cache.putResponse()...
    def receive(self):
        pass

