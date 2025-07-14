FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV NODE_ENV=production

RUN npm run build

EXPOSE ${APP_PORT:-3001}

CMD ["npm", "run", "start:prod"] 