import React, { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import ReactMarkDown from "react-markdown";

const CourseDetail = (props) => {
  const history = useHistory();
  const { context } = props;
  const authUser = context.authenticatedUser;

  // The course state will hold the array of objects returned from the API.
  // In the then() method below, use the getCourse()function to update the data state with the data returned from the API:
  const [course, getCourse] = useState({
    course: [],
    title: " ",
    description: " ",
    estimatedTime: " ",
    materialsNeeded: " ",
    firstName: " ",
    lastName: " ",
  });
  const { id } = useParams();

  // Add the useEffect() Hook. The Hook takes a callback function,
  // which makes the fetch request using a set of JavaScript promises.
  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((response) => {
        getCourse({
          course: response,
          title: response.title,
          description: response.description,
          estimatedTime: response.estimatedTime,
          materialsNeeded: response.materialsNeeded,
          firstName: response.User.firstName,
          lastName: response.User.lastName,
        });
      })
      .catch((error) => {
        console.log("There was an Error Fetching Data", error);
      });
  }, [id]);

  const handleDelete = () => {
    // We are accessing these parameters from Context.js
    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    context.data
      .deleteCourse(id, emailAddress, password)
      .then((error) => {
        if (error.length) {
          console.log("Could not delete course");
        } else {
          console.log("Course successfully deleted!");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const actionButtons = (
    <div className="actions--bar">
      <div className="wrap">
        {/*  If we have an authUser signed in, then we will return the buttons that are allowed
      to be accessed such as update course and delete buttons.
       If authUser is false, then we will only return the "return to list button"*/}
        {authUser && course.course.userId === context.authenticatedUser.id ? (
          <React.Fragment>
            <NavLink
              to={`/courses/${course.course.id}/update`}
              className="button"
            >
              Update Course
            </NavLink>
            <NavLink
              to={`/courses/${course.course.id}/delete`}
              className="button"
              onClick={handleDelete}
            >
              Delete Course
            </NavLink>
            <NavLink to="/" className="button button-secondary">
              Return to List
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to="/" className="button button-secondary">
              Return to List
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </div>
  );

  const courseDetails = (
    <div className="wrap">
      <h2>Course Detail</h2>
      <form>
        <div className="main--flex">
          <div>
            <h3 className="course--detail--title">Course</h3>
            <h4 className="course--name">{course.title}</h4>
            <p>{`By ${course.firstName} ${course.lastName}`}</p>
            <ReactMarkDown children={`${course.description}`} />
          </div>
          <div>
            <h3 className="course--detail--title">Estimated Time</h3>
            <p>{course.estimatedTime}</p>

            <h3 className="course--detail--title">Materials Needed</h3>
            <ReactMarkDown children={`${course.materialsNeeded}`} />
            <ul className="course--detail--list" />
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <main>
      {actionButtons}
      {courseDetails}
    </main>
  );
};

export default CourseDetail;
