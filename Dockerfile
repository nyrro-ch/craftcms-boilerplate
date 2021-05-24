FROM node:latest
WORKDIR /app
ENTRYPOINT ["yarn", "--cwd", "buildchain/", "dev"]
