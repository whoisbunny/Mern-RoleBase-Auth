import React, { useState, useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";
import ClientLayout from "./components/ClientLayout";
import DarkModeContext from "./components/DarkModeContext";

const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setDark }}>
      
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/admin-login"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </Suspense>
          }
        />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ClientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </DarkModeContext.Provider>
  );
}

export default App;
