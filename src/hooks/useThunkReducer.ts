import {
  Reducer,
  useReducer,
  ReducerState,
  ReducerAction,
  Dispatch,
  useCallback
} from "react";

export type Initializer<R extends Reducer<any, any>, I> = (
  arg: I & ReducerState<R> | I
) => ReducerState<R>;
export type AsyncAction<S, A> = (dispatch: Dispatch<A>, state: S) => void;
export type ThunkDispatch<S, A> = (action: A | AsyncAction<S, A>) => void;

let globalState: any = {};

export default function useThunkReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer?: any
): [ReducerState<R>, ThunkDispatch<ReducerState<R>, ReducerAction<R>>] {
  const [state, dispatch] =  useReducer(reducer, initializerArg, initializer)

  globalState = state;

  const thunkDispatch: ThunkDispatch<
    ReducerState<R>,
    ReducerAction<R>
  > = useCallback(action => {
    if (typeof action === "function") {
      return (action as AsyncAction<ReducerState<R>, ReducerAction<R>>)(
        dispatch,
        globalState
      );
    }
    return dispatch(action);
  }, [dispatch]);

  return [state, thunkDispatch];
}