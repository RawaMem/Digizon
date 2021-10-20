flask db init
flask db migrate -m 'create tables'
flask db upgrade

flask seed all
flask seed undo


CREATE USER digizon_user WITH PASSWORD 'password' CREATEDB;
CREATE DATABASE digizon_db WITH OWNER digizon_user;

