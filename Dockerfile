FROM node:14

WORKDIR /usr/app

COPY package.json  ./

RUN yarn install

COPY . .

EXPOSE $APP_PORT

CMD [ "yarn", "dev"]
