# source .env
echo "Will Start Setup"
diesel setup
echo "Finished Setup"
diesel migration run
echo "Finished Migrations"