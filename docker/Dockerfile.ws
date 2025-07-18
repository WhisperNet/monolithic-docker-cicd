FROM oven/bun:1
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./bun.lock ./bun.lock
COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json
COPY ./apps/ws/package.json ./apps/ws/package.json

RUN bun install
COPY ./apps/ws ./apps/ws

RUN bun run db:generate

EXPOSE 3002

CMD [ "bun","run","start:ws" ]