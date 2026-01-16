FROM node:18

WORKDIR /usr/src/app

COPY . .
COPY package*.json ./
RUN npm i

EXPOSE 3001

CMD ["npm", "start"]