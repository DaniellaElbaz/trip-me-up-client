import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './comp/ProtectedRoute.jsx';
import UserMenu from './comp/UserMenu.jsx';
import Login from './pages/login.jsx';
import RouteView from './pages/routeview.jsx';
import History from './pages/history.jsx';
import Chat from './pages/chat.jsx';
import HomePage from './pages/homepage.jsx';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';

function AppContent() {
  const [lastVisit, setLastVisit] = useLocalStorage("lastVisitTimestamp", new Date().toISOString());
  useEffect(() => {
    document.title = 'Trip me up!';
  }, []);

  const location = useLocation();
  const excludeHeaderPaths = ['/login']; // pages that will exclude the header

  return (
    <div>
      {!excludeHeaderPaths.includes(location.pathname) && <UserMenu />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="/routeview/:routeId" element={<RouteView />} />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
            }
          />
          <Route path="*" element={<div style={{textAlign: 'center', marginTop: '50px'}}><h1>404 - Page Not Found</h1><p>Oops! This page does not exist.</p></div>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
      <Router>
        <AppContent />
      </Router>
  );
}

export default App;