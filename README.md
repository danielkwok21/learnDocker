# Learn Docker
Repo for all docker-related learnings.

<p align="center">
<img src="https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png">
</p>

# How to use this repo
Each directory is a concept in Docker.  
`cd` into each, and read the respective READMEs.

# Common docker commands
|command|description|
|-|-|
|docker ps| List all containers|
|docker images| List all images|
|docker build `directory` -t `image-name` | Build image at `directory` with name `image-name`|
|docker run -p `external-port`:`internal-port` `image-name` | Run image named `image-name` and redirect traffic from container's port at `internal-port` to host's port at `external-port`|
|docker logs `container-id` -f | Print & follow container's logs|
|docker container prune | Remove all container not running|
|docker image prune -a | Remove all image without container|


# Common docker compose commands
|command|description|
|-|-|
|docker-compose up|Builds image & starts container for this dir|
|docker-compose down|Removes all unused container for this dir|