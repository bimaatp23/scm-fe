FROM node:18-alpine

ENV REACT_APP_ENDPOINT
ENV REACT_APP_SECRET_KEY

WORKDIR /app

COPY . .

RUN npm install

RUN npm install -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]