import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router";

interface ProviderProps {
  token: string;

  login(token: string): void;

  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  token: "",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || "",
  );
  const navigate = useNavigate();

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/");
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
