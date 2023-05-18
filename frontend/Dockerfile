FROM node:19.9.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY . ./
COPY package-lock.json ./
RUN npm install 

# add app


# start app
CMD ["npm", "start"]