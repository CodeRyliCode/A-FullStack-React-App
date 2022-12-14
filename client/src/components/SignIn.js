import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class SignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
        emailAddress,
      password,
      errors,
    } = this.state;

    return (
            <div className="form--centered">
          <h2>Sign In</h2>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
              Email Address
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="email"
                  value={emailAddress} 
                  onChange={this.change} 
                   />
                   Password
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    /* from = this.props.location.state 
    means that once a user signs in , they will be redirected to the last page needing authentication, that they were on.
    ie: http://localhost:3000/courses/create . If they were not last at a page needing authentication, then they will just
    be directed to the home route '/' */
    const { from } = this.props.location.state || { from: { pathname: '/' } };


    context.actions.signIn(emailAddress, password)
    .then(( user) => {
      if (user === null) {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ] };
        });
        } else {
          // the from paramter means we are going to redirect user to url they were last at once they are authenticated and signed in
          this.props.history.push(from);
          console.log(`SUCCESS! ${emailAddress} is now signed in!`);
        }
    })
    .catch((err) => {
      console.log(err);
      // During sign in, if there is an error caught, then we will naviagate to localhost:3000/errors
      // to display a user friendly error message
      this.props.history.push('/errors');
  });
}


  cancel = () => {
    this.props.history.push('/');

  }
}
