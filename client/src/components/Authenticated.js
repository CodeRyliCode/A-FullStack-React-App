import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;

  return (
    <div className="bounds">
      <div className="grid-100">
        <h1>{authUser.name} is authenticated!</h1>
        <p>Your email address is {authUser.emailAddress}.</p>
      </div>
    </div>
  );
}

// The value of the authenticatedUser state is now available 
// to this function via props.context.authenticatedUser.