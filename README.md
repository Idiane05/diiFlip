# DiiFlip – Currency Converter
---

## Project Overview
**DiiFlip** is a simple, modern, and user-friendly currency converter that allows users to convert between **Rwandan Francs (RWF)** 
and major currencies like **US Dollars (USD), Euros (EUR), and Russian Rubles (RUB)**. Users can also convert back to RWF, view 
**real-time exchange rates**, and switch between **light and dark modes**.

---

## Features

### Core Features
- Convert **RWF → USD, EUR, RUB** and vice versa  
- Display **real-time exchange rates**  
- Modern, **responsive UI**  
- **Dark mode toggle**  
- Input validation to prevent incorrect entries  

###  Future Features
- Save **favorite conversions**  
- **Multi-language support**  
- **Historical exchange rate graph**  

---

## Tech Stack
- **Frontend**: React + TypeScript  
- **Styling**: Tailwind CSS or standard CSS  
- **State Management**: React state / Context API  
- **API**: [Exchange Rates API](https://exchangerate.host/) for live currency rates  
- **Package Manager**: npm / Node.js  

---

## Project Structure

src/
├─ components/
│ ├─ CurrencyConverter.tsx
│ ├─ CurrencySelector.tsx
│ ├─ DarkModeToggle.tsx
│ └─ ResultDisplay.tsx
├─ App.tsx
├─ index.tsx
└─ index.css

yaml
Copy code


---

## Installation

1. Clone the repository:  
```bash
git clone <repository-url>
cd diiflip
Install dependencies:

bash
Copy code
npm install
Start development server:

bash
Copy code
npm start
Open in browser: http://localhost:3000

API Usage
Fetches live currency rates via Exchange Rates API:

sql
Copy code
https://api.exchangerate.host/convert?from=RWF&to=USD
