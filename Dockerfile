# Dockerfile for hosting Argon2 Hash Generator and Verifier
# Uses Nginx to serve static files

FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy static site files
COPY index.html style.css generator.js verifier.js ./

# Copy compiled Argon2 UMD and WASM from docs/dist
COPY docs/dist/argon2.js docs/dist/argon2.wasm docs/dist/argon2-simd.wasm ./docs/dist/

EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
