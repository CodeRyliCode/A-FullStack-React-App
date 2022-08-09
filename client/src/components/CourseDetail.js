import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';

import {useParams, Link, useHistory} from "react-router-dom";
import ReactMarkdown from  'react-markdown';


const CourseDetail = (props) => {
    
    const context =useContext(Context);
    const history= useHistory();
    const {authenticatedUser}= context;
    const{ id } = useParams(); 
    const[course, setCourse] = useState([]);
    const [user, setUser] =useState([]);

    //fetches a single course by id
    useEffect(()=>{
        context.data.fetchCourse(id)
        .then(res =>{ 
            setCourse(res);
            setUser(res.User);
        }) 
    },[context.data, id]);//updates everytime it changes

    //Deletes the selected course
    const handleDelete = () =>{
        const emailAddress = authenticatedUser.emailAddress;
        const password =authenticatedUser.clientPassword;
        context.data.deleteCourse(id, emailAddress, password)
            .then(
                console.log('Course Deleted'),
                history.push('')
            )
    }

//renders the course details  and update screen 
return(
    <main>
    <div className="actions--bar">
        <div className="wrap">
        {authenticatedUser && course.userId === authenticatedUser.id?(
        <React.Fragment>
            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
            <button className="button" onClick={handleDelete}>Delete Course</button>
            <Link className="button button-secondary" to='/'>Return to List</Link>
        </React.Fragment>
        ) :(  
            <Link className="button button-secondary" to='/'>Return to List</Link>
        )} 
        </div>
    </div>
    <div className="wrap">
        <h2>Course Detail</h2>
        <form>
            <div className="main--flex">
                <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>By:{user.firstName} {user.lastName}</p>
                    <ReactMarkdown>
                        {course.description}
                        </ReactMarkdown>
                </div>
                <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>

                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown>
                        {course.materialsNeeded}
                    </ReactMarkdown>
                </div>
            </div>
        </form>
    </div>
</main>
)
};
export default CourseDetail;