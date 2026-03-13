FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Install node for the backend
RUN apk add --no-cache nodejs npm

WORKDIR /app

# Copy built frontend to nginx
RUN mkdir -p /usr/share/nginx/html/identity_journal
COPY --from=builder /app/dist /usr/share/nginx/html/identity_journal

# Copy backend files
COPY --from=builder /app/server /app/server
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules

# Nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY vite-nginx.conf /etc/nginx/conf.d/nginx.conf

ENV DATABASE_URL=$DATABASE_URL
ENV DB_PROJECT_ID=$DB_PROJECT_ID
ENV DB_API_KEY=$DB_API_KEY
ENV GOOGLE_TRANSLATE_API_KEY=$GOOGLE_TRANSLATE_API_KEY

EXPOSE 80
EXPOSE 3001

# Scripts to start both Nginx and Node server
RUN npm install -g ts-node typescript

CMD ["sh", "-c", "npx ts-node server/index.ts & nginx -g 'daemon off;'"]
