ENV_FILE=./backend/rust-backend/.env

# docker compose --env-file=./backend/rust-backend/.env up init-db --build 

docker compose --env-file=$ENV_FILE up init-db --build 
docker compose --env-file=$ENV_FILE up --build