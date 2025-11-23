FROM node:20.19.4

WORKDIR /src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["npm", "start"]