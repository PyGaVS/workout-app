import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './views/dashboard';
import History from './views/history';
import Login from './views/login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App