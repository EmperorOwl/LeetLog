import { BrowserRouter, Routes, Route } from "react-router";

import AuthProvider from "./contexts/Auth.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
