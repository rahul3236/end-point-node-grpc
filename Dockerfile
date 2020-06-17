FROM node:10
WORKDIR /app
COPY . .
RUN yarn install 
CMD ["node", "/app/server.js"]