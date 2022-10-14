FROM node:16-alpine AS builder

WORKDIR /app
RUN mkdir "dist"
COPY . .

RUN npm install
RUN npm run build

FROM node:alpine
WORKDIR /app

COPY --from=builder /app/dist /app
RUN npm install express -g

EXPOSE 8000

CMD ["node", "server.js"]
