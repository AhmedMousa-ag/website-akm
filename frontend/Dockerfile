FROM node:20.9.0 AS builder
WORKDIR /app

COPY . .
RUN npm install
RUN npm run  build

#Stage 2
FROM nginx:1.27.2
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
