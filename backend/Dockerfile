FROM node:20
WORKDIR /backend

COPY *.json ./
RUN npm install

COPY src ./src
RUN npm run build

COPY .env ./
EXPOSE ${PORT}
CMD ["node", "./dist/server.js"]
