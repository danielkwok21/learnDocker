# Docker compose
Instead of specifying a bunch of flags during `docker run` (e.g. -v for volume, -p for port, etc) - specify all in a `docker-compose.yml` file, and simply run it using `docker-compose up`.

# Getting started
```bash
docker-compose up
```

# Hard lessons
1. Keep Dockerfile within [./app](./app) directory. Not the root directory.