FROM node:latest

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Copy and install app dependencies
COPY package*.json ./
RUN npm install

# Bundle server source code
COPY . .

# Build the backend
RUN npm run build

# Expose the port
EXPOSE 8000

CMD npm start
