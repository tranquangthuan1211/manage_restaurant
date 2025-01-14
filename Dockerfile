FROM --platform=linux/amd64 node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
