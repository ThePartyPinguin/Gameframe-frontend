# Get the default Node.js Alpine image.
FROM node:10.15.3-alpine AS node

# Install the latest Chromium package, which is used to run the application's tests.
RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk add --no-cache chromium@edge harfbuzz@edge nss@edge \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

# Set the Chrome environment variables.
ENV CHROME_BIN=/usr/bin/chromium-browser \
	CHROME_PATH=/usr/lib/chromium/

# Set the working directory to /app.
WORKDIR /app

# Copy over the npm package files to the working directory (for caching purposes).
COPY package*.json ./

# Install the npm packages.
RUN npm install

# Copy over the application files to the working directory.
COPY ./ ./

# Run the application's tests.
#RUN npm run test-headless

# Build the application.
RUN npm run build-production

# Get the default NGINX Alpine image.
FROM nginx:alpine

# Copy over the NGINX configuration.
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf

# Copy over the application files to the NGINX static HTML folder.
COPY --from=node /app/dist/Gameframe-Frontend /usr/share/nginx/html
