FROM node:lts-alpine

ARG APP_DIR=app
WORKDIR ${APP_DIR}
COPY package.json ./
COPY yarn.lock ./
RUN npm --global install yarn
ENV NODE_ENV production
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000

CMD [ "yarn", "start" ]