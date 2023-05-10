# Use an official Node.js runtime as a parent image
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
#COPY . .

# Expose the port on which the server will listen
EXPOSE 3000

# Start the NestJS server
CMD ["npm", "run", "start"]
