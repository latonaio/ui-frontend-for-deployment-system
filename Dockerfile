FROM node:8.16.2-slim

# Definition of a Device & Service
ENV POSITION=UI \
    SERVICE=ui-frontend-for-deployment-system \
    AION_HOME=/var/lib/aion

# Install Dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    gnupg \
    tzdata \
    apt-transport-https \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Setup Directories
RUN mkdir -p ${AION_HOME}/$POSITION/$SERVICE
WORKDIR ${AION_HOME}/$POSITION/$SERVICE

EXPOSE 4000

ADD package.json .
RUN yarn

ADD . .
RUN mv .env.production .env

CMD ["yarn", "start"]

