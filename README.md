# Tran Quang Thuan
# Project-ExJS-Postgres
How to run:  
1. `npm install` to install all the dependencies
2. Create database and user in PostgreS:

```
psql -U postgres
CREATE USER new01 WITH PASSWORD 'pass01';
CREATE DATABASE data01;
\c data01 postgres
GRANT ALL ON SCHEMA public TO new01;
```
(Note that the username, password and database name should match the development ones in the config.json file)  

3. If you have the database, however, you need to migrate update all the changes to the schema
```
npx sequelize db:migrate
```
At anytime, you want to revert an migration with:

```
npx sequelize db:migrate:undo
```
4. You your database already have data and you want to use data from `seeders` folder instead, you need to clean your tables. In PostgreS:
```
psql -U postgres
\c data01 postgres
TRUNCATE TABLE table_name RESTART IDENTITY CASCADE;
```
With `table_name` is the name of the table you want to clean, e.g `users`, `products`, etc.  

5. `npx sequelize db:seed:all` to populate the database with some data