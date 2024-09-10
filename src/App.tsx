import "./App.css";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import Layout from "./components/Layout";
function App() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token") ?? "");
      setIsAuthenticated(true);
    } else {
      setToken("");
    }
  }, [isAuthenticated]);
  const checkLoginAuthentication = () => {
    setIsAuthenticated(true);
  };
  const checkLogoutAuthentication = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ token: token, setToken: setToken }}>
      <BrowserRouter>
        <Layout
          handleLogout={checkLogoutAuthentication}
          isAuthenticated={isAuthenticated}
        >
          {token ? (
            <Routes>
              <Route
                path="/login"
                element={<LoginPage handleFxn={checkLoginAuthentication} />}
              />

              <Route path="/" element={<LandingPage />} />
              <Route path="/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          ) : (
            <Routes>
              <Route
                path="*"
                element={<LoginPage handleFxn={checkLoginAuthentication} />}
              />
            </Routes>
          )}
        </Layout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
