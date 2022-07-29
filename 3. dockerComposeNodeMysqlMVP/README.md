# docker-compose + node + mysql MVP
MVP of setting up nodejs + mysql using docker compose.  
Goes over core concepts like
- the need for manually wait & retry connecting to mysql in nodejs
- how to seed db using [./init/](./init/)

# Getting started
1. Start service.
```bash
# Clean previous containers, images, and volumes
docker container prune && docker image prune && docker volume prune

# Start service
docker-compose up
```

2. Wait a couple seconds for DB to be alive. Else the next step would not return any result.
```bash
# Or till you see this message in the terminal
my_node_app_1  | Success. Connected to db
```

3. Curl http://localhost:4000/ to select * from `user` table.

# Key concepts
1. How to seed a db on container start. https://hub.docker.com/_/mysql#:~:text=Initializing%20a%20fresh%20instance.  
 To run a seed script, simply move any files that does so (with extension .sh, .sql, sql.gz) into the container's directory at /docker-entrypoint-initdb.d. That is what's happening at [./docker-compose.yml](./docker-compose.yml).
    ```yml
        # To initialize MYSQL db with relevent schemas
        # Copied local init directory into container's /docker-entrypoint-initdb.d directory
        volumes:
        - ./init:/docker-entrypoint-initdb.d
    ```
    https://hub.docker.com/_/mysql#:~:text=Initializing%20a%20fresh%20instance

2. `depends_on` does not dictact service "readiness".  
https://docs.docker.com/compose/startup-order/  
It merely states that if A `depends_on` B, B will be started before A. However, A would still need to manually check periodically for B if it's truly ready. This is demonstrated in the `connectDB()` in [./app/index.js](./app/index.js) that uses a combination of loops & awaits to accomplish this.