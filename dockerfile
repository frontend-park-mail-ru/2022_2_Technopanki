FROM node:alpine AS builder

WORKDIR /app
RUN mkdir "dist"
COPY package.json /app/
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/jobflow/*
COPY --from=builder /app/dist /usr/share/nginx/jobflow

RUN mkdir /etc/nginx/sites-available
RUN mkdir /etc/nginx/sites-enabled
RUN mkdir /etc/nginx/dh

# SSL
RUN curl https://ssl-config.mozilla.org/ffdhe2048.txt > /etc/nginx/dh/dhparam
COPY secrets/ /etc/ssl/jobflow.com/

COPY .conf/.nginx/default.conf /etc/nginx/sites-available/default.conf
COPY .conf/.nginx/frontend.conf /etc/nginx/sites-available/
COPY .conf/.nginx/nginx.conf /etc/nginx/


RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/frontend.conf /etc/nginx/sites-enabled/
WORKDIR /app
