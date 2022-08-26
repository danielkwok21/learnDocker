# Docker compose
Instead of specifying a bunch of flags during `docker run` (e.g. -v for volume, -p for port, etc) - specify all in a `docker-compose.yml` file, and simply run it using `docker-compose up`.

# Getting started
```bash
docker-compose up
```

# Hard lessons
1. Keep Dockerfile within [./app](./app) directory. Not the root directory.
2. if running `docker build`, must run it at the same level at which Dockerfile exists. In this case, within [./app](./app) directory
