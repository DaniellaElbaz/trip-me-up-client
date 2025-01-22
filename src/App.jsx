import Chat from './pages/chat.jsx'
import Chatbox from './comp/chatbox.jsx'
import RouteView from './pages/routeview.jsx'
import RouteViewPoc from './pages/routeview_poc.jsx'
import UserMenu from './comp/UserMenu.jsx';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <UserMenu />
      <main>
        <Routes>
          <Route path="/" element={<Chatbox />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/routeview_poc" element={<RouteViewPoc />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;