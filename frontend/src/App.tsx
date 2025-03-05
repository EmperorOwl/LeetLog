import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthProvider from "./contexts/Auth.tsx";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import ProblemDetails from "./components/ProblemDetails.tsx";

function App() {
  return (
    <BrowserRouter basename="/leetlog">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Navigate to="/" />} />
          <Route path="/problems/:number" element={<ProblemDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
