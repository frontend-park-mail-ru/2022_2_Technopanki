FROM node:alpine AS builder

WORKDIR /app
RUN mkdir "dist"
COPY . .
RUN npm install

RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/jobflow/*
COPY --from=builder /app/dist /usr/share/nginx/jobflow

RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled

COPY .conf/.nginx/default.conf /etc/nginx/sites-available/default.conf
COPY .conf/.nginx/frontend.conf /etc/nginx/sites-available/
COPY .conf/.nginx/nginx.conf /etc/nginx/

RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/frontend.conf /etc/nginx/sites-enabled/
WORKDIR /app
