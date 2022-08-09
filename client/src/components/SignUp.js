import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class SignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
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
      name,
      username,
      password,
    } = this.state; 


    // New user payload
    const user = {
      name,
      username,
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
        context.actions.signIn(username, password)
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
