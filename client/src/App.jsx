import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import Loading from "./components/Loading";
import EmailVerify from "./pages/EmailVerify";
const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <>
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
          path="/email-verified"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <EmailVerify />
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
          {/* <Route path="about" element={<About />} /> */}
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
    </>
  );
}

export default App;
