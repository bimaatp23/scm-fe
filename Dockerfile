FROM node:18-alpine

ARG REACT_APP_ENDPOINT
ARG REACT_APP_SECRET_KEY

RUN echo "REACT_APP_ENDPOINT=${REACT_APP_ENDPOINT}"
RUN echo "REACT_APP_SECRET_KEY=${REACT_APP_SECRET_KEY}"

ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT
ENV REACT_APP_SECRET_KEY=$REACT_APP_SECRET_KEY

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]