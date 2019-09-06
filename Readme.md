Показ последних подключений (если это было от конкретного пользователя то выводится его логин)
Возможность редактирования данных пользователя
python 3 apt-get install
sudo apt-get update
sudo apt-get upgrade
Приложение состоит из 2х частей:
1. Клиент (реакт, 2 проект) для запуска необходимо перейти в директорию клиент, затем выполнить npm i для установки зависимых пакетов пакетов
затем npm start для запуска клиента:
    1. ./
    1. cd client
    1. sudo apt-get install npm
    1. npm i
    1. npm start
    1. http://localhost:3000/
2. Сервер (дописан еще в субботу) представляет rest api, которое включает в себя следующие эндпоинты:
GET - главная страница, получение подключений текущей страницы
1. / главная страница и поддерживает только GET
2. / user / login POST - аутентификация пользователя
3. / user / PUT - изменение данных пользователя, DELETE - удаление данных пользователя
4. / user / create - POST - создание пользователей

Для запуска необходимо выполнить:
 0. ./
 1. sudo apt-get install python3-pip python3-venv libpq-dev python3-dev
 1. mkdir venv
 1. python3 -m venv ./venv
 1. source venv/bin/activate
 1. pip install -r requirements.txt для установки зависимостей
 1. sudo apt-get install postgresql
 2. Подключить базу данных Postgresql в файле db.py
 3. выполнить миграциюpython 
    3. python manage.py makemigrations
    3. python manage.py migrate
 4. Сгенерировать сертификат: openssl req -nodes -new -x509 -keyout server.key -out server.cert
 5. Запустить сервер: python manage.py runsslserver 127.0.0.1:8000 --certificate server.cert --key server.key
