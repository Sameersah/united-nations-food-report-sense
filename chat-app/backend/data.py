import hashlib
import redis
from pydantic import BaseModel


def hash(object):
    hash_object = hashlib.sha256()
    hash_object.update(message.encode('utf-8'))
    return hash_object.hexdigest()


class Prompt(BaseModel):
    id: None
    message: str

    def __init__(self, **data):
        self.id = hash(data['message'])
        self.message = data['message']


class Response(BaseModel):
    id: str
    response: str


class Cache:
    def __init__(self):
        self.client = redis.StrictRedis(host='localhost', port=6379, db=0)


    def get(self, key):
        value = self.client.get(key)
        if value is None:
            return value
        else:
            return value.decode()


    def put(self, key, value):
        response = self.client.set(key, value)
        if not response:
            raise Exception(f"Failed to set value {value} for key {key} in redis")


    def getResponse(self, id: str):
        result = self.get(id)

        # Cache miss
        if not result:
            return None

        # Cache hit
        if result:
            response = Response(id, result)
            return response


    def putResponse(self, response: Response):
        self.put(response.id, response.response)
