# ────────────────────────────────
# Stage -> DEVELOPMENT
# ────────────────────────────────
# Uses a lightweight Node.js Alpine base image.
FROM node:alpine AS development 

# Sets working directory inside the container.
WORKDIR /usr/src/app

# Copies package.json and package-lock.json into container.
COPY package*.json ./

# Installs all dependencies (including dev dependencies, since this is dev stage).
RUN npm install

# Copy only the api-gateway folder and shared libs
COPY . .

# This compiles/transpiles your source code (likely from apps/cover-letter) into the dist/apps folder.
RUN npm run build api-gateway

# ────────────────────────────────
# Stage -> Production
# ────────────────────────────────
FROM node:alpine AS production

# Once the image is built, ARG is not available at runtime.
ARG NODE_ENV=production

# Scope: Runtime
# This sets an environment variable inside the container.
# When the container runs, process.env.NODE_ENV in Node.js will be "production" (or whatever was passed at build time).
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

# Installs only production dependencies (excluding dev dependencies) → keeps image smaller.
RUN npm install --only=production

# Copies the built dist folder from the development stage into this production stage.
# This way, the production image doesn’t need dev dependencies or build tools.
COPY --from=development /usr/src/app/dist ./dist

CMD [ "npm", "run", "start:prod:api-gateway" ]
