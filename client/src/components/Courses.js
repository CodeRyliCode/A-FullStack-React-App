import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends Component {

// We have our courses state start off in an empty array 
    state = {
      courses: []
    };
// We are fetching the courses from the express api, setting the state, and using error handlers if an error arises
    componentDidMount() {
        fetch('http://localhost:5000/api/courses')
          .then(res => res.json())
          .then(response => {
            this.setState({courses: response})
          })
          .catch(error => {
            console.log('There was an error fetching data', error);
                // if there is an error caught, then we will naviagate to localhost:3000/errors
      // to display a user friendly error message
      this.props.history.push('/errors');
          });
    };

    render() {
      const courses = this.state.courses;
      const courseList = courses.map((course) => {
        return (
          <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
            <span className="course--add--title"></span>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title"> {course.title} </h3>
            <span className="course--add--title"></span>
          </Link>
       )
    });

    return (
      <main>
        <div className="wrap main--grid">
            {courseList}
          <Link to="/courses/create" className="course--module course--add--module">
            <span className="course--add--title">

                     + New Course
            </span>
            </Link>
        </div>
      </main>
  )};
};