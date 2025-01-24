import Chat from './pages/chat.jsx'
import RouteView from './pages/routeview.jsx'
import RouteViewPoc from './pages/routeview_poc.jsx'
import Login from './pages/login.jsx'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './comp/ProtectedRoute.jsx'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/routeview" element={<RouteView/> } />
          <Route
            path="/routeview_poc/:routeId"
            element={
              <ProtectedRoute>
                <RouteViewPoc />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
