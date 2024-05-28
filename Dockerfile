FROM node:latest

RUN     npm install -g http-server

WORKDIR /app
COPY dist/trhapp-fe/browser/. .

EXPOSE  80

CMD ["http-server", "-P", "http://localhost/", "-p" ,"80", "/app"]
