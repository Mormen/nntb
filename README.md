the application is only a prototype
$ docker-compose up
- run application

$ docker-compose exec be-mysql mysql -u dbUser -p'dbPassword' -e "USE dbName; INSERT INTO accounts (email,username,password) VALUES ('michal.zajice@seznam.cz','admin','supersecretpassword' );"
- create user, which can edit/delete reports

$ docker-compose exec be-mysql mysql -u dbUser -p'dbPassword' -e "USE dbName; SELECT * FROM accounts;"
- verify that user was created