FROM node:10.19
WORKDIR /app
#COPY package.json package-lock.json ./
RUN npm install
RUN git clone https://github.com/rezamerdeka/sejutahati
#COPY . /app
RUN mv sejutahati/* /app/
RUN rm -rf sejutahati
RUN ls -la /app
#RUN ls -la /sejutahati/sejutahati
CMD node index.js
EXPOSE 5000
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start
