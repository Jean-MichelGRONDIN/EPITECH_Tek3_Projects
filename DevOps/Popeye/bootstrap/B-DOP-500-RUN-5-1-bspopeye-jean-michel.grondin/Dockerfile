FROM debian:buster

RUN apt-get update

RUN apt-get install -y nodejs npm

COPY app.js /opt
COPY package.json /opt

RUN npm install /opt

EXPOSE 3000

CMD node /opt/app.js
