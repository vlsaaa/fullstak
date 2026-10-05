# Спринт

Приложение для тренера. Можно смотреть список спортсменов, планы на неделю, календарь, посещения, травмы, питание и короткие отчёты.

В примере тренер Анна Белова, группа «Спринт-17». На экранах пока демонстрационные данные из файла, без запросов к серверу.

## Что можно сделать

1. Открыть обзор: сколько людей в группе, посещаемость, кто травмирован.
2. Найти спортсмена и открыть карточку.
3. Посмотреть план недели и тренировки.
4. В календаре выбрать день.
5. Посмотреть отметки по тренировке.
6. Открыть травмы, питание и отчёт.

## Экраны

- Обзор — `/` — docs/screenshots/01-obzor.png
- Спортсмены — `/athletes` — docs/screenshots/02-sportsmeny.png
- Карточка — `/athletes/1` — docs/screenshots/03-kartochka.png
- Планы — `/plans` — docs/screenshots/04-plany.png
- План недели — `/plans/2` — docs/screenshots/05-plan.png
- Календарь — `/calendar` — docs/screenshots/06-kalendar.png
- Посещения — `/attendance` — docs/screenshots/07-poseshchaemost.png
- Травмы — `/injuries` — docs/screenshots/08-travmy.png
- Питание — `/nutrition` — docs/screenshots/09-pitanie.png
- Отчёты — `/reports` — docs/screenshots/10-otchety.png

На узком экране ссылки прячутся под кнопку меню.

Интерфейс: React, TypeScript, React Router, MUI. Код в папке `Лабораторная 1/frontend`. Экраны в `src/pages`, демо-данные в `src/data/mock.ts`.

## Запуск frontend

```bash
cd "Лабораторная 1/frontend"
npm install
npm run dev
```

Открыть http://127.0.0.1:5173/

## Модель данных

База PostgreSQL, таблицы:

- athletes — спортсмен (имя, вид, группа, статус)
- training_plans — план на неделю, дата начала уникальная
- training_sessions — тренировка, ссылается на план
- attendance_marks — отметка, одна на пару тренировка + спортсмен
- injuries — травма спортсмена
- nutrition_entries — приём пищи

Если удалить план, удаляются его тренировки и отметки. Если удалить тренировку, удаляются её отметки. Спортсмена с отметками, травмами или питанием удалить нельзя, будет ответ 409.

## Запуск backend

Код в `Лабораторная 2/backend`. Нужны Docker и Python.

```bash
cd "Лабораторная 2/backend"
docker compose up -d
copy .env.example .env
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

База на порту 5433 (5432 у меня уже занят). Пользователь и пароль в `.env.example`: coach / coach, это только для локальной базы. Файл `.env` в git не кладётся.

Таблицы создаются при запуске сервера. API: http://127.0.0.1:8000 , документация: http://127.0.0.1:8000/docs

Фронт к API пока не подключён.
