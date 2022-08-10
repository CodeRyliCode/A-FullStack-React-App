import React from 'react';

  // Props are passed to this component – from a parent component like SignUp – to provide it the data it needs

const Form = function(props) {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;




    // this is the logic and function for the Create Course button. We use an
  // event.preventdefault to prevent the browser from reloading/refreshing
  // once the button gets clicked in our onClick element below.
  function toSubmit(event) {
    event.preventDefault();
    submit();
  }

  // this is the logic and function for the cancel button. We use an
  // event.preventdefault to prevent the browser from reloading/refreshing
  // once the button gets clicked in our onClick element below.
  function toCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
    {/* If there are validation errors from the user not entering in correct or enough information,
    then we will render this component to display the mapped over errors. */}
      <ErrorsDisplay errors={errors} />
      <form onSubmit={toSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">{submitButtonText}</button>
          <button className="button button-secondary" onClick={toCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
// renders any validation errors sent from the API, via the <ErrorsDisplay> function component
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
        <div className="validation--errors">
        <h3>Validation errors</h3>
          <ul>
            {errors.map((error) => <li>{error}</li>)}
          </ul>
      </div>
    );
  }
  return errorsDisplay;
}


export default Form;