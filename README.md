## ====WORKING WITH DOCKER=====
## Working Hasura before running test
- Copy .env.local.example and create .env.local in /frontend folder
and run docker
```bash
docker-compose up
```
- We need install hasura cli first
- Then cd to hasuru folder and run some command to migration data
# apply metadata, this will connect Hasura to the configured databases.
note that localhost not need --endpoint, you can change endpoint, admin scret from hasura/config.yaml too.
Use --endpoint when you want to update to other URL
```bash
npx hasura metadata apply --endpoint https://trusting-thrush-51.hasura.app
OR localhost
npx hasura metadata apply
```
# apply migrations to the connected databases.
```bash
npx hasura migrate apply --all-databases --endpoint https://trusting-thrush-51.hasura.app
npx hasura seed apply --database-name=default --endpoint https://trusting-thrush-51.hasura.app
OR localhost
npx hasura migrate apply --database-name=default
npx hasura seed apply --database-name=default
```
# reload metadata to make sure Hasura is aware of any newly created database objects.
```bash
npx hasura metadata reload --endpoint https://trusting-thrush-51.hasura.app
OR localhost
npx hasura metadata reload 
```
# To view GraphQL with database
Use this command to do this work:
```bash
npx hasura console
```
it will open "http://localhost:9695/" to allow you do these things

# for working locally only run
```bash
npx hasura console
```
## SITE URL
then we can go browser and view http://localhost:3000/api or http://localhost:3000/front ..
http://localhost:8080/console/api/api-explorer