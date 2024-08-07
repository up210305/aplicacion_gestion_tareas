FROM node:20.5.0-alpine3.18
RUN addgroup front && adduser -S -G front front
USER front
WORKDIR /app/
COPY --chown=front package*.json .
RUN npm install
COPY --chown=front . .
CMD ["npm", "run", "start"]