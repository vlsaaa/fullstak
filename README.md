# Спринт

Рабочее место тренера группы лёгкой атлетики. Тренер ведёт состав, недельные планы, календарь, посещаемость, травмы, питание и короткие отчёты.

Сейчас в интерфейсе тренер **Анна Белова**, группа **«Спринт-17»**, школа **СШОР «Старт»**. Данные на экранах демонстрационные: они лежат в коде и не приходят с сервера.

## Сценарии

1. Открыть обзор и сразу увидеть, сколько человек в группе, какая посещаемость и кого нельзя грузить.
2. Найти спортсмена в списке и открыть карточку: контакты, отметки, травмы, питание.
3. Посмотреть план текущей недели и состав тренировок.
4. В календаре выбрать день и прочитать, что запланировано.
5. Открыть посещаемость конкретной тренировки.
6. Просмотреть журнал травм и дневник питания.
7. Посмотреть простой отчёт: посещаемость, травмы, средние калории.

## Экраны

| Экран | Адрес | Скриншот |
| --- | --- | --- |
| Обзор | `/` | [docs/screenshots/01-obzor.png](docs/screenshots/01-obzor.png) |
| Спортсмены | `/athletes` | [docs/screenshots/02-sportsmeny.png](docs/screenshots/02-sportsmeny.png) |
| Карточка спортсмена | `/athletes/1` | [docs/screenshots/03-kartochka.png](docs/screenshots/03-kartochka.png) |
| Планы по неделям | `/plans` | [docs/screenshots/04-plany.png](docs/screenshots/04-plany.png) |
| План недели | `/plans/2` | [docs/screenshots/05-plan.png](docs/screenshots/05-plan.png) |
| Календарь | `/calendar` | [docs/screenshots/06-kalendar.png](docs/screenshots/06-kalendar.png) |
| Посещения | `/attendance` | [docs/screenshots/07-poseshchaemost.png](docs/screenshots/07-poseshchaemost.png) |
| Травмы | `/injuries` | [docs/screenshots/08-travmy.png](docs/screenshots/08-travmy.png) |
| Питание | `/nutrition` | [docs/screenshots/09-pitanie.png](docs/screenshots/09-pitanie.png) |
| Отчёты | `/reports` | [docs/screenshots/10-otchety.png](docs/screenshots/10-otchety.png) |

На узком экране слева вместо постоянной колонки появляется кнопка «Меню».

## Как устроен frontend

Код лежит в `Лабораторная 1/frontend`.

- `src/pages` — экраны.
- `src/components` — заголовок страницы, пустое состояние и цветные статусы.
- `src/layout/AppLayout.tsx` — меню и шапка.
- `src/data/mock.ts` — демонстрационные записи.
- `src/data/queries.ts` — выборки для экранов: план недели, отметки, отчёт.
- `src/theme.ts` — тема Material UI: цвета, шрифт, таблицы и кнопки.

Переходы между экранами делает React Router. Поиск, выбранный день календаря, тренировка в посещаемости и фильтры — локальное состояние экрана. Формы сохранения и запросы к API здесь сознательно не делаются.

Оформление собрано на [MUI](https://mui.com/): кнопки, таблицы, поля, чипы. Каркас страницы — обычная вёрстка в `src/index.css`.

## Запуск frontend

Нужны Node.js и npm.

```bash
cd "Лабораторная 1/frontend"
npm install
npm run dev
```

Откройте http://127.0.0.1:5173/

Проверка сборки без запуска сервера:

```bash
npm run build
```
