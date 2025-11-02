# 🌈 MoodBoard Lite  
> A simple and elegant **MERN stack mood tracker** that lets users record their daily emotions, notes, and colors — one mood per day.  

---

## 📖 Table of Contents
1. [About the Project](#-about-the-project)  
2. [Features](#-features)  
3. [Tech Stack](#-tech-stack)  
4. [Folder Structure](#-folder-structure)  
5. [Setup Instructions](#-setup-instructions)  
6. [Environment Variables](#-environment-variables)  
7. [Usage Guide](#-usage-guide)  
8. [Screenshots (Optional)](#-screenshots-optional)  
9. [Future Improvements](#-future-improvements)  
10. [Author](#-author)

---

## 💡 About the Project
**MoodBoard Lite** is a lightweight web application built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to **sign up, log in, and record their daily moods** with emojis, notes, and color themes.  
Each user can enter only **one mood per day**, helping them reflect on emotional trends over time.  

This project is ideal as a **mini full-stack demo** showing user authentication, CRUD operations, and responsive UI — perfect for internship submissions or portfolio display.

---

## ✨ Features

| Category | Description |
|-----------|-------------|
| 👤 **Authentication** | JWT-based Signup & Login system |
| 📝 **Daily Mood Entry** | One mood entry per day (emoji + note + color + optional image/GIF) |
| 📅 **Past Mood Log** | Displays previous moods in descending date order |
| 💾 **MongoDB Storage** | Each user’s data stored securely in Atlas |
| 🎨 **UI/UX** | Clean gradient theme, responsive card layout |
| 🚀 **Full-Stack Demo** | Ready deployment structure (client + server) |
| 🧠 **Validation** | Prevents duplicate entries for the same day |
| 🔒 **Protected Routes** | Backend routes protected using JWT middleware |

---

## 🧰 Tech Stack

**Frontend:** React JS, HTML5, CSS3  
**Backend:** Node JS, Express JS  
**Database:** MongoDB Atlas  
**Auth:** JSON Web Token (JWT)  
**Styling:** Inline + CSS (custom)  

---

## 📁 Folder Structure
```
moodboard-lite/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   └── MoodBoard.js
│   │   ├── api.js
│   │   └── index.css
│   └── package.json
│
├── server/                # Node + Express backend
│   ├── models/
│   │   ├── User.js
│   │   └── Mood.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── mood.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env               # (local only)
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🧩 1. Clone the repository
```bash
git clone https://github.com/vikas4618/moodboard-lite.git
cd moodboard-lite
```

### 🧩 2. Install dependencies
#### Server
```bash
cd server
npm install
```

#### Client
```bash
cd ../client
npm install
```

### 🧩 3. Create `.env` file in `/server`
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
JWT_SECRET=secret123
PORT=5000
```

> ⚠️ Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

## ▶️ Run the App

### Start backend:
```bash
cd server
npm start
```

### Start frontend (in another terminal):
```bash
cd client
npm start
```

Then visit 👉 `http://localhost:3000`

---

## 🔐 Environment Variables

| Variable | Description |
|-----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `PORT` | Backend server port (default 5000) |

---

## 🧭 Usage Guide

1. **Sign Up** with name, email, and password  
2. **Login** — receives JWT token stored in localStorage  
3. **Enter Mood**: emoji, note, color, image (optional)  
4. **Dashboard**: shows *Today’s mood* and *Past moods*  
5. If you already entered today’s mood → “Already Entered 🔒” appears  
6. Next day → new mood can be entered automatically  

---


## 🚀 Future Improvements
- 📊 Weekly and monthly emotion charts  
- ☁️ Deploy to Render / Vercel (client + server)  
- 💬 Add image preview for GIFs  
- 🌗 Dark mode toggle  
- 📱 Responsive mobile layout enhancements  
- 🧘 Daily reminders via email or notification  

---

## 👨‍💻 Author

**Vikas H J**  
📧 hjvikas5@gmail.com  
🔗 [GitHub: vikas4618](https://github.com/vikas4618)  

> *“A lightweight yet meaningful full-stack project built with passion and purpose.”*
