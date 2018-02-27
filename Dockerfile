FROM 'node:9-alpine'
MAINTAINER 'Dave Sag <davesag@gmail.com>'

RUN apk add --update postgresql-client

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Build code for development
RUN npm install

# Bundle app source
COPY . .

# expose the port
EXPOSE 3000

# start it
CMD [ "npm", "start" ]
