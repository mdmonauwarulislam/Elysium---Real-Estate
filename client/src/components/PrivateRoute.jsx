//to show children I need Outlet-component
//Navigate- component
//useNavigate- hook

import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}