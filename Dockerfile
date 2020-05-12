FROM node:12

# Create app directory
WORKDIR /src

# Copying app source
COPY . .

# Install app dependencies
# RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# EXPOSE 3000
# CMD [ "npm", "start" ]