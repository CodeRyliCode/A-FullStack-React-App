
   import React from "react";
   import { Link } from "react-router-dom";
   
   export default class Header extends React.PureComponent {
     render() {
       const { context } = this.props;
      //created variable to use to display a welcome message to the authenticated user
       const authUser = context.authenticatedUser;
   
       return (
         <header>
           <div className="wrap header--flex">
             <h1 className="header--logo">
               <Link to="/">Courses</Link>
             </h1>
             <nav>
           {/*  If we have an authUser signed in, then we will return the jsx that is allowed
      to be viewed. If authUser is false, then we will display less jsx to view.*/ }
               {authUser ? (
                 <React.Fragment>
                   <ul className="header--signedin">
                     <span>Welcome, {authUser.firstName}!</span>
                     <li>
                       <Link to="/signout">Sign Out</Link>
                     </li>
                   </ul>
                 </React.Fragment>
               ) : (
                 <React.Fragment>
                   <ul className="header--signedout">
                     <li>
                       <Link to="/signup">Sign Up</Link>
                     </li>
                     <li>
                       <Link to="/signin">Sign In</Link>
                     </li>
                   </ul>
                 </React.Fragment>
               )}
             </nav>
           </div>
         </header>
       );
     }
   }