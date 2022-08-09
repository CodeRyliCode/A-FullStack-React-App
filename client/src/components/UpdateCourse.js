import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Form from './Form';

const UpdateCourse = (props) => {
    const history = useHistory();
    
    const { context } = props;
    const emailAddress = context.authenticatedUser.username;
    const password = context.authenticatedUser.password;
    
    const [ course, getCourse ] = useState({
        course: [],
        title: " ",
        description: " ",
        estimatedTime: " ",
        materialsNeeded: " ",
        firstName: " ",
        lastName: " "
    });
    const [ errors, setErrors ] = useState([]);
    const { id } = useParams();
   
 
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`, { method: 'GET' })
            .then(res => res.json())
            .then(response => {
                getCourse({
                    course: response,
                    title: response.title,
                    description: response.description,
                    estimatedTime: response.estimatedTime,
                    materialsNeeded: response.materialsNeeded,
                    firstName: response.User.firstName,
                    lastName: response.User.lastName
                })
        })
        .catch(error => {
            console.log('There is an Error Fetching the Data', error);
        });
    }, [id]);

    const submit = () => {
        const courseUpdate = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
        }

        context.data.updateCourse(courseUpdate, id, emailAddress, password)
            .then(errors => {
                if(errors.length) {
                    setErrors(errors);
            } else {
                console.log('Course updated successfully')
                history.push(`/`);
            }
        })
        .catch(err => {
            console.log('error:', err)
            history.push('/error');
        });   
    }

    /*
        * This function handles changes to the
        * fields on the page. When there is a change
        * to a field the course state will update
        * with the new user defined values. 
    */
    const handleChange = (e) => {
        let name = e.target.name;
        let value= e.target.value;

        if(name === "courseTitle") {
            name = 'title'
        }
        
        if(name === "courseDescription") {
            name = 'description'
        }
   
        getCourse({
            ...course,
            [name]: value
        });
    }

    /*
        * This function handles functionality
        * for the cancel button - a user will
        * be redirected to the course detail page
        * when they utilize cancel.
    */
    const cancel = () => {
        history.push(`/courses/${id}`);
    }

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
    } = course;

    return (
        <div className="wrap">
        <h2>Update Course</h2>

            <Form 
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Update Course"
                elements={() => (
                    <React.Fragment>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">
                                    Course Title
                                    <input
                                        id="courseTitle"
                                        name="courseTitle"
                                        type="text"
                                        onChange={handleChange}
                                        value={title} />
                                </label>
                                <p>{`By ${course.firstName} ${course.lastName}`}</p>

                                <label htmlFor="courseDescription">
                                    Course Description
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        type="text"
                                        onChange={handleChange} 
                                        value={description} />
                                </label>
                            </div>
                        
                        <div>
                            <label htmlFor="estimatedTime">
                                Estimated Time
                                    <input 
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        onChange={handleChange} 
                                        value={estimatedTime}/>
                            </label>
                  
                            <label htmlFor="materialsNeeded">
                                Materials Needed
                                    <textarea 
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        type="text"
                                        onChange={handleChange}
                                        value={materialsNeeded} />
                            </label> 
                        </div> 
                    </div>
                </React.Fragment>
            )}/>
            </div>
        );
    };


export default UpdateCourse;