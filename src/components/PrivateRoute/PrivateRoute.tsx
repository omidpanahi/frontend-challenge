import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthState } from "../../stores/auth/AuthProvider";

const PrivateRoute = ({
    children,
    ...rest
}: RouteProps) => {
    const { loggedIn } = useAuthState()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedIn ? children : (
                    <Redirect
                        to={{
                            pathname: "/signup",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
