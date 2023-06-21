import {createContext, useContext, useMemo, useState} from "react";
import FirebaseAuth from "../handlers/auth";

const {getCurrentUser, signIn, signOut} = FirebaseAuth;
const Context = createContext();

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = () => signIn().then(setCurrentUser);
  const logout = () => signOut().then(() => setCurrentUser(null));
  const authenticate = () => getCurrentUser().then(setCurrentUser);

  const value = useMemo(() => {
    return {currentUser, authenticate, login, logout};
  }, [authenticate, login, logout, currentUser]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  return useContext(Context);
}

export default AuthProvider;
