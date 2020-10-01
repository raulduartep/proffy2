import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import AuthContext from '../../contexts/auth';

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  
  const { signed } = useContext(AuthContext);

  return (
    <Route
      render={(props) => signed
        ? component && React.createElement(component, props)
        : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      }
      {...rest}
    />
  );
}

export default PrivateRoute;