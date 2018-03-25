FROM node:latest

WORKDIR /usr/src

ENV PATH /usr/src/node_modules/.bin:$PATH

ADD package.json /usr/src/package.json
RUN npm install
RUN npm install react-scripts@0.9.5 -g

CMD ["npm", "start"]
