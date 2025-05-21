import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // const auth = useAppSelector((state) => state.auth.isAuthenticated);

  // if (!auth) {
    return <Navigate to="/" replace />;
  // }

  return children;
}
