# Trip Me Up ✈️

**Trip Me Up** is a vacation planning system designed to facilitate group decision-making when organizing trips. The system enables users to propose and vote on vacation details, ensuring that the final plan satisfies the majority's preferences.

## 🚀 Live Demo
For an easier way to connect, you can click the deployed link:
👉 [https://trip-me-up-client-cr26.onrender.com](https://trip-me-up-client.onrender.com/)

---

## 🛠️ Assignment Updates (HW #3)

This version of the project focuses on **Advanced React Hooks** and Global State Management using **Redux Toolkit**.

### 🎣 1. Custom Hooks
I created reusable hooks to encapsulate logic and manage side effects efficiently.

* **`useLocalStorage(key, initialValue)`**
    * **Functionality:** Syncs state automatically with the browser's Local Storage.
    * **Usage:**
        1.  **Dark Mode:** Persists the user's theme preference (Light/Dark) in `UserMenu`.
        2.  **Login:** Implements "Remember Me" functionality to save the last username in `LoginForm`.

* **`useApi(url)`**
    * **Functionality:** Manages API fetching states (`data`, `loading`, `error`) generically.
    * **Usage:**
        1.  **User Menu:** Fetches a "Random Fact of the Day" when the menu opens.
        2.  **Footer:** Checks and displays "System Status" using a mock API call.

### 🟣 2. Redux Toolkit (Global State)
I replaced the previous Context API implementation with **Redux Toolkit** for better performance and scalability.

* **Store Configuration:** Configured in `store.js` combining multiple slices.
* **Slices:**
    * **`userSlice`:** Manages authentication state (`isLoggedIn`, `userData`). Handles Login and Logout actions.
    * **`favoritesSlice`:** Manages the list of favorite trips.
        * *Actions:* `addFavorite`, `removeFavorite`, `clearFavorites`.
* **UI Integration:**
    * Used `useSelector` to access global state (e.g., displaying favorite count in the Header, checking Dark Mode).
    * Used `useDispatch` to trigger actions (e.g., adding a trip to favorites, clearing the list, logging out).

### 🎨 3. UI/UX Enhancements
* **Dark Mode:** Full support for Dark Mode across the application (Cards, Menu, History, Maps), persisted via custom hook.
* **Favorites Management:** Users can now add trips to a favorites list and clear them via the User Menu.

---

## 📦 Project Components

### 1. Home / Content Page
The main landing page of the application that introduces the platform.
* **Files:** `src/pages/homepage.jsx`, `src/comp/Home.jsx`.
* **Details:** Uses `useState` to manage the background image carousel.

### 2. Form Page (Login/Register)
A dedicated page for user authentication.
* **Files:** `src/pages/login.jsx`, `src/comp/LoginForm.jsx`.
* **Details:** Connected to **Redux** to update the global user state upon successful login. Uses `useLocalStorage` to remember the username.

### 3. Trip History & Favorites
Displays a list of past trips and allowed interactions.
* **Files:** `src/pages/history.jsx`, `src/comp/TripCard.jsx`.
* **Details:** Fetches data from the backend and allows users to "Like" trips, which updates the **Redux Store**. Fully styled for Dark Mode.

### 4. User Menu (Sidebar)
A slide-out menu for navigation and settings.
* **Details:** Contains the **Dark Mode Toggle**, **Clear Favorites** button, and displays a random fact fetched via `useApi`.

---

## ⚠️ Important Note Regarding API Functionality
The Chat API is powered by **OpenAI** and is **fully functional**. However, please **use it sparingly** as each request incurs a real monetary cost. Excessive usage may lead to budget depletion.

---

## 💻 How to Run
To run the program locally:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the project:**
    ```bash
    npm run dev
    ```

### Tech Stack
* React 18
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Material UI (MUI)
* Vite