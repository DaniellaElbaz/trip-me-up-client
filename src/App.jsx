import Chat from './pages/chat.jsx'
import Chatbox from './comp/chatbox.jsx'
import RouteView from './pages/routeview.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Chatbox />} />
          <Route path="/routeview" element={<RouteView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
