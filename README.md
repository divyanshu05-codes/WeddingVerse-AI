# 💍 WeddingVerse AI

### AI-Powered Smart Wedding Planning Platform

**WeddingVerse AI** is a modern full-stack wedding planning platform designed to simplify and organize the entire wedding planning journey. It combines **AI-powered wedding plan generation** with practical tools for managing wedding tasks, guests, schedules, and important planning details — all from one centralized platform.

---

## ✨ Overview

Planning a wedding involves managing hundreds of details — from budgets and schedules to guests, tasks, and events.

**WeddingVerse AI** aims to make this process smarter and easier by allowing users to generate a personalized wedding plan using AI and manage their wedding activities through an intuitive web application.

The platform provides a structured workflow where users can:

* 🤖 Generate personalized wedding plans using AI
* 💒 Create and manage wedding information
* ✅ Manage wedding tasks and planning activities
* 👥 Organize and manage guest information
* 🔐 Securely register and authenticate users
* 📊 Maintain wedding planning data persistently
* ⚡ Access everything through a modern responsive interface

---

## 🚀 Key Features

### 🤖 AI-Powered Wedding Planning

Generate a personalized wedding plan based on the user's requirements and wedding details.

The AI can help structure:

* Wedding activities
* Planning tasks
* Events
* Timelines
* Recommendations
* Important wedding milestones

---

### 🔐 Authentication & Authorization

Secure user authentication system with:

* User registration
* User login
* Secure password handling
* JWT-based authentication
* Protected routes
* Role-based access control
* Authentication middleware

---

### 💒 Wedding Management

Users can manage their wedding information from a centralized dashboard.

Wedding data can include:

* Wedding details
* Dates
* Locations
* Planning information
* AI-generated plans
* Associated tasks and guests

---

### ✅ Task Management

Keep track of important wedding-related activities.

Users can:

* Create tasks
* View tasks
* Update tasks
* Track task status
* Organize wedding activities

---

### 👥 Guest Management

Manage wedding guests efficiently by maintaining guest information and organizing the guest list.

---

### 💾 Persistent Data Storage

Wedding plans and associated information are stored in **MongoDB**, ensuring that generated data remains available even after refreshing or reopening the application.

---

### 🛡️ Backend Architecture

The backend follows a structured architecture separating responsibilities into:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Repositories
   ↓
Models
   ↓
MongoDB
```

This makes the application easier to maintain, debug, test, and scale.

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Axios**

## Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Cookie-based Authentication**
* **REST APIs**

## AI

* **Google Gemini API**
* AI-powered wedding plan generation

## Development Tools

* **Git**
* **GitHub**
* **VS Code**
* **Postman**
* **MongoDB Atlas**

---

# 🏗️ Project Architecture

```text
WeddingVerse AI
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── constants/
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

# 🔄 Application Flow

```text
User
 │
 ▼
React Frontend
 │
 ▼
REST API
 │
 ▼
Express Backend
 │
 ├───────────────┐
 ▼               ▼
MongoDB       AI Service
 │               │
 ▼               ▼
Wedding Data   Gemini API
 │
 ▼
Personalized Wedding Plan
 │
 ▼
React Dashboard
```

---

# ⚙️ Getting Started

Follow the steps below to run WeddingVerse AI locally.

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/WeddingVerse-AI.git
```

```bash
cd WeddingVerse-AI
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

SESSION_SECRET=your_session_secret
```

# ▶️ Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

The backend will start on:

```text
http://localhost:3000
```

---

## Start Frontend

In another terminal:

```bash
cd frontend
npm run dev
```

Vite will provide the local frontend URL, usually:

```text
http://localhost:5173
```

---

# 📡 API Structure

The backend exposes RESTful APIs for different parts of the application.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
```

### Wedding

```text
POST   /api/weddings
GET    /api/weddings
GET    /api/weddings/:id
PUT    /api/weddings/:id
DELETE /api/weddings/:id
```

### Guests

```text
POST   /api/guests
GET    /api/guests
PUT    /api/guests/:id
DELETE /api/guests/:id
```

### Tasks

```text
POST   /api/tasks
GET    /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

> API endpoints may vary based on the current implementation.

---

# 🧠 AI Integration

One of the core features of WeddingVerse AI is its AI-powered wedding planning system.

The application collects relevant wedding information and sends it to the AI service, which generates a structured and personalized wedding plan.

```text
Wedding Requirements
        ↓
Backend AI Service
        ↓
Gemini API
        ↓
AI-Generated Wedding Plan
        ↓
Store in MongoDB
        ↓
Display in Dashboard
```

This approach allows the generated plan to remain available even after the user refreshes the application.

---

# 🔒 Security

WeddingVerse AI implements several security practices, including:

* JWT-based authentication
* Protected API routes
* HTTP-only authentication cookies
* Password validation
* Environment-based secret management
* MongoDB database security
* Role-based authorization
* Centralized error handling

---

# 📈 Future Improvements

WeddingVerse AI is designed to be scalable and can be extended with additional features such as:

* 💰 AI-powered wedding budget management
* 📅 Smart wedding timeline generation
* 📍 Venue discovery and recommendations
* 💌 Digital wedding invitations
* 📱 WhatsApp wedding assistant
* 🔔 Automated reminders and notifications
* 🤵 Vendor management
* 📸 Wedding gallery
* 💳 Payment and booking integration
* 📊 Wedding planning analytics
* 🌐 Deployment with production infrastructure
* 📲 Progressive Web App support

---

# 🎯 Project Goals

The main goals of WeddingVerse AI are to:

1. Simplify the wedding planning process.
2. Reduce the complexity of managing multiple wedding activities.
3. Use AI to provide personalized planning assistance.
4. Centralize wedding information in one platform.
5. Build a scalable production-level full-stack application.

---

# 💡 Why WeddingVerse AI?

Traditional wedding planning often requires multiple tools for:

```text
Planning
   +
Guest Management
   +
Task Management
   +
Scheduling
   +
Budgeting
   +
Recommendations
```

WeddingVerse AI brings these concepts together into a single intelligent platform.

> **Plan smarter. Organize better. Celebrate stress-free. 💍✨**

---

# 👨‍💻 Developer

### Divyanshu Pal

Full-Stack Developer | AI Enthusiast | Software Engineering Student

Interested in building scalable applications using:

**JavaScript • React • Node.js • Express • MongoDB • AI**

---

# 📄 License

This project is developed for educational and portfolio purposes.

---

## 💍 WeddingVerse AI

**An intelligent approach to modern wedding planning.**

> *From “I don't know where to start” to “Everything is planned.”*
