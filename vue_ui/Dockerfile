# Use an official Node.js runtime as a parent image
FROM node:19-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Create a new image for serving the built application
FROM nginx:1.17.10-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html

