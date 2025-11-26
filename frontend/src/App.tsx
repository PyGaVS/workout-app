import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import Dashboard from './views/dashboard';
import History from './views/history';
import Login from './views/login';
import { AuthProvider } from './Providers/AuthProvider';
import AddWorkout from './views/addWorkout';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App