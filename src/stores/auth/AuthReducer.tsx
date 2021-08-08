import { ActionType, AuthActions } from "./AuthActions";
import { initialState, IAuthStore } from "./AuthProvider";

export default function authReducer(state: IAuthStore = initialState, action: AuthActions): IAuthStore {
    switch (action.type) {
        case ActionType.Error:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ActionType.Loading:
            return {
                ...state,
                loading: true
            }
        case ActionType.SignupComplete:
            return {
                loading: false,
                error: undefined,
                loggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
            }
        case ActionType.Loggout:
            return {
                loading: false,
                error: undefined,
                loggedIn: false,
                user: undefined,
                token: undefined,
            }
        default:
            return state;
    }
}