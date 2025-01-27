import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './comp/ProtectedRoute.jsx';
import UserMenu from './comp/UserMenu.jsx';
import Login from './pages/login.jsx';
import RouteViewPoc from './pages/routeview_poc.jsx';
import History from './pages/history.jsx';
import Chat from './pages/chat.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const excludeHeaderPaths = ['/login']; 

  return (
    <div>
      {!excludeHeaderPaths.includes(location.pathname) && <UserMenu />}
      <main>
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
          <Route path="/routeview" element={<RouteViewPoc />} />
          <Route path="/routeview_poc/:routeId" element={<RouteViewPoc />} />
          <Route path="/history" element={<History />} />
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