FROM node:20 AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL:-http://localhost:8080}

FROM base AS dev
CMD ["npm", "run", "dev"]


FROM base AS build
RUN npm run build


FROM build AS preview
CMD ["npm", "run", "preview"]


FROM nginx:1.26 AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]