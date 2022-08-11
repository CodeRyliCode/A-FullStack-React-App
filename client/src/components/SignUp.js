import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class SignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    errors: [],
  };

  submit = () => {
    const { context } = this.props;

    const { firstName, lastName, emailAddress, password } = this.state;

    // New user payload
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    // createUser() is an asynchronous operation that returns a promise.
    // The resolved value of the promise is either an array of errors
    // (sent from the API if the response is 400), or an empty array (if the response is 201).
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
          console.log("There are errors occuring");
        } else {
          console.log("User was successfully created!");
        }
      })
      .catch((err) => {
        console.log(err);
            //if there is an error caught, then we will naviagate to localhost:3000/errors
      // to display a user friendly error message
      this.props.history.push('/errors');
      });


//    we are grabbing the actions of signIn from our context File. They are working together.
//  That's why have a connection for both in our App.js file. We Connect SignIn to context
// like so  --->   const SignInWithContext = withContext(SignIn);
    context.actions
      // signIn() is an asynchronous operation that returns a promise.
      .signIn(user.emailAddress, user.password)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("User is logged in!");
          // Once the promise is fulfilled (the user was authenticated), we'll navigate the user to the home "/" authenticated URL path.
          // we do this by pushing a new entry onto the history stack.
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
            // if there is an error caught, then we will naviagate to localhost:3000/errors
      // to display a user friendly error message
      this.props.history.push('/errors');
      });
  };

  cancel = () => {
    this.props.history.push("/"); // push to history stack
  };

  makeChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;

    return (
      <div className="form--centered">
        <h2>Sign Up</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Sign Up"
          elements={() => (
            <React.Fragment>
              <label htmlFor="firstName">
                First Name
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={this.makeChange}
                  value={firstName}
                />
              </label>
              <label htmlFor="lastname">
                Last Name
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={this.makeChange}
                  value={lastName}
                />
              </label>

              <label htmlFor="emailAddress">
                Email Address
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  onChange={this.makeChange}
                  value={emailAddress}
                />
              </label>

              <label htmlFor="password">
                Password
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={this.makeChange}
                  value={password}
                />
              </label>
            </React.Fragment>
          )}
        />
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    );
  }
}
