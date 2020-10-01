import React from 'react';

import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';

const Routes: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <AuthRoutes />
    </>
  );
}

export default Routes;