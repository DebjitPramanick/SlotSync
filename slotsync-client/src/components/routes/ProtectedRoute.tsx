import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "../molecules";
import { useAppContext } from "~/contexts";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { user, isLoadingUser } = useAppContext();

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (!user?.id) {
    return (
      <Navigate
        to={{
          pathname: redirectPath,
        }}
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
