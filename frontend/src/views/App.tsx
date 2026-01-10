import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from './dashboard';
import History from './history';
import Login from './login';
import { AuthProvider } from '../Provider/AuthProvider';
import Register from "./register";
import UsersBackoffice from "./backoffice/usersBackoffice";
import AccessCodes from "./backoffice/accessCodes";

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="history" element={<History />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="backoffice">
              <Route index element={<UsersBackoffice />} />
              <Route path="access-codes" element={<AccessCodes />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App