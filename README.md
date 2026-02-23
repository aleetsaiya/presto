# Presto — A Lightweight Presentation Platform

A web-based presentation app that allows users to create, edit, and preview slideshow decks with rich content including text, images, videos, and syntax-highlighted code blocks.

## Features

- **Authentication** — Register, login, and logout with session management
- **Presentation Dashboard** — Create, view, and manage presentations in a card-based layout
- **Slide Editor** — Add, delete, and navigate between slides with keyboard support
- **Rich Slide Content** — Add text, images, YouTube videos, and syntax-highlighted code blocks (C, Python, JavaScript)
- **Drag & Drop** — Reposition and resize elements directly on the slide canvas
- **Theme & Background** — Customise slide backgrounds with solid colours, gradients, or images
- **Slide Transitions** — Animated transitions between slides
- **Slide Rearranging** — Drag-and-drop slide reordering
- **Preview Mode** — Full-screen presentation preview in a new tab
- **Revision History** — Restore presentations to previous states

## Tech Stack

- React
- TypeScript
- Material UI
- Vite
- Axios
- React Router
- React Toastify
- Vitest

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)

### Backend

The frontend relies on a REST API backend (Express.js + JWT auth) for authentication and data persistence. Start the backend first:

```bash
cd backend
npm install
npm start
```

The backend runs on `http://localhost:5005` by default. API docs are available at `http://localhost:5005` via Swagger UI.

To reset the database:

```bash
npm run reset
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Testing

```bash
cd frontend
npm run test
```

### Linting

```bash
cd frontend
npm run lint
```
