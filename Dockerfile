# add base image we can define version number against alpine
# https://hub.docker.com/_/node
FROM node:alpine

# Add working directory other wise it make in out of folder
WORKDIR /usr/app

# Copy whole folder from local to docker container
COPY ./package.json ./

# install depandancies
RUN npm install

# Copy whole folder from local to docker container
COPY ./ ./


# start app defualt command
CMD [ "npm" , "start" ]