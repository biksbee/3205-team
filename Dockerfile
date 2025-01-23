FROM node:18

WORKDIR /app

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 30110

CMD ["npm", "run", "start"]