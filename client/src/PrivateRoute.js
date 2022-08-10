import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

const PrivateRoute = function ({ component: Component, ...rest }) {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              // The state property holds information about the user's current location
              //  (i.e., the current browser URL). That way, if authentication is successful,
              //  the router can redirect the user back to the original location (from: props.location).
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
export default PrivateRoute;
