# timetable
University project

# Описание

Сайт представляет собой интерфейс для составления расписания в учебных заведениях. 

Основной функционал включает в себя : 
добавление событий (задание им времени, места, участников),
редактирование и удаление, поддержка сопоставимости по времени и участникам (два события не могут
происходить одновременно в одном месте) и т.д.

Вывод расписания осуществляется индивидуально для каждого пользователя или группы

Есть возможность добавлять участников по email. При входе пользователь регестрируется и указывает email.

Авторизация происходит через студенческий Google-аккаунт СПбГУ.

Дополнительно: возможность оставлять вопросы и комментарии к событиям.

## Наименование

TimeTable

## Предметная область

Расписание для университетов

# Данные
## Для каждого элемента данных - ограничения
### User
| name | type | constrains |
| ---- | ---- | ---------- |
| id   | Integer|  primary_key|
| email| String(100)| unique, not null|
| name | String(100)| not null |
| role | enum | nullable |
| group_id | Integer | nullable |

role - студент, преподаватель

### Group
| name | type | constrains |
| ---- | ---- | ---------- |
| id   | Integer|  primary_key|
| name | String(100) | unique, not null|

### Event
| name | type | constrains |
| ---- | ---- | ---------- |
| id   | Integer|  primary_key|
| name |string(100)|unique, not null|
| location_id |Integer| not null|
| members | reference to UserEvent | nullable |
|time | int | not_null | 
|week_day | int | not_null | 

### UserEvent
| name | type | constrains |
| ---- | ---- | ---------- |
| user_id | Integer |not null|
| event_id | Integer | not null|

Строка означает что user (с id = user_id) участник event (с id = event_id)

### Location
Место мероприятия (Петергоф, Василиевский Остров и т.д)
| name | type | constrains |
| ---- | ---- | ---------- |
|location_id|Integer| primary_key|
|name | String(20) | not null|
|coordinates | String(100) | nullable |


## Общие ограничения целостности
* Между таблицами `Event` и `Location` отношение `Many to one`. 
* Между таблицами `User` `Event` отношение `Many to many`
# Пользовательские роли
## Для каждой роли - наименование, ответственность, количество пользователей в этой роли?

User Student (Кол-во: неограничено)
* Просматривать данные о мероприятиях
* Записываться на мероприятия 
* Оставлять вопросы и комментарии к событиям

User Teacher (10-100)
* То же, что и `Student`
* Одобрять запись студентов
* Добавлять и удалять новых `Teacher`

# UI / API 
* UI -  React
* API - Kotlin Ktor
# Технологии разработки
## Язык программирования

* Backend - Kotlin, sql
* Frontend - js, css, html

## СУБД
PostgreSQL

## ER Diagram
![Untitled Diagram](https://user-images.githubusercontent.com/26060058/145798526-1858e6b6-15af-49ff-bcf8-f276f72ae278.jpg)
