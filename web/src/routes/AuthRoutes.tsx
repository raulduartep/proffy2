import React from 'react';
import { Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ConfirmedEmail from '../pages/ConfimedEmail';
import ResetPasswordPage from '../pages/ResetPasswordPage'

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route
        path='/login'
        component={LoginPage}
      />
      <Route 
        path='/register'
        component={RegisterPage}
      />
      <Route 
        path='/forgot_password'
        component={ForgotPasswordPage}
      />
      <Route
        path='/confirmed_email/:token'
        component={ConfirmedEmail}
      />
      <Route 
        path='/reset_password/:token'
        component={ResetPasswordPage}
      />
    </>
  );
}


export default AppRoutes;