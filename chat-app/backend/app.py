from data import Prompt, Response, Cache
from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request
from queueing import Broker


app = FastAPI(root_path="/chat-app")
router = APIRouter()
cache = Cache()
broker = Broker(cache)


@router.get("/response")
async def get_response(id: str):
    return cache.getResponse(id=id)


@router.post("/prompt")
async def post_prompt(message: str):
    prompt = Prompt(message)
    broker.send(prompt)
    return { "id": prompt.id }


app.include_router(router)
