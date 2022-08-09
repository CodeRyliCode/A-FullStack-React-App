import React, { Component } from 'react';
import { Link  } from 'react-router-dom';
import Form from './Form'

export default class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: []
    };

    submit = () => {
        const { context } = this.props;
        
        const {
            firstName,
            lastName,
            emailAddress,
            password
        } = this.state

        //new user data
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        context.data.createUser(user)
            .then(errors => {
                if(errors.length) {
                    this.setState({ errors });
                    console.log('There are errors occuring');
                } else {
                    console.log('User was successfully created!')
                }
            })
            .catch(err => {
            console.log(err);
        });

        context.actions.signIn(user.emailAddress, user.password)
            .then(errors => {
                if(errors.length) {
                    this.setState({errors});
                } else {
                console.log('User was successfully logged in!')
                this.props.history.push("/");
                }
            })
            .catch(err => {
                console.log(err);
            })
       
    }

    cancel = () => {
        this.props.history.push('/');
    }

  
    handleChange = (e) => {
        const name = e.target.name;
        const value= e.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
    }

    render() {
        
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
          } = this.state;

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
                                        onChange={this.handleChange}
                                        value={firstName} />
                                    </label>
                                <label htmlFor="lastname">
                                    Last Name
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        onChange={this.handleChange} 
                                        value={lastName} />
                                </label>

                                <label htmlFor="emailAddress">
                                    Email Address
                                    <input 
                                        id="emailAddress"
                                        name="emailAddress"
                                        type="text"
                                        onChange={this.handleChange} 
                                        value={emailAddress}/>
                                </label>
                          
                                <label htmlFor="password">
                                    Password
                                    <input 
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={this.handleChange}
                                        value={password} />
                                </label> 
                            </React.Fragment>
                        )}/>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        )};
};