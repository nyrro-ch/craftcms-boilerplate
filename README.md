# Boilerplate for craft project
---

## Overview
This is a setup for starting a new craftcms project.
It includes webpack, twigpack and tailwindcss


## Requirements
- Docker
- Craftcms Nitro


## Project setup
1. Install craftcms and redactor/seomatic/twigpack plugins.
> Run the command from the root directory of the project
```Bash
make install

```

2. Change Twigpack settings to point host.docker.internal:3000

3. Change php version in composer.json file if needed

4. Install all js packages
>Change `(pwd)` according to your shell
```Bash
docker run --rm -v (pwd)/buildchain:/app -w /app node:latest yarn install
```

5. Set variables in `.env` file

6. Before runing the buildchain container relpace `<project>` in `Makefile` with the actual nitro project name. Then run the buildchain container
```Bash
make start

```
7. For production change the `output > publicPath option to the right path`


## Troubleshoot
#### Docker port 3000 already in use from nitro-proxy
Set env variable in terminal or in bashrc file `export NITRO_NODE_PORT=4000`.
After setting the port delete nitro-proxy container and run `nitro init`.

Other solution would be to change the port for webpack dev server.
