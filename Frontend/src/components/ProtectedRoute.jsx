import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { login } = useAuth();
  console.log("login state in protected route", login);

  // if (!login) {
  //   return <Navigate to="/login" />;
  // }

  return children;
}

export default ProtectedRoute;
