import { createContext, useEffect } from "react";
import { userApi } from "~/api";
import { REQUEST_STATES } from "~/constants";
import { useRequestStates } from "~/hooks";

export interface IAppContextProps {
  user: any;
  isLoadingUser: boolean;
}

const initialUser = {
  id: "",
  name: "",
  email: "",
  password: "",
  token: "",
  createdAt: "",
  updatedAt: "",
};

export const AppContext = createContext<IAppContextProps>({
  user: initialUser,
  isLoadingUser: false,
});

const BlackListedRoutesForLoggedInUser = ["/login", "/signup"];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fetchLoggedInUserRequestState, fetchLoggedInUserRequestHandlers] =
    useRequestStates(REQUEST_STATES.PENDING);

  const isAuthPages = BlackListedRoutesForLoggedInUser.includes(
    window.location.pathname
  );

  const getLoggedInUser = async () => {
    fetchLoggedInUserRequestHandlers.pending();
    try {
      const response = await userApi.fetchUser();
      fetchLoggedInUserRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchLoggedInUserRequestHandlers.rejected(error);
    }
  };

  useEffect(() => {
    fetchLoggedInUserRequestHandlers.pending();
    getLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchLoggedInUserRequestState.fulfilled && isAuthPages) {
      window.location.href = "/";
    }
  }, [fetchLoggedInUserRequestState.fulfilled, isAuthPages]);

  const values = {
    user: fetchLoggedInUserRequestState.data || initialUser,
    isLoadingUser: fetchLoggedInUserRequestState.pending,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
