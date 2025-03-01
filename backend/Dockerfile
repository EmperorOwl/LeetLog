FROM node:20 AS base
WORKDIR /app

ENV PORT=8080
ENV ADMIN_USERNAME=admin
ENV ADMIN_PASSWORD=admin
ENV SECRET_KEY=secret

COPY *.json ./
RUN npm install

COPY . .


FROM base AS dev
ENV DB_NAME=dev
ENV FRONTEND_URL=http://localhost:3000
CMD ["npm", "run", "dev"]


FROM base AS test
ENV DB_NAME=test
CMD ["npm", "run", "test"]


FROM base AS build
CMD ["npm", "run", "build"]


FROM build AS prod
CMD ["npm", "start"]
