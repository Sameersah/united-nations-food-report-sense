Install dependencies with `pip install -r requirements.txt`

Run redis with `docker run -d --name my-redis-stack -p 6379:6379  redis/redis-stack-server:latest`
Run rabbitmq with `docker run --rm -d --network=host --name some-rabbit rabbitmq:3-management`

Run this backend with `uvicorn app:app --reload`

