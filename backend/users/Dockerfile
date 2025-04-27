FROM node:23.11-slim
RUN npm i -g @nestjs/cli
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]