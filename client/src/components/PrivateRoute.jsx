import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
export default function PrivateRoute({adminOnly = false}) {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  if (adminOnly && currentUser.role !== "admin") {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return <Outlet />;
}
