import React from "react";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Courses from "./components/Courses";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import withContext from "./Context";
import PrivateRoute from "./PrivateRoute";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import CourseDetail from "./components/CourseDetail";

const CourseDetailWithContext = withContext(CourseDetail);
// Connect the Header component to context
const HeaderWithContext = withContext(Header);
// This connects the UserSignUp component to context. In other words, UserSignUp is now a consuming component that's subscribed to all context changes.
const SignUpWithContext = withContext(SignUp);
// Connect UserSignIn to context
const SignInWithContext = withContext(SignIn);
const SignOutWithContext = withContext(SignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <HeaderWithContext />

        <Switch>
          <Route exact path="/" component={Courses} />
          <PrivateRoute
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          {/* Redirect from /courses, from will be equal to pathname: "/courses".
        redirect from last route url you were on before signing in */}
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signin" component={SignInWithContext} />
          <Route path="/signup" component={SignUpWithContext} />
          <Route path="/signout" component={SignOutWithContext} />
          <Route path="/error" component={Error} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
