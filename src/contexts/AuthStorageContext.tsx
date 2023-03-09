import { createContext, useContext } from "react";

import AuthStorage from "../utils/authStorage";

const defaultValue: AuthStorage | null = null;

const AuthStorageContext = createContext<AuthStorage | null>(defaultValue);

export const useAuthStorage = () => {
  const authStorage = useContext(AuthStorageContext);
  return authStorage;
};

export default AuthStorageContext;
