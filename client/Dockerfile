FROM node:latest

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Copy and install app dependencies
COPY package*.json ./
RUN npm install

# Bundle client source code
COPY . .

# Build the frontend
RUN npm run build

# Serve static build
RUN npm install -g serve

# Expose the port
EXPOSE 3000

CMD serve -s build
