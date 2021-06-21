# Boilerplate for craft project
This is just a simple CraftCMS boilerplate for starting a new project. There are a lot more optimizations available for the webpack production file.

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

2. Change/Create Twigpack config file and set settings to point host.docker.internal:3000
```
<?php 

return [
    // Global settings
    '*' => [
        // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
        'useDevServer' => false,
        // Enforce Absolute URLs on includes
        'useAbsoluteUrl' => true,
        // The JavaScript entry from the manifest.json to inject on Twig error pages
        // This can be a string or an array of strings
        'errorEntry' => '',
        // String to be appended to the cache key
        'cacheKeySuffix' => '',
       // Manifest file names
        'manifest' => [
            'legacy' => 'manifest.json',
            'modern' => 'manifest.json',
        ],
        // Public server config
        'server' => [
            'manifestPath' => '@webroot/dist',
            'publicPath' => '/dist',
        ],
        // webpack-dev-server config
        'devServer' => [
            'manifestPath' => 'http://host.docker.internal:3000/',
            'publicPath' => 'http://host.docker.internal:3000/',
        ],
        // Bundle to use with the webpack-dev-server
        'devServerBuildType' => 'modern',
        // Whether to include a Content Security Policy "nonce" for inline
        // CSS or JavaScript. Valid values are 'header' or 'tag' for how the CSP
        // should be included. c.f.:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script
        'cspNonce' => '',
        // Local files config
        // Local files config
        'localFiles' => [
            'basePath' => '@webroot/',
        ],
    ],
    // Live (production) environment
    'live' => [
    ],
    // Staging (pre-production) environment
    'staging' => [
    ],
    // Development environment
    'dev' => [
        // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
        'useDevServer' => true,
    ],
];
```
3. Change php version in composer.json file if needed

4. Install all js packages and maybe update them
>Change `(pwd)` according to your shell
```Bash
docker run --rm -v (pwd)/buildchain:/app -w /app node:latest yarn install
```

5. Set variables in `.env` file

6. Before runing the buildchain container relpace `<project>` in `Makefile` with the actual nitro project name. Then run the buildchain container
```Bash
make start

```
7. For production change in `buildchain/webpack.prod.js` output > publicPath option to the right path.


## Troubleshoot
#### Docker port 3000 already in use from nitro-proxy
Set env variable in terminal or in bashrc file `export NITRO_NODE_PORT=4000`.
After setting the port delete nitro-proxy container and run `nitro init`.

Other solution would be to change the port for webpack dev server.
