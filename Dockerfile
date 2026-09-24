# Node.js LTS version (lightweight Alpine-based image)
FROM node:20-alpine

# Set application working directory
WORKDIR /usr/src/app

# Copy package dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose application port
EXPOSE 5000

# Default environment variables
ENV NODE_ENV=development
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
