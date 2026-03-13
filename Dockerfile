FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Create the subpath directory in the final image
RUN mkdir -p /usr/share/nginx/html/identity_journal

# Copy the build output to the subpath directory
COPY --from=builder /app/dist /usr/share/nginx/html/identity_journal

RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
