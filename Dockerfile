FROM node:alpine as builder

WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

RUN export NODE_OPTIONS="--max-old-space-size=5120" 

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html
