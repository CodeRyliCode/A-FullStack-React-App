import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import Authenticated from './components/Authenticated';
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';




// Connect the Header component to context
const HeaderWithContext = withContext(Header);
// This connects the UserSignUp component to context. In other words, UserSignUp is now a consuming component that's subscribed to all context changes.
const SignUpWithContext = withContext(SignUp);
// Connect UserSignIn to context
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);
const AuthWithContext = withContext(Authenticated);


export default () => (
  <Router>
    <div>
    <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        {/* Redirect from /settings, from will be equal to pathname: "/settings".
        redirect from last route url you were on before signing in */}
        <PrivateRoute path="/settings" component={AuthWithContext} />


        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={SignInWithContext} />
        <Route path="/signup" component={SignUpWithContext} />
        <Route path="/signout" component={SignOutWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
