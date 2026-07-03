# Stage 1: Build the React Application
FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# Pass in any API URL at build time (e.g., from docker-compose or CI)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:alpine

# Copy the build output from the first stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
