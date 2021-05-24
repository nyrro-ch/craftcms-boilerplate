# Boilerplate for craft project
---

## Overview
---
The project works with **craftcms**, **tailwindcss** **webpack** and **twigpack**

## Requirements
---
- Docker
- Craftcms Nitro

## Project setup
---
1. Install craftcms and redactor/seomatic/twigpack plugins
**Run the command from the root directory of the project**
```docker
make install
# Change Twigpack settings to point http://host.docker.internal:3000/
# Change php version in composer.json file
```
2. Install all js packages
```docker
docker run --rm -v (pwd)/buildchain:/app -w /app node:latest yarn install
```
3. Before runing the buildchain container relpace `<project>` in `Makefile` with the actual nitro project name. Then run the buildchain container
```makefile
make start
```
4. Create `.env` file

## Troubleshoot
---
#### Docker port 3000 already in use from nitro-proxy
Set env variable in terminal or in bashrc file `export NITRO_NODE_PORT=4000`.
After setting the port delete nitro-proxy container and run `nitro init`.

Other solution would be to change the port for webpack dev server.
