import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
