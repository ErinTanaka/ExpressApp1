FROM node:12
WORKDIR /usr/src/app
COPY /ExpressApp1/package*.json ./
RUN npm install
COPY . .
EXPOSE 8080

CMD ["node", "app.js"]


