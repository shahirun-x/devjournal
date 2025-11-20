# DevJournal - Full Stack Blog Platform

DevJournal is a modern, full-stack blogging application built to demonstrate the power of combining a high-performance Python backend with a reactive JavaScript frontend. It features secure authentication, real-time database interactions, and a clean, responsive UI.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## Tech Stack

### Backend (The Engine)
* **Framework:** [FastAPI](https://fastapi.tiangolo.com/) - High-performance web framework for building APIs with Python.
* **Database:** [SQLModel](https://sqlmodel.tiangolo.com/) (SQLite) - Modern ORM for interacting with SQL databases using Python objects.
* **Authentication:** JWT (JSON Web Tokens) with OAuth2 flows.
* **Security:** Argon2 for industry-standard password hashing.

### Frontend (The Interface)
* **Framework:** [React 19](https://react.dev/) (via Vite) - The library for web and native user interfaces.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
* **HTTP Client:** Axios - For handling API requests.
* **Routing:** React Router DOM - For client-side navigation.

---

##  Features

* ** User Authentication:** Secure Sign-up and Login system using JWTs.
* ** Create & Publish:** Users can write and publish articles instantly.
* ** Dynamic Feed:** Real-time fetching of blog posts from the database.
* ** Protected Routes:** Frontend redirects unauthorized users; Backend validates tokens on protected endpoints.
* ** Responsive UI:** Clean, card-based layout built with Tailwind CSS.

---

##  Installation & Setup Guide

Follow these steps to run the project locally.

### Prerequisites
* **Python 3.10+**
* **Node.js 18+**

### 1. Backend Setup
The backend runs on port `8000`.


# Navigate to the backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload

The API will be available at http://localhost:8000. The Interactive Docs (Swagger UI) will be at http://localhost:8000/docs.

2. Frontend Setup
The frontend runs on port 5173.

# Open a new terminal and navigate to the frontend folder
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
The application will be available at http://localhost:5173.

 API Documentation
This project includes automatic interactive API documentation. Once the backend is running, visit:

http://localhost:8000/docs

Available Endpoints:

POST /auth/signup - Register a new user.

POST /auth/login - Authenticate and receive a JWT access token.

GET /auth/me - Get current user profile (Protected).

GET /posts/ - Retrieve all blog posts.

POST /posts/ - Create a new blog post (Protected).

Project Structure


devjournal/
├── backend/
│   ├── main.py          # App entry point & CORS config
│   ├── models.py        # Database schemas (User, Post)
│   ├── database.py      # SQLModel engine & session logic
│   ├── routers/         # API route handlers (auth, posts)
│   └── database.db      # SQLite database file (auto-generated)
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI parts (PostCard.jsx)
    │   ├── pages/       # Full screens (Home, Login, CreatePost)
    │   ├── services/    # API configuration (Axios interceptors)
    │   └── App.jsx      # Main Router logic
    └── tailwind.config.js

Contributing
Fork the repository.

Create a new branch (git checkout -b feature/amazing-feature).

Commit your changes (git commit -m 'Add some amazing feature').

Push to the branch (git push origin feature/amazing-feature).

Open a Pull Request.
