# Elbrus Note - Next.js Client

Это Next.js версия клиентской части приложения для заметок (клон Evernote) с сохранением Redux для управления состоянием.

## Особенности

- **Next.js 15** с App Router
- **Redux Toolkit** для управления состоянием
- **Tailwind CSS** для стилизации
- **TypeScript** для типизации
- **React Hook Form** с Zod валидацией
- **shadcn/ui** компоненты

## Структура проекта

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Группа маршрутов для аутентификации
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Защищенные маршруты
│   │   └── account/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                      # Базовые UI компоненты
│   ├── forms/                   # Формы
│   ├── layout/                  # Layout компоненты
│   └── features/                # Feature компоненты
├── entities/                    # Бизнес-логика (Redux)
│   └── user/
│       ├── model/
│       │   ├── slice.ts
│       │   ├── thunks.ts
│       │   ├── types.ts
│       │   └── schemas.ts
│       └── api/
│           └── UserService.ts
├── store/                       # Redux store
│   ├── store.ts
│   └── hooks.ts
├── shared/                      # Общие утилиты
│   └── api/
│       └── axiosInstance.ts
└── lib/                         # Утилиты
    └── utils.ts
```

## Установка и запуск

1. Установите зависимости:

```bash
npm install
```

2. Запустите сервер разработки:

```bash
npm run dev
```

3. Откройте [http://localhost:3001](http://localhost:3001) в браузере.

## Сборка для продакшена

```bash
npm run build
npm start
```

## Основные изменения при миграции

### Сохранено:

- **Redux Toolkit** - полная структура store, slice, thunks
- **API логика** - UserService и axiosInstance
- **Типы и схемы** - Zod валидация
- **Бизнес-логика** - аутентификация, профиль

### Изменено:

- **Роутинг**: `react-router-dom` → Next.js App Router
- **Стилизация**: Material-UI → Tailwind CSS + shadcn/ui
- **Формы**: Обычные формы → React Hook Form
- **Структура**: Feature-Sliced Design → Next.js структура

## API интеграция

Клиент настроен для работы с существующим Express.js сервером:

- API запросы проксируются на `http://localhost:3000`
- Используется JWT аутентификация через cookies
- Поддерживаются все существующие endpoints

## Доступные страницы

- `/` - перенаправление на `/account`
- `/login` - страница входа
- `/register` - страница регистрации
- `/account` - страница профиля (защищена)

## Технологии

- Next.js 15
- React 18
- Redux Toolkit
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Axios
