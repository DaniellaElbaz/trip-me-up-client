# Trip Me Up 🌍✈️

**Trip Me Up** is a vacation planning system designed to facilitate group decision-making when organizing trips. The system enables users to propose and vote on vacation details, ensuring that the final plan satisfies the majority's preferences.

## 🚀 Live Demo
For an easier way to connect, you can click the deployed link:
👉 [https://trip-me-up-client.onrender.com/](https://trip-me-up-client.onrender.com/)

---

## 🛠️ Assignment Updates (HW #2)

This version of the project has been upgraded with **React Router** for navigation and **React Context** for global state management.

### 🧭 1. Routing (React Router)
The application uses `react-router-dom` to manage navigation between pages without refreshing.
**Defined Routes:**
* `/` - **Home Page**: The main landing page.
* `/login` - **Form Page**: Login and Registration (User Authentication).
* `/chat` - **API Page (Chat)**: Interactive AI travel agent (Protected Route - requires login).
* `/history` - **History**: View past trips (Protected Route).
* `/routeview/:routeId` - **Route View**: Dynamic page displaying details of a specific trip.
* `*` - **404**: Handles unknown URLs with a "Page Not Found" message.

### 👤 2. Context (Global State)
I implemented an `AuthContext` to manage the user's authentication state globally.

* **What it stores:** The logged-in `user` object (containing name, id, and email).
* **How it works:**
    * The `AuthProvider` wraps the entire application (`App.js`).
    * It syncs with `sessionStorage` to ensure the user stays logged in even after a page refresh.
    * **Usage in Components:**
        1.  **UserMenu:** Consumes the context to display the user's name in the side menu.
        2.  **Chatbox:** Consumes the context to retrieve the `userId` for sending messages.

---

## 📦 Project Components

### 1. Home / Content Page
The main landing page of the application that introduces the platform.
* **Files:** `src/pages/homepage.jsx`, `src/comp/Home.jsx`.
* **Details:** Uses `useState` to manage the background image carousel and `useEffect` for preloading images.

### 2. Form Page (Login/Register)
A dedicated page for user authentication.
* **Files:** `src/pages/login.jsx`, `src/comp/LoginForm.jsx`, `src/comp/FlipCardRegister.jsx`.
* **Details:** Implements a controlled form structure. Handles submission via `fetch` to the backend server.

### 3. API Page (Chat)
This page implements the API requirement using a WebSocket connection.
* **Files:** `src/pages/chat.jsx`, `src/comp/chatbox.jsx`.
* **Details:** Uses `useWebSocket` for real-time communication. Messages are rendered dynamically.

---

## ⚠️ Important Note Regarding API Functionality
The Chat API is powered by **OpenAI**. Due to API fee limitations, I requested and received permission from Yuval to save costs. Consequently, the chat page may not perform as expected right now (or might reach quota limits), and attempting to perform actions in the chat may lead to errors if the quota is exceeded.

---

## 💻 How to Run
To run the program locally:

1.  **Install dependencies:**
    ```bash
    npm install
    # OR
    bun install
    ```

2.  **Start the project:**
    ```bash
    npm run dev
    # OR
    bun dev
    ```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
