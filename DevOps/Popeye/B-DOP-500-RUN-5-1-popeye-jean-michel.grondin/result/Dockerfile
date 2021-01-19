FROM node:12-alpine

COPY ./result_app /opt

EXPOSE 80

WORKDIR /opt

RUN npm install

CMD node server.js