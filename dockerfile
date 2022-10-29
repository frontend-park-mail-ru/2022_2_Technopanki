FROM node:alpine AS builder

WORKDIR /app
RUN mkdir "dist"
COPY . .

RUN npm install
RUN npm run build

FROM node:alpine
WORKDIR /app

COPY --from=builder /app/dist .
RUN npm install express

CMD ["node", "server.js"]
