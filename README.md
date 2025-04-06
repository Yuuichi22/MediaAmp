# 🎮 RAWG - Game Explorer

RAWG is a modern and responsive web application built using React + Vite that allows users to explore video game data like ratings, descriptions, screenshots, and more — powered by the [RAWG Video Games Database API](https://rawg.io/apidocs).

Live Demo: [https://media-amp.vercel.app/](https://media-amp.vercel.app/)

---

## 🚀 Features

- 🔍 Search and explore games by ID
- 📊 View detailed game info: name, rating, release date
- 🖼 High-quality game screenshots and backgrounds
- 🎨 Clean and responsive UI using React-Bootstrap
- 🔁 Redux integration for state management
- 💾 Persisted state using redux-persist
- 🌐 Deployed with Vercel

---

## 🛠 Tech Stack

- ⚛️ React
- ⚡ Vite
- 🧩 Redux Toolkit
- 🧠 Redux-Persist
- 💅 React-Bootstrap
- 🔗 RAWG Video Game API
- 🌍 Vercel (deployment)

---

📸 Screenshots
🔍 Game Search Page
![image](https://github.com/user-attachments/assets/56210187-082a-4878-ad7b-97e4dc43c613)

🕹️ Game Details Page
![image](https://github.com/user-attachments/assets/880ee3d8-eb00-4a8b-8777-72dc2f6c62c1)

📚 User Library Page
![image](https://github.com/user-attachments/assets/717b455e-6ded-4055-8ac8-53c449004a92)


---

## 📁 Folder Structure
![image](https://github.com/user-attachments/assets/efa66e90-4188-47a4-b9ee-8306ebe82e6b)

---

## 🧪 Getting Started Locally

1. **Clone the repository:**

```bash
git clone https://github.com/Yuuichi22/MediaAmp.git
cd MediaAmp
```

Install dependencies:

```bash
npm install
```
Set up environment variables:

Create a .env file in the root directory:

```env
VITE_RAWG_API_KEY=your_rawg_api_key_here
VITE_RAWG_BASE_URI =  https://api.rawg.io/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
You can obtain a free API key from https://rawg.io/apidocs.

Start the development server:

```bash
npm run dev
```
Visit http://localhost:5173 to see the app running.
