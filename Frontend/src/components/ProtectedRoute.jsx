import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { login } = useAuth();
  console.log("Is user logged in? ", login);

  // Redirect based on login state
  if (login == false) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
