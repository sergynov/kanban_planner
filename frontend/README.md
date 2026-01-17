# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Области хранения данных:
- База данный mongoDB

Сущности приложения:
- Пользователи: БД 
- Доски: БД 
- Колонки: БД
- Задачи пользователя: БД

Таблицы БД:
- Пользователи - users: id / login / password / registered_at / role_id 
- Доски - boards: id / title / user_id / created_at
- Колонки - columns: id / title / order / created_at
- Задачи - tasks: id / title / description / order / status / created_at


 Страницы:
 - Login 
 - Register
 - Main Page 
 - My Boards (все доски пользоватея)
 - One board page (column, tasks)
 - About page

Схема для Redux store (на клиенте):
- User: Хранит данные текущего пользователя (id, login) и состояние авторизации (isAuth).
- Board: Хранит список досок пользователя, активную доску, связанные с ней колонки и задачи, а также состояние загрузки и ошибок.
- Tasks: Хранит все задачи пользователя (используется как клиентский кэш)
- Search: Хранит строку поиска для фильтрации данных.

Состояние страниц:
- Страница авторизации — использует user
- Страница досок — использует board.list
- Страница одной доски — использует board.board, board.columns, tasks.all
- Страница профиля — использует user

Deployment
Для deploy использовались:
- Backend: Сервер timewebcloud, Node.js, для запуска pm2
- Frontend: Сервер timewebcloud, веб-сервер Ngnix, сборка React+Vite
