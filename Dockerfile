FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild

COPY . .

EXPOSE 8081

CMD ["sh", "-c", "npm install && npm run dev"]
