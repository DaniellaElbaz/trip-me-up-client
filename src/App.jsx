import Chat from './pages/chat.jsx'
import RouteView from './pages/routeview.jsx'
import RouteViewPoc from './pages/routeview_poc.jsx'
import Login from './pages/login.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/routeview" element={<RouteView/> } />
          <Route path="/routeview_poc/:routeId" element={<RouteViewPoc/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
