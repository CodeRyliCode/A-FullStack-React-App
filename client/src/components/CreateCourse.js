import React, { useState  } from 'react';
import {useHistory} from 'react-router-dom';
import Form from './Form'


const CreateCourse = (props) => { 
    const history = useHistory();
    
    const { context } = props;

    const userId = context.authenticatedUser.id;
   
    
  // The course state will hold the array of objects returned from the API.
  // We use the setCourse()function to update the data state with the data returned from the API:
    const [ course, updateCourseState ] = useState({
        title: " ",
        description: " ",
        estimatedTime: " ",
        materialsNeeded: " ",
    });
    const [ errors, setErrors ] = useState([]);



    const submit = () => {

        const emailAddress = context.authenticatedUser.emailAddress;
        const password = context.authenticatedUser.password;

        const newCourse = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        }

    //  With context.data I am accessing the createCourse routing api from my data.js file
        context.data.createCourse(newCourse, emailAddress, password)
                    .then(errors => {
                if(errors.length) {
                    setErrors(errors);
            } else {
                history.push('/');
            }
        })
        .catch(err => {
            console.log('errors:', err)
            history.push('/errors');
        });   
    }

    // When changes are made to create and add a course, we are using the current name and value 
    // that is being input by the user so we can save it to our variable and update the course state
    const makeChange = (e) => {
        let name = e.target.name;
        let value= e.target.value;

        if(name === "courseTitle") {
            name = 'title'
        }
        
        if(name === "courseDescription") {
            name = 'description'
        }
        
        updateCourseState({
            ...course,
            [name]: value
        });
    }


    const cancel = () => {
        history.push(`/`);
    }

    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
    } = course;

    return (
        <div className="wrap">
        <h2>Create Course</h2>
        <div className="main--flex"></div>
                    <Form
                        cancel={cancel}
                        errors={errors}
                        submit={submit}
                        submitButtonText="Create Course"
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
                                        onChange={makeChange}
                                        value={course.title} />
                                </label>
                                <p>{`By ${context.authenticatedUser.name}`}</p>

                                <label htmlFor="courseDescription">
                                    Course Description
                                    <textarea
                                        id="courseDescription"
                                        name="courseDescription"
                                        type="text"
                                        onChange={makeChange} 
                                        value={course.description} />
                                </label>
                            </div>
                        
                        <div>
                            <label htmlFor="estimatedTime">
                                Estimated Time
                                    <input 
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        onChange={makeChange} 
                                        value={course.estimatedTime}/>
                            </label>
                  
                            <label htmlFor="materialsNeeded">
                                Materials Needed
                                    <textarea 
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        type="text"
                                        onChange={makeChange}
                                        value={course.materialsNeeded} />
                            </label> 
                        </div> 
                    </div>
                    </React.Fragment>
            )}/>
        </div>
       )
};

export default CreateCourse;