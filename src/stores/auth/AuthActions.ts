import { Dispatch } from "react";
import { IUser } from "../../models/User";
import { ISignupResponse, signUp } from "../../services/userServices";
import { IAuthStore } from "./AuthProvider";

export enum ActionType {
  Loading,
  Error,
  SignupComplete,
  Loggout
}

export interface Loading {
  type: ActionType.Loading;
}

export interface Error {
  type: ActionType.Error;
  payload: {
    error: IAuthStore["error"];
  };
}

export interface SignupComplete {
  type: ActionType.SignupComplete;
  payload: ISignupResponse;
}

export interface Loggout {
  type: ActionType.Loggout
}

export type AuthActions = Loading | Error | SignupComplete | Loggout;

export function signUpUserAction(user: IUser) {
  return async (dispatch: Dispatch<AuthActions>) => {    
    dispatch({
      type: ActionType.Loading,
    });
    signUp(user)
      .then((response) =>
        dispatch({
          type: ActionType.SignupComplete,
          payload: response,
        })
      )
      .catch((error) =>
        dispatch({ type: ActionType.Error, payload: { error } })
      );
  };
}
