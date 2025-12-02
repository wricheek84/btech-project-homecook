# 🍳 HomeCook - AI-Powered Food Delivery Platform

HomeCook is a full-stack, hyper-local food delivery marketplace designed to bridge the gap between passionate home cooks and food lovers. It leverages modern web technologies and practical AI integration to offer a personalized, intelligent, and real-time user experience.

## 🚀 Features

### 🤖 Intelligent AI Integration
* **Generative AI Content Assistant:** Empowers home cooks with an AI writing assistant (powered by OpenRouter/Mistral) that auto-generates professional, SEO-friendly dish descriptions from basic inputs.
* **Content-Based Recommendation Engine:** Solves the "cold start" problem using NLP (Natural Language Processing). The system analyzes dish metadata to suggest "Similar Dishes" to customers instantly, without needing prior order history.
* **Hyper-Local Trend Analyzer:** A custom Business Intelligence module that uses Spatio-Temporal Analysis (SQL time-series aggregation) to show home cooks exactly which dishes are trending in their specific locality over the last 30 days.

### ⚡ Core Functionality
* **Role-Based Access Control (RBAC):** Distinct, secure dashboards for Customers (Discovery & Ordering) and Homecooks (Menu & Business Management).
* **Real-Time Communication:** Bi-directional, zero-latency chat system built on WebSockets (Socket.io) for seamless coordination between buyers and sellers.
* **Live Order Tracking:** Real-time status updates (Pending → Accepted → Preparing → Delivered) pushed instantly to the user interface.
* **Secure Payments:** Fully integrated Stripe Payment Gateway with webhook listeners for secure, automated transaction processing and receipt generation.
* **Advanced Discovery:** Dynamic filtering by location, price, and cuisine with instant client-side sorting.

## 🛠️ Tech Stack

### Frontend
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (Glassmorphism UI design)
* **State Management:** React Hooks (useState, useEffect, useReducer)
* **Real-Time:** Socket.io-client
* **HTTP Client:** Axios

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL (Relational Data Modeling)
* **ORM/Querying:** mysql2 with raw SQL optimizations for complex aggregations.
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **AI/NLP:** openai (configured for OpenRouter), string-similarity, moment.js

### Third-Party Services
* **AI Inference:** OpenRouter (Mistral 7B)
* **Payments:** Stripe API
* **Media Storage:** Cloudinary

## 📂 Project Structure

```bash
HOMECOOK-PLATFORM/
├── backend/
│   ├── config/         # DB, Cloudinary, & API configurations
│   ├── controllers/    # Core business logic (AI, Orders, Dishes)
│   ├── routes/         # API endpoints
│   ├── services/       # AI & Helper services (Recommendation Engine)
│   └── index.js        # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Customer & Homecook views
│   │   ├── services/   # Axios API wrappers
│   │   └── App.jsx     # Main routing logic
│   └── public/
└── README.md