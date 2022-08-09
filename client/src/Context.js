import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';


const Context = React.createContext(); 

export class Provider extends Component {


    state ={
        authenticatedUser: null,
        password: null,
    }


  // Initialize a new instance of the Data class inside the constructor() method. 
  // Assign it to a data property, with this.data:
  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };
  
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {  // Add the 'actions' property and object
          signIn: this.signIn,
  // Like the signIn function, we will need to pass the signOut function 
  // as an action to <Context.Provider> to make it available to
  //  all components connected to context changes.
          signOut: this.signOut

      }
    
    };
     
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    const userPassword = password;
    if (user !== null) {
        user.userPassword = userPassword;
      this.setState(() => {
        return {
          authenticatedUser: user,
          password: password

        };
      });
        // Set cookie
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
      }
    return user;
  }

  signOut = () => {
    // This removes the name and emailAddress properties from state – 
    // the user is no longer authenticated and cannot view the private components.
    this.setState(() => {
      return {
        authenticatedUser: null,
      };
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

// At the bottom of Context.js is a higher-order function named withContext that wraps a 
// provided component in a <Context.Consumer> component. In other words, withContext automatically
//  subscribes (or connects) the component passed to it to all actions and context changes: