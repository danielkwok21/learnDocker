# docker-compose + environment variables
MVP of using environment variables with docker-compose

# Getting started

1. Start service.
```bash
# Assuming $ROOT is the directory .env resides in
cd $ROOT

# Build image without secrets with docker-compose
docker-compose build

# Run image in container, injecting secrets here, at run time.
docker run -p 4000:4000 --env-file ./.env 7dockerimagesecrets_my_node_app
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
1. Secrets are not meant to be built into an image. The image should have no environment variables/secrets when it's built. It should only be injected during `docker run`.  
```bash
# Build image without secrets with docker-compose
docker-compose build

# Run image in container, injecting secrets here, at run time.
docker run -p 4000:4000 --env-file ./.env 7dockerimagesecrets_my_node_app
```

2. **There is a difference** between `docker-compose up` and `docker run <image>`. The reason for this is because  

    For `docker-compose up`,  
    - the .env files is loaded automatically
    - And passed into the container via `environment` at [./docker-compose.yml](./docker-compose.yml).
    - In this case, the env vars available to run time is `DOCKER_NAME` and `DOCKER_AGE` 
    ```yml
        environment: 
          DOCKER_NAME: ${ENV_NAME}
          DOCKER_AGE: ${ENV_AGE}
    ```

    For `docker run <image>`
    - The environment variables are injected with the `--env-file` option.
    - In this case, the env vars available to run time is `ENV_NAME` and `ENV_AGE` 