import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("TOKEN");
  const auth = token !== null;
  if (auth) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
