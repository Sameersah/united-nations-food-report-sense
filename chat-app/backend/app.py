from data import Prompt, Response, Cache
from fastapi import APIRouter, Depends, HTTPException, FastAPI, Request
from queueing import Broker


app = FastAPI(root_path="/chat-app")
router = APIRouter()
cache = Cache()
broker = Broker(cache)


@router.get("/response")
async def get_response(id: str):
    response = cache.getResponse(id=id)
    if not response:
        raise HTTPException(status_code=404, detail="Response not found")
    return response


@router.post("/prompt")
async def post_prompt(prompt: Prompt):
    ## redis cache check here if prompt exists
    response = cache.getResponse(id=prompt.id())
    if response:
        print("Response found in cache")
        return response
    else:
        await broker.send_message(prompt)
        return { "id": prompt.id() }


@app.on_event("startup")
async def startup_event() -> None:
    global broker
    await broker.start()


@app.on_event("shutdown")
async def shutdown_event():
    global broker
    if broker:
        await broker.stop()


app.include_router(router)
