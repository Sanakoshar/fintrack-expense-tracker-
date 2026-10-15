# FinTrack — Smart Expense & Personal Finance Tracker (MERN)

A modern, full-stack personal finance application built with the **MERN Stack** (MongoDB, Express, React, Node.js). FinTrack provides real-time income/expense monitoring, intelligent category analytics, visual cash flow split bars, monthly budgeting, and one-click CSV export, all wrapped in a sleek, responsive dark FinTech UI.

---

## ✨ Features

- **🔐 Secure Authentication**: User registration and login with bcrypt password hashing and JWT (JSON Web Tokens).
- **📊 Real-Time Financial Dashboard**:
  - **Dynamic Balance**: Instant net balance calculation with financial status badges.
  - **Cash Flow Overview**: Real-time income (+₹) and expenditure (-₹) stream metrics.
  - **Visual Cash Flow Split Bar**: Dual-color ratio bar displaying income vs expense allocation.
  - **Category Donut Chart**: Dynamic conic-gradient donut chart with center totals and percentage breakdown.
  - **Category Allocation Progress**: Linear progress indicators tracking expenditure by category (Bills, Food, Shopping, etc.).
- **⚡ Intuitive Transaction Management**:
  - Segmented **Expense / Income** mode switcher (automatic mathematical sign handling).
  - Quick **1-tap preset amount chips** (`+₹100`, `+₹500`, `+₹1,000`, `+₹2,000`, `+₹5,000`).
  - Sleek transaction feed with category badges and instant record deletion.
- **🎯 Monthly Budgeting & Alert System**:
  - Custom monthly budget goal setting per user account.
  - Visual budget consumption gauge with warning triggers (80% threshold & budget exceeded alerts).
- **🔍 Filter & Search Engine**:
  - Multi-tier filtering by Month, Category, and Live Text Search.
- **📥 One-Click CSV Export**: Download transaction history as standard spreadsheet `.csv` files.
- **📱 100% Responsive Design**: Fluid adaptation across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** (Functional Components, Hooks, Context API)
- **Vanilla Modern CSS3** (Custom Properties, Flexbox, CSS Grid, Conic Gradients, Keyframe Animations)
- **Axios** (API communication with automatic Bearer token injection)

### Backend:
- **Node.js** & **Express.js** (RESTful API architecture)
- **MongoDB Atlas** (Cloud NoSQL Database)
- **Mongoose ODM** (Data modeling & validation)
- **JSON Web Tokens (JWT)** & **Bcrypt.js** (Authentication & password security)
- **Morgan & Colors** (Development logging & debugging)

---

## 📁 Project Architecture

```text
expense-tracker-mern/
├── client/                     # React Frontend
│   ├── public/                 # Static assets & HTML template
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── AddTransaction.js
│       │   ├── AuthForm.js
│       │   ├── Balance.js
│       │   ├── Budget.js
│       │   ├── CashFlowChart.js
│       │   ├── CategoryChart.js
│       │   ├── Filters.js
│       │   ├── Header.js
│       │   ├── IncomeExpenses.js
│       │   ├── Transaction.js
│       │   └── TransactionList.js
│       ├── context/            # Global State & Auth Context
│       │   ├── AppReducer.js
│       │   ├── AuthContext.js
│       │   └── GlobalState.js
│       ├── utils/              # Formatting & helper functions
│       ├── App.js              # Main application orchestrator
│       ├── App.css             # Unified SaaS Dashboard styling
│       └── AuthForm.css        # FinTech Auth card styling
│
├── config/                     # Backend Configuration
│   ├── config.env.example      # Sample environment variables
│   └── db.js                   # Mongoose database connection
│
├── controllers/                # Business logic
│   ├── auth.js                 # Authentication logic (register, login, getMe)
│   └── transactions.js         # Transaction CRUD logic
│
├── middleware/                 # Middleware
│   └── auth.js                 # JWT verification protect middleware
│
├── models/                     # Mongoose Schemas
│   ├── Transaction.js
│   └── User.js
│
├── routes/                     # Express API routes
│   ├── auth.js
│   └── transactions.js
│
├── .gitignore                  # Security rules (ignores config.env & node_modules)
├── package.json                # Root dependencies & concurrent dev scripts
├── server.js                   # Express server entry point
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance

### 2. Installation

Clone this repository:
```bash
git clone https://github.com/your-username/fintrack-expense-tracker.git
cd fintrack-expense-tracker
```

Install root (backend) dependencies:
```bash
npm install
```

Install client (frontend) dependencies:
```bash
cd client
npm install
cd ..
```

### 3. Environment Variables

Create a `config.env` file inside the `config/` directory by copying `config.env.example`:
```bash
cp config/config.env.example config/config.env
```

Open `config/config.env` and populate your credentials:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

> **Note**: `config/config.env` is automatically ignored by `.gitignore` to protect your sensitive credentials.

### 4. Running the Application

To run both the backend server and React client concurrently:
```bash
npm run dev
```

- **Backend API**: `http://localhost:5000`
- **React Frontend**: `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication:
- `POST /api/v1/auth/register` — Register a new account
- `POST /api/v1/auth/login` — Authenticate and receive JWT token
- `GET /api/v1/auth/me` — Retrieve logged-in user profile (Protected)

### Transactions:
- `GET /api/v1/transactions` — Get all user transactions (Protected)
- `POST /api/v1/transactions` — Create a new transaction (Protected)
- `DELETE /api/v1/transactions/:id` — Delete a transaction by ID (Protected)

---

## 📄 License
This project is licensed under the MIT License.
