FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm install next@14.2.5

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
