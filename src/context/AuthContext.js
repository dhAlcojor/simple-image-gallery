import {createContext, useCallback, useContext, useMemo, useState} from "react";
import FirebaseAuth from "../handlers/auth";

const {getCurrentUser, signIn, signOut} = FirebaseAuth;
const Context = createContext();

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = useCallback(() => signIn().then(setCurrentUser), [setCurrentUser]);
  const logout = useCallback(() => signOut().then(() => setCurrentUser(null)), [setCurrentUser]);
  const authenticate = useCallback(() => getCurrentUser().then(setCurrentUser), [setCurrentUser]);

  const value = useMemo(() => {
    return {currentUser, authenticate, login, logout};
  }, [authenticate, login, logout, currentUser]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  return useContext(Context);
}

export default AuthProvider;
