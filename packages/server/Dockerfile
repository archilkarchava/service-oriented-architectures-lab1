FROM node:lts-alpine
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
COPY yarn.lock .
# Install all Packages
RUN yarn install
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN yarn global add typescript@3.6.2 cross-env
RUN yarn build
# Start
EXPOSE 4000
CMD [ "yarn", "start" ]