import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    emailaddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstname,
      lastname,
      emailaddress,
      password,
      errors,
    } = this.state;

    return (
        <div className="form--centered">
        <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
              First Name
                <input 
                  id="firstname" 
                  name="firstname" 
                  type="text"
                  value={firstname} 
                  onChange={this.change} 
                 />
                 Last Name
                <input 
                  id="lastname" 
                  name="lastname" 
                  type="text"
                  value={lastname} 
                  onChange={this.change} 
                />
                Email Address
                  <input 
                  id="emailaddress" 
                  name="emailaddress"
                  type="emailaddress"
                  value={emailaddress} 
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
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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

    const {
      firstname,
      lastname,
      emailaddress,
      password,
    } = this.state; 


    // New user payload
    const user = {
        firstname,
        lastname,
        emailaddress,
      password,
    };
    // createUser() is an asynchronous operation that returns a promise. 
    // The resolved value of the promise is either an array of errors 
    // (sent from the API if the response is 400), or an empty array (if the response is 201).
    context.data.createUser(user)
    .then(errors => {
      if (errors.length) {
        this.setState({ errors });
      } else {
        // signIn() is an asynchronous operation that returns a promise. Once the promise 
        // is fulfilled (the user was authenticated), we'll navigate the user to the /authenticated URL path.
        context.actions.signIn(emailaddress, password)
    // Once the authenticated user is in state, we'll push a new entry onto the history 
    // stack to navigate the user to the /authenticated route
        .then(() => {
          this.props.history.push('/authenticated'); 
        });
      }
    })
    .catch( err => { // handle rejected promises
      console.log(err);
      this.props.history.push('/error'); // push to history stack

    });  

  }

  cancel = () => {
    this.props.history.push('/');
  }
}
