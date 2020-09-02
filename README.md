# Домашняя работа № 15
***
Версия 0.0.1

## Описание:
В данном репозитории находится домашняя работа № 15 курса Яндекс.Практикум. Это Учебный проект по созданию сервера с использованием базы данных.

## Основной функционал: 
- REST API:
  - по запросу `GET localhost:3000/users` 
  возвращает всех пользователей из базы
  - по запросу `GET localhost:3000/users/id` 
  возвращает пользователя по _id
  - по запросу `POST localhost:3000/signup` создаёт пользователя с переданными в теле запроса name, email, password, about и avatar
  - по запросу `POST localhost:3000/signip` решистрирует пользователя в системе
  - по запросу `GET localhost:3000/cards` возвращает все карточки из базы
  - по запросу `POST localhost:3000/cards` создаёт карточку с переданными в теле запроса name и link. owner проставляется
  - по запросу `DELETE localhost:3000/cards/:cardId` удаляет карточку по _id
  - по запросу `PATCH localhost:3000/users/me` обновляет профиль
  - по запросу `PATCH localhost:3000/users/me/avatar` обновляет аватар
  - по запросу `PUT localhost:3000/cards/:cardId/likes` поставить лайк карточке
  - по запросу `DELETE localhost:3000/cards/:cardId/likes` убрать лайк с карточки
  

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


## Инструкция по запуску:
1. Скачать или склонировать репозиторий
2. Установить зависимости при помощи npm - `npm i`
3. Запуск:
    - Запуск сервера на localhost:3000 - `npm run start`
    - Запуск сервера на localhost:3000 с хот релоудом - `npm run dev`

## Github:
https://github.com/AIMoiseyev/amoiseyev-homework15/tree/develop

