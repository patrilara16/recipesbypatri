# Recipes by Patri 🍳

A web application to search, explore and save your favourite recipes. Built as the final project for the web development course.

**Live demo:** https://patrilara16.github.io/recipesbypatri/

## Features

- **Home:** browse all recipes or search by name, with a "Load more" button and a counter of how many recipes are shown.
- **Recipe detail:** photo, ingredients, step-by-step instructions and a link to a video tutorial.
- **Favorites:** save recipes with the heart button and access them in your personal recipe book. They are stored in the browser (`localStorage`), so they persist after reloading the page.
- Loading spinner, friendly error messages with a "Try again" button, and empty states.
- Responsive design for mobile, tablet and desktop.

## Tech stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev/) + [Vite](https://vite.dev/) | UI components and build tool |
| [React Router](https://reactrouter.com/) | Navigation between the three screens |
| [Bootstrap](https://getbootstrap.com/) + [React-Bootstrap](https://react-bootstrap.netlify.app/) | Layout, responsive grid and components |
| [React Icons](https://react-icons.github.io/react-icons/) | Icons (Phosphor set) |
| [gh-pages](https://www.npmjs.com/package/gh-pages) | Deployment to GitHub Pages |
| [TheMealDB API](https://www.themealdb.com/api.php) | Recipe data (REST API, JSON) |

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) (LTS version) and npm
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/patrilara16/recipesbypatri.git
   ```

2. Go into the project folder:

   ```bash
   cd recipesbypatri
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the address shown in the terminal in your browser. Because of the GitHub Pages configuration, it is usually:

   ```
   http://localhost:5173/recipesbypatri/
   ```

### Other commands

| Command | What it does |
|---|---|
| `npm run build` | Creates the production build in the `dist` folder |
| `npm run preview` | Serves the production build locally |
| `npm run deploy` | Builds the app and publishes it to GitHub Pages |

## Project structure

```
src/
├── components/   NavBar, RecipeCard (jsx and css)
├── hooks/        useFavorites (favourites stored in localStorage)
├── pages/        Home, RecipeDetail, Favorites
├── utils/        formatInfo (joins category and area)
├── App.jsx       Routes
└── main.jsx      Entry point (HashRouter)
```

## API

Data comes from [TheMealDB](https://www.themealdb.com/api.php) using the free test key. Endpoints used:

- `search.php?s=` – search recipes by name
- `search.php?f=` – list recipes by first letter
- `lookup.php?i=` – get the full details of a recipe by id

## Deployment

The app is deployed on GitHub Pages with `npm run deploy`. It uses `HashRouter` and `base: '/recipesbypatri/'` in `vite.config.js` so that routes work on GitHub Pages.

## Author

Patricia Lara