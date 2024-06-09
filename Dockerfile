# Stage 1: Build Angular app
FROM node:latest as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -f

COPY . .

RUN npm run build

# Stage 2: Setup Nginx server to serve Angular app
FROM nginx:alpine

COPY --from=build /app/dist/trhapp-fe/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
