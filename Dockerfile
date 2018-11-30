FROM node:8-alpine

# Make sure we have global dependencies
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh && \
    yarn global add @vue/cli @vue/cli-init

# Use /home/quasar for all CLI related code
WORKDIR /home/quasar

# Cache Dependencies
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

# Copy CLI Source
COPY . .

# Link CLI to Yarn and create App Dir
RUN yarn link && mkdir -p /usr/src/app

# Open port 8080 by default
EXPOSE 8080

# Set the working directroy to the App Dir
WORKDIR /usr/src/app
ENTRYPOINT [ "quasar" ]
CMD [ "-v" ]

#TODO: Possible file permissions: myapp:quasar user:group
