# 💰 Wallet Transaction System

A full-stack wallet management system where:

- Admin users can credit or debit client wallets.
- Clients can create orders that deduct from their wallet.
- The system calls an external fulfillment API after order creation.
- All transactions are recorded in a ledger.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose

---

## 🚀 Features

### 👨‍💼 Admin
- Credit wallet
- Debit wallet
- Automatic ledger entry creation

### 👤 Client
- View wallet balance
- Create order (atomic wallet deduction)
- View order details
- Fulfillment API integration

### 🧾 System Guarantees
- No negative wallet balance
- Atomic wallet deduction using MongoDB `$inc`
- Ledger tracking for all transactions
- Secure environment variable configuration

---

## 📁 Project Structure

```
walletsystem/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── wallet-frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd walletsystem
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env` File

Create a file named `.env` inside the `backend/` folder.

Copy from `.env.example`:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wallet_system
```

Replace:
- `<username>`
- `<password>`

With your MongoDB Atlas credentials.

---

## 3️⃣ Start Backend

```bash
node server.js
```

You should see:

```
MongoDB Connected
Server running on port 5000
```

---

## 4️⃣ Frontend Setup

Open a new terminal:

```bash
cd wallet-frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 API Endpoints

### Admin – Credit Wallet

```
POST /admin/wallet/credit
```

**Body:**
```json
{
  "client_id": "client123",
  "amount": 1000
}
```

---

### Admin – Debit Wallet

```
POST /admin/wallet/debit
```

---

### Client – Create Order

```
POST /orders
```

**Headers:**
```
client-id: client123
```

**Body:**
```json
{
  "amount": 200
}
```

---

### Get Order Details

```
GET /orders/:order_id
```

---

### Get Wallet Balance

```
GET /wallet/balance
```

---

## 🔐 Environment Variables

| Variable   | Description                         |
|------------|-------------------------------------|
| PORT       | Backend server port                 |
| MONGO_URI  | MongoDB Atlas connection string     |

> ⚠️ `.env` is not committed to GitHub for security reasons.

---

## 🛡 Security Considerations

- Credentials stored in environment variables
- `.env` ignored via `.gitignore`
- MongoDB Atlas authentication required
- Atomic wallet updates prevent race conditions
- No hardcoded secrets in source code

---

## 🧠 Design Decisions

- Used atomic MongoDB updates instead of full transactions for simplicity.
- Ledger entries ensure traceability of financial operations.
- Clean MVC backend structure.
- Separate frontend and backend for separation of concerns.

---

## 🏁 Future Improvements

- JWT authentication
- Role-based access control
- Input validation middleware
- Rate limiting
- Idempotency keys for order creation
- Deployment configuration

---

## 📌 Assumptions

- Admin and Client are identified via `client_id`
- MongoDB Atlas is used for database hosting
- Fulfillment API is mocked using JSONPlaceholder

---

## 📄 License

This project was developed for assessment purposes.
