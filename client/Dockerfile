FROM node:alpine

ENV CI=true
ENV WCS_SOCKET_PORT=0

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD [ "npm","start" ]