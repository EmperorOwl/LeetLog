FROM node:20 AS base
WORKDIR /app

COPY *.json ./
RUN npm install

COPY . .

ENV PORT=8080
ENV ADMIN_USERNAME=admin
ENV ADMIN_PASSWORD=admin
ENV SECRET_KEY=secret
ENV FRONTEND_URL=http://localhost:3000


FROM base AS dev
ENV DB_NAME=dev
CMD ["npm", "run", "dev"]


FROM base AS test
ENV DB_NAME=test
CMD ["npm", "run", "test"]


FROM base AS build
RUN npm run build


FROM build AS prod
ENV DB_NAME=prod
CMD ["npm", "start"]
