# 💱 Crypto & Fiat Currency Converter

A **React-based** currency converter that supports both **fiat** and **crypto** exchanges. 🚀  
Built with **React, Zustand, Zod, React Hook Form, TanStack Query**, and **Node.js backend** for real-time exchange rate fetching.

---

## 🎥 Demo

![Demo GIF](./screenshots/demo.gif)
![App Screenshot](./frontend/src/assets/app.png)

---

## 📌 Features

✅ **Supports Fiat & Crypto conversions**  
✅ **Real-time exchange rates** (via CoinGecko API)  
✅ **Zod-based form validation**  
✅ **State management with Zustand**  
✅ **React Hook Form for smooth form handling**  
✅ **Conversion history storage**  
✅ **Redis caching for performance optimization**  
✅ **RESTful API with Express.js**  
✅ **Error handling & validation**  
✅ **User-friendly UI with Tailwind CSS**  
✅ **Optimized API requests for reduced latency**

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Zustand, React Hook Form, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Redis caching
- **API:** CoinGecko, ExchangeRate-API

---

## 🚀 Setup & Run

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/currency-converter.git
cd currency-converter
```

### 2️⃣ Install Dependencies (Frontend & Backend)

```sh
npm run install:all
```

### 3️⃣ Start the Application (Runs Both Frontend & Backend)

```sh
npm run dev
```

### 📌 Run Separately If Needed

#### Start Only the Backend

```sh
npm run dev:backend
```

#### Start Only the Frontend

```sh
npm run dev:frontend
```

---

## 🎯 Usage

1️⃣ **Select Fiat or Crypto mode**  
2️⃣ **Enter the amount and choose currencies**  
3️⃣ **Click Convert**  
4️⃣ **View exchange rate & conversion history**

---

## 🖥️ API Endpoints

### ✅ Convert Fiat Currency

```http
POST /api/convert-fiat
```

#### Request Body:

```json
{
	"fromCurrency": "USD",
	"toCurrency": "EUR",
	"amount": 100
}
```

#### Response:

```json
{
	"exchangeRate": 0.96,
	"convertedAmount": "96.0"
}
```

### ✅ Convert Crypto Currency

```http
POST /api/convert-crypto
```

#### Request Body:

```json
{
	"fromCurrency": "BTC",
	"toCurrency": "ETH",
	"amount": 1
}
```

#### Response:

```json
{
	"exchangeRate": 31.97,
	"convertedAmount": "31.97"
}
```

### ✅ Fetch Conversion History

```http
GET /api/conversion-history
```

---

## 📝 Notes

- Exchange rates are fetched from **CoinGecko API** & **ExchangeRate-API**
- **Redis caching** is used for optimized responses
- **Conversion history** stores the last 10 conversions
- **Error handling** ensures API stability
- **Optimized API calls** to reduce rate limits

---

## ✨ Future Improvements

✅ Support **more cryptocurrencies**  
✅ Improve **UI & animations**  
✅ Implement **multi-language support**  
✅ Add **Dark Mode theme**  
✅ Expand **conversion history storage options**

---

## 🤝 Contributing

1️⃣ **Fork** the repo  
2️⃣ **Create a branch** (`git checkout -b feature-name`)  
3️⃣ **Commit changes** (`git commit -m "Added new feature"`)  
4️⃣ **Push to branch** (`git push origin feature-name`)  
5️⃣ **Create a Pull Request**

---

## 📜 License

MIT License © 2025 Gleb Zavalov
