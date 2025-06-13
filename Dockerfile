# Dockerfile for hosting Argon2 Hash Generator and Verifier
# Uses Nginx to serve static files

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copy application files
COPY . /usr/share/nginx/html

EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]