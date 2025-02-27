FROM node:20
WORKDIR /backend

COPY *.json ./
RUN npm install

COPY src ./src
COPY .env ./
COPY run.sh ./
RUN chmod +x run.sh
EXPOSE ${PORT}
CMD ["./run.sh"]
