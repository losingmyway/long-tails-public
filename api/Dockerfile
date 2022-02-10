FROM node:12.22

ENV PORT 3333
ENV NODE_ENV development

# Create app directory
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

# Installing dependencies
COPY package*.json /usr/src/api/
# RUN npm i nodemon typescript ts-node -g
RUN npm install

# Copying source files
COPY . /usr/src/api

EXPOSE 3333

# Running the api
CMD "npm" "run" "dev"
# CMD "npm" "run" "prod"