FROM node:20 AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


FROM base AS dev
CMD ["npm", "run", "dev"]


FROM base AS build
RUN npm run build


FROM nginx:1.26 AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]