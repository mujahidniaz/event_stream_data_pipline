cd sql
docker build -t sqldb .
docker run -d -p 3306:3306 sqldb