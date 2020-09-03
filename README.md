# Домашняя работа № 15
***
Версия 0.0.1

## Описание:
В данном репозитории находится домашняя работа № 15 курса Яндекс.Практикум. Это Учебный проект по созданию сервера с использованием базы данных.

## Адрес сервера
- 84.201.165.227
- https://yamestoapp.ga

## Основной функционал: 
- REST API:
  - по запросу `[адрес сервера]/users` 
  возвращает всех пользователей из базы
  - по запросу `GET [адрес сервера]/users/id` 
  возвращает пользователя по _id
  - по запросу `POST [адрес сервера]/signup` создаёт пользователя с переданными в теле запроса name, email, password, about и avatar
  - по запросу `POST [адрес сервера]/signip` решистрирует пользователя в системе
  - по запросу `GET [адрес сервера]/cards` возвращает все карточки из базы
  - по запросу `POST [адрес сервера]/cards` создаёт карточку с переданными в теле запроса name и link. owner проставляется
  - по запросу `DELETE [адрес сервера]/cards/:cardId` удаляет карточку по _id
  - по запросу `PATCH [адрес сервера]/users/me` обновляет профиль
  - по запросу `PATCH [адрес сервера]/users/me/avatar` обновляет аватар
  - по запросу `PUT [адрес сервера]/cards/:cardId/likes` поставить лайк карточке
  - по запросу `DELETE [адрес сервера]/cards/:cardId/likes` убрать лайк с карточки
  

## Стэк технологий:
- node.js
- express.js
- mongoDB

## Пакеты в сборке:
- [nodemon](https://www.npmjs.com/package/nodemon)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [eslint](https://www.npmjs.com/package/eslint)
- [mongoose](https://mongoosejs.com/)
- [Helmet](https://www.npmjs.com/package/helmet)
- [cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [celebrate](https://www.npmjs.com/package/celebrate)
- [winston](https://www.npmjs.com/package/winston)
- [express-winston](https://www.npmjs.com/package/express-winston)
- [dotenv](https://www.npmjs.com/package/dotenv)


## Инструкция по запуску:
Сервер запущен по адресу:
- 84.201.165.227
- https://yamestoapp.ga

Если хотите установить локально, тогда:
1. Скачать или склонировать репозиторий
2. Установить зависимости при помощи npm - `npm i`
3. Запуск:
    - Запуск сервера на localhost:3000 - `npm run start`
    - Запуск сервера на localhost:3000 с хот релоудом - `npm run dev`

## Github:
https://github.com/AIMoiseyev/amoiseyev-homework15/tree/develop

