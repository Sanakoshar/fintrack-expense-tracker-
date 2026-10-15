
<div align="center">

---

## Overview

**FinTrack** is a full-stack financial dashboard designed to simplify personal money management. Built on the **MERN (MongoDB, Express, React, Node.js)** architecture, FinTrack features a high-contrast dark FinTech interface, instant dual-stream transaction tracking, dynamic category analytics, and automated budget alarms.

---

## Key Features

### 1. Authentication & Security

- **JWT-Protected Sessions**: Persistent login state with token-based authentication.
- **Bcrypt Encryption**: Zero plain-text storage; passwords hashed with salt rounds.
- **Dedicated User Scopes**: Transactions, charts, and budget goals are strictly isolated per account.

### 2. Visual Analytics & Insights

- **Dual Cash Flow Bar**: Real-time ratio bar comparing income inflow vs expense outflow with percentage breakdown.
- **Category Donut Ring**: Pure CSS conic-gradient donut chart calculating spending proportion across categories (Bills, Food, Shopping, etc.).
- **Net Savings Metric**: Automated calculation of net savings rate (`% saved this month`).

### 3. Frictionless Transaction Feed

- **Segmented Type Switcher**: 1-click `[ Expense ]` / `[ Income ]` mode toggle (no manual minus `-` sign entry required).
- **Quick Preset Chips**: Fast 1-tap entry for common amounts (`+₹100`, `+₹500`, `+₹1,000`, `+₹2,000`, `+₹5,000`).
- **Real-Time History Feed**: Filterable by Month, Category, or Live Search with instant record deletion.

### 4. Smart Budgeting & Reports

- **Dynamic Budget Tracker**: Set monthly budget thresholds per user account.
- **Visual Alert Thresholds**: Status bar changes color and alerts when spending exceeds 80% or breaches 100%.
- **1-Click CSV Export**: Download complete transaction logs as `.csv` spreadsheets.

---

## Tech Stack

| Domain              | Technologies                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **Frontend**  | React.js, Context API, Hooks (`useContext`, `useEffect`, `useState`), Vanilla CSS3 |
| **Backend**   | Node.js, Express.js, RESTful Architecture                                                |
| **Database**  | MongoDB Atlas, Mongoose ODM                                                              |
| **Security**  | JSON Web Tokens (JWT), BcryptJS, Dotenv                                                  |
| **Dev Tools** | Nodemon, Concurrently, Morgan, Git                                                       |

---

## Architecture

Client (React SPA)
├── Context API (GlobalState & AuthContext)
└── Axios (Automatic Bearer Token Interceptor)
│
▼ HTTP / REST (Port 5000)
Backend (Express Server)
├── Auth Middleware (JWT Token Verification)
└── Controllers (CRUD Operations & Password Hashing)
│
▼ Mongoose ODM (SSL Encrypted)
Database (MongoDB Atlas Cluster)
├── users collection
└── transactions collection


---

## 📁 Directory Structure

```text
├── client/                     # React Frontend
│   ├── public/                 # HTML Shell & Assets
│   └── src/
│       ├── components/         # Modular UI Components
│       │   ├── AddTransaction.js     # Quick form with type toggle & chips
│       │   ├── AuthForm.js           # FinTrack Auth card (Login/Register)
│       │   ├── Balance.js            # Dynamic balance indicator
│       │   ├── Budget.js             # Monthly target & alert progress
│       │   ├── CashFlowChart.js      # Income/Expense split ratio & bars
│       │   ├── CategoryChart.js      # Conic donut breakdown chart
│       │   ├── Filters.js            # Month, Category & Search filters
│       │   ├── Header.js             # Sticky top navigation bar
│       │   ├── IncomeExpenses.js     # Cashflow metrics
│       │   ├── Transaction.js        # Individual transaction card
│       │   └── TransactionList.js    # Filtered transaction feed
│       ├── context/            # React Context API State Management
│       ├── App.js              # Full-screen Dashboard orchestrator
│       ├── App.css             # Unified dark SaaS styling
│       └── AuthForm.css        # Auth card styling
│
├── config/                     # Configuration
│   ├── config.env.example      # Environment variables template
│   └── db.js                   # MongoDB connection logic
├── controllers/                # Business logic handlers
├── middleware/                 # JWT Route Protection middleware
├── models/                     # Mongoose Schemas (User & Transaction)
├── routes/                     # API Route Endpoints
├── server.js                   # Backend Server entry point
└── .gitignore                  # Security shield (protects credentials)
```


Getting Started

1. Clone the repository
   bash
   git clone https://github.com/<your-username></your>/fintrack-expense-tracker.git
   cd fintrack-expense-tracker
2. Install Dependencies

Install backend dependencies:

bash
npm install

Install frontend dependencies:

bash
cd client
npm install
cd ..
3. Setup Environment Variables

Create your environment file by copying the template:

bash
cp config/config.env.example config/config.env

Open config/config.env and populate your credentials:

env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

Security Note: config/config.env is excluded by .gitignore to prevent leaking private credentials.

4. Run Development Server

Start both Backend and Frontend concurrently:

bash
npm run dev
Frontend App: http://localhost:3000
Backend API: http://localhost:5000
 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/v1/auth/register	Register new user account	.. No
POST	/api/v1/auth/login	Login user & return JWT token	 ...No
GET	/api/v1/auth/me	Fetch logged-in user profile	 ...Yes
GET	/api/v1/transactions	Fetch all user transactions	 ...Yes
POST	/api/v1/transactions	Create a new transaction	 ...Yes
DELETE	/api/v1/transactions/:id	Remove transaction by ID	..Yes
 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

 License

This project is licensed under the MIT License — feel free to use it for personal or educational projects.

Developed with  by Sana Koshar
