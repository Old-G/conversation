# 💱 Crypto & Fiat Currency Converter

A **React-based** currency converter that supports both **fiat** and **crypto** exchanges. 🚀  
Built with **React, Zustand, Zod, React Hook Form, TanStack Query**, and **Node.js backend** for real-time exchange rate fetching.

---

## 🎥 Demo  
![Demo GIF](./screenshots/demo.gif)  

---

## 📌 Features  
✅ **Supports Fiat & Crypto conversions**  
✅ **Real-time exchange rates** (via CoinGecko API)  
✅ **Zod-based form validation**  
✅ **State management with Zustand**  
✅ **React Hook Form for smooth form handling**  
✅ **Conversion history storage**  

---

## 🛠️ Tech Stack  
- **Frontend:** React, TypeScript, Zustand, React Hook Form, Tailwind CSS  
- **Backend:** Node.js, Express, Redis caching  
- **API:** CoinGecko  

---

## 🚀 Setup & Run  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo/currency-converter.git
cd currency-converter

### 2️⃣ Install Dependencies
```sh
npm install

### 3️⃣ Start the Backend
```sh
cd backend
npm install
npm run dev

### 4️⃣ Start the Frontend
```sh
cd frontend
npm run dev


# 💱 Crypto & Fiat Currency Converter

A **React-based** currency converter that supports both **fiat** and **crypto** exchanges. 🚀  
Built with **React, Zustand, Zod, React Hook Form, TanStack Query**, and **Node.js backend** for real-time exchange rate fetching.

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
