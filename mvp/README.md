# Sample Express application to learn Docker

## Guides
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Getting started
```bash
# Build
docker build . -t mvp

# Run
docker run -p 4000:4000 mvp

# Stop
# <container-id> is the id of the container generated from previous command
# can be retrieved via docker ps
docker stop <container-id>
```