FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install --legacy-peer-deps

EXPOSE 5173

# Source code will be mounted as a volume at runtime
CMD ["npm", "run", "dev"]
