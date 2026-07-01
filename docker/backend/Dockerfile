FROM node:22.11.0-alpine3.20 AS base

ARG DATABASE_URL
RUN echo "DATABASE_URL=$DATABASE_URL" > .env

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable yarn
WORKDIR /app

# Development
FROM base AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD [ "yarn", "start:dev" ]

# Deps stage
FROM base AS deps
COPY ./package.json ./yarn.lock ./
RUN [ "yarn", "install", "--immutable" ]
COPY --chown=node:node . .

# CI stage
FROM deps AS test
ENV NODE_ENV=test

# Build
FROM deps AS build
RUN [ "yarn", "build" ]

# Production server
FROM base AS prod
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

USER node

CMD [ "node", "dist/main" ]
