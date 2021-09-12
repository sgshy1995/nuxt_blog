FROM node:14
ENV NODE_ENV=production
ENV HOST 0.0.0.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn config set registry https://registry.npm.taobao.org/

RUN yarn install --production=false
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

COPY . .

# build
# RUN yarn build

EXPOSE 8000

CMD [ "yarn", "product" ]
