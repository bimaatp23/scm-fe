FROM node:18-alpine

ENV REACT_APP_ENDPOINT=null
ENV REACT_APP_SECRET_KEY=null

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]