FROM node:18-alpine

ARG REACT_APP_ENDPOINT
ARG REACT_APP_SECRET_KEY

RUN echo "REACT_APP_ENDPOINT=${REACT_APP_ENDPOINT}"
RUN echo "REACT_APP_SECRET_KEY=${REACT_APP_SECRET_KEY}"

ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT
ENV REACT_APP_SECRET_KEY=$REACT_APP_SECRET_KEY

WORKDIR /app

RUN npm install -g serve

COPY . .

EXPOSE 3000

CMD ["serve", "-s", "build"]