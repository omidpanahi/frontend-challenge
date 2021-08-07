import { Route, Redirect, RouteProps } from "react-router-dom";

const PrivateRoute = ({
    children,
    ...rest
}: RouteProps) => {
    const isAuthenticated = false;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? children : (
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
