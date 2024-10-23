import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const PrivateRoute = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the auth state
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
