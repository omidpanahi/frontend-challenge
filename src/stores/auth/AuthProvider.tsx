import { createContext, ReactNode, useContext, useEffect } from "react";
import { AUTH_STORE } from "../../consts/LocalStorageKeys";
import useLocalStorage from "../../hooks/useLocalStorage";
import useThunkReducer, { ThunkDispatch } from "../../hooks/useThunkReducer";
import { IUser } from "../../models/User";
import { AuthActions } from "./AuthActions";
import authReducer from "./AuthReducer";

export interface IAuthStore {
  loading: boolean;
  loggedIn: boolean;
  user?: IUser;
  token?: string;
  error?: Error | string;
}

export const initialState: IAuthStore = {
  loggedIn: false,
  loading: false
}

const StateContext = createContext<IAuthStore>(initialState);
const DispatchContext = createContext<ThunkDispatch<IAuthStore,AuthActions>>(() => undefined);

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [storeInLS, setStoreInLS] = useLocalStorage<IAuthStore>(AUTH_STORE, initialState)
  const [state, dispatch] = useThunkReducer(authReducer, storeInLS);

  useEffect(() => {
    setStoreInLS(state)
  }, [state]);

  return (<DispatchContext.Provider value={dispatch}>
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  </DispatchContext.Provider>)
}
export default AuthProvider