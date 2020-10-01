import React from 'react';

import PrivateRoute from '../components/PrivateRoute';
import LandingPage from '../pages/LandingPage';
import ProfilePage from '../pages/ProfilePage';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';

const AppRoutes: React.FC = () => {
  return (
    <>
      <PrivateRoute 
        exact
        path='/'
        component={LandingPage}
      />
      <PrivateRoute 
        path='/profile'
        component={ProfilePage}
      />
      <PrivateRoute 
        path='/give-classes'
        component={TeacherForm}
      />
      <PrivateRoute 
        path='/study'
        component={TeacherList}
      />
    </>
  );
}


export default AppRoutes;