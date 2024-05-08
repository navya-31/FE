# Use the official Node.js image as base
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Expose port 5000 for the Express.js server
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
