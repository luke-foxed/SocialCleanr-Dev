FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

# Install modified teachablemachine package
RUN npm run postinstall

# Set Google Cloud Vision ENV
ENV GOOGLE_APPLICATION_CREDENTIALS="config/key.json"

# Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]