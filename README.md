Trip Me Up
     Trip Me Up is a vacation planning system designed to facilitate group decision-making when organizing trips. The system enables users to propose and vote on vacation details, ensuring that the final plan satisfies the majority's preferences.

How to Run To run the program, use the following command: bun dev

For an easier way to connect, you can click the deployed link: https://trip-me-up-client.onrender.com/

📦 Components for the 3 Required Pages
    1. Home / Content Page
        The main landing page of the application that introduces the platform.
        Files:
            src/pages/homepage.jsx
            src/comp/Home.jsx
            src/comp/ProtectedRoute.jsx (Used to protect access to the chat, requiring registration first).

        Implementation Details:
            State: The Home.jsx component uses useState to manage the background image carousel (currentImageIndex) and image preloading.
            Rendering: It utilizes .map() logic within useEffect to handle the preloading of image resources.

    2. Form Page
        A dedicated page for user authentication, allowing users to log in or register a new account.

        Files:
            src/pages/login.jsx
            src/comp/LoginForm.jsx
            src/comp/FlipCardRegister.jsx

        Implementation Details:
            Inputs: The FlipCardRegister.jsx component implements the required form structure with multiple inputs (Name, Username, Password, Email).
            Controlled Components: All inputs are controlled via useState and update on change.
            Submit: The form handles submission via fetch to the backend.

    3. API Page (Chat)
        This page implements the API requirement using a WebSocket connection for a chat interface.

        Files:
            src/pages/chat.jsx
            src/comp/chatbox.jsx
            src/comp/MessageInput.jsx
            src/comp/MessageList.jsx

        Implementation Details:
        API Call: The chatbox.jsx component uses useWebSocket to establish a real-time connection with the server.
        Data Display: Messages are stored in a state array and rendered using .map() inside MessageList.jsx.
        ⚠️ Important Note Regarding API Functionality: The Chat API is currently powered by OpenAI. Due to API fee limitations, I requested and received permission from Yuval to save costs. Consequently, the page may not perform as expected right now, and attempting to perform actions in the chat may lead to a page crash or errors.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
