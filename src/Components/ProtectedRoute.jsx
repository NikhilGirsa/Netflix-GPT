import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isPaid = useSelector((state) => state.subscription.isPaid);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  // Admin can access everything
  if (isAdmin) {
    return children;
  }

  // Normal users need to pay
  if (!isPaid) {
    return <Navigate to="/payment" replace />;
  }

  return children;
};

export default ProtectedRoute;
