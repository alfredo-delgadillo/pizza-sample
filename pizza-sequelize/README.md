# NPX Installation
npm install -g npx -S

# Sequelize Installation
npm install -g sequelize-cli -S
npm install -g sequelize -S

# Sequelize Models
npx sequelize-cli model:generate --name pizza --attributes id:integer,name:string,description:string

# Sequelize Migrations
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file                [aliases: migration:create]  sequelize model:generate                    Generates a model and its migration               [aliases: model:create]  sequelize seed:generate                     Generates a new seed file                          [aliases: seed:create]

# Sequelize Seeding
npx sequelize-cli seed:generate --name pizza

# Docker postgres
docker run --name=postgres -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=secret -e PGDATA=pgdata -v /pgdata:/pgdata -d postgres:11.8

# docker start postgres
docker build --rm -t pizza-sequelize .
docker-compose up --remove-orphans

docker rmi $(docker images --filter "dangling=true" -q --no-trunc)