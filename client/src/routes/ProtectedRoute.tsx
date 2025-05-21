import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("TOKEN");
  const auth = token == null;
  if (auth) {
  return <Navigate to="/" replace />;
  }

  return children;
}
