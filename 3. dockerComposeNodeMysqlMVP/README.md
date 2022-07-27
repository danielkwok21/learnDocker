# docker-compose + node + mysql MVP
MVP of setting up nodejs + mysql using docker compose.  
Goes over core concepts like
- `depends_on` in [./docker-compose.yml](./docker-compose.yml)
- how to seed db using [./init/](./init/)

# Getting started
1. Start service
```bash
# Clean previous containers, images, and volumes
docker container prune && docker image prune && docker volume prune

# Start service
docker-compose up
```

2. Go to any of these endpoints  
http://localhost:4000/tables to get a list of tables in db  
http://localhost:4000/insert to insert dummy data into `user` table  
http://localhost:4000/ to select * from `user` table

# Key concepts
1. To run a seed script, simply move any files that does so (with extension .sh, .sql, sql.gz) into the container's directory at /docker-entrypoint-initdb.d. That is what's happening at [./docker-compose.yml](./docker-compose.yml).
    ```yml
        # To initialize MYSQL db with relevent schemas
        # Copied local init directory into container's /docker-entrypoint-initdb.d directory
        volumes:
        - ./init:/docker-entrypoint-initdb.d
    ```
    https://hub.docker.com/_/mysql#:~:text=Initializing%20a%20fresh%20instance