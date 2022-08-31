# docker-compose + environment variables
MVP of using environment variables with docker-compose

# Getting started

1. Start service.
```bash
# Assuming $ROOT is the directory .env resides in
cd $ROOT

# Start service
docker-compose up
```

2. Curl http://localhost:4000
```bash
curl http://localhost:4000
{
  # These are expected to be null, because they're docker's environment variables, not the container's
  "ENV_NAME":null,
  "ENV_AGE":null,

  # These are expected to have value, because the values are passed from docker to container
  "DOCKER_NAME":"DANIEL",
  "DOCKER_AGE":"123"
}
```

# Key concepts
How to inject environment variables from docker to container?

1. Create [.env](./.env) file. This file will be **AUTOMATICALLY** consumed by docker-compose.
```
ENV_NAME=DANIEL
ENV_AGE=123
```
2. Add an `<service>.environment` keyword to docker-compose.yml

```yml
services:

  my_node_app:
    build: ./app

    ports:
      - "4000:4000"

    volumes:
      - ./app:/usr/src/app

    # Relay docker environment variables into service environment variables
    # In this example, 
    # The docker env ENV_NAME is relayed into container as DOCKER_NAME 
    # The docker env ENV_AGE is relayed into container as DOCKER_AGE
    environment: 
      DOCKER_NAME: ${ENV_NAME}
      DOCKER_AGE: ${ENV_AGE}
```