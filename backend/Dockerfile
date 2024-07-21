FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install prisma @prisma/client

RUN apt-get update && apt-get install -y netcat postgresql-client

COPY . .

RUN npx prisma generate

COPY entrypoint.sh /usr/src/app/

RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["sh", "/usr/src/app/entrypoint.sh"]
CMD ["npm", "run", "dev"]