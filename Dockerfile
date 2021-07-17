FROM node:10.19
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
#ADD https://github.com/rezamerdeka/sejutahati.git /app
COPY . /app
CMD node index.js
EXPOSE 5000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
