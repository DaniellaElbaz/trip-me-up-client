import Chat from './pages/chat.jsx'
import Chatbox from './comp/chatbox.jsx'
import RouteView from './pages/routeview.jsx'
import RouteViewPoc from './pages/routeview_poc.jsx'
import History from './pages/history.jsx';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
         <Route path="/" element={<History />} />{/*need to change !!!!!!!!!!!!!!!!! */}
         <Route path="/routeview" element={<RouteView/> } />
          <Route path="/routeview_poc" element={<RouteViewPoc/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
