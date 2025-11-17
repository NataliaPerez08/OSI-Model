# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY index.html ./

RUN npm install --legacy-peer-deps

COPY src ./src
COPY public ./public

RUN npm run build

# ---------- Etapa 2: Nginx ----------
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
