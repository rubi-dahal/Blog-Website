# Blogging Platform

A full-stack blogging application with a React and Vite frontend and an Express, MongoDB, and Mongoose backend. Users can register, sign in, reset their password, browse blog posts, create posts, edit posts, and delete posts.

## Project Structure

```text
Blogging/
├── Backend/       # Express API and MongoDB models
└── Blog-Website/  # React frontend built with Vite
```

## Requirements

- Node.js 18 or newer
- npm
- A running MongoDB instance or MongoDB Atlas connection

## Setup

### 1. Configure the backend

Create `Backend/.env` with your MongoDB connection string:

```env
CONNECTION_STRING=mongodb://YourString
```

For MongoDB Atlas, replace the value with your Atlas connection string.

Install dependencies and start the API:

```bash
cd Backend
npm install
npm run dev
```

The backend runs at `http://localhost:3000`.

Use `npm start` to run the backend without Nodemon.

### 2. Start the frontend

In a second terminal:

```bash
cd Blog-Website
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Frontend Routes

| Route | Purpose |
| --- | --- |
| `/` | Browse the latest blog posts |
| `/single-page/:id` | View one blog post |
| `/signin` | Sign in |
| `/register` | Create an account |
| `/forgot-password` | Update a forgotten password |
| `/create` | Create a blog post |
| `/edit/:id` | Edit a blog post |

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | API health response |
| `GET` | `/about` | About response |
| `POST` | `/register` | Register a user |
| `POST` | `/login` | Authenticate a user |
| `PUT` | `/update-user` | Update a user's password |
| `POST` | `/postBlog` | Create a blog post |
| `GET` | `/fetch-blogs` | Fetch all blog posts |
| `GET` | `/fetch-blogs/:id` | Fetch one blog post |
| `PUT` | `/edit-blog/:id` | Update a blog post |
| `DELETE` | `/delete-blogs/:id` | Delete a blog post |
| `GET` | `/fetch-users` | Fetch all users |
| `GET` | `/fetch-users/:id` | Fetch one user |

## Available Scripts

### Backend

- `npm run dev` - Start the API with Nodemon
- `npm start` - Start the API with Node.js

### Frontend

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Notes

- Start the backend before using frontend features that load or submit blog data.
- The frontend currently requests the API from `http://localhost:3000`.
- Do not commit `Backend/.env`; it contains environment-specific database credentials.
