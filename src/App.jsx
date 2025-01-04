import Chat from './pages/chat.jsx'
import Chatbox from './comp/chatbox.jsx'
import RouteView from './pages/routeview.jsx'
import RouteViewPoc from './pages/routeview_poc.jsx'
import UserMenu from './comp/UserMenu.jsx';
import HistoryPage from './pages/history.jsx';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <UserMenu />
      <Routes>
        <Route path="/" element={<Chatbox />} />
        <Route path="/routeview" element={<RouteView />} />
        <Route path="/routeview_poc" element={<RouteViewPoc />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
