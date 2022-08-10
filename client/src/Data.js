import config from './config';

export default class Data {

  // The first method in the class, api(), is used to make the GET and POST requests to the REST API. 
  // It currently accepts an API endpoint as its first argument (path), followed by the HTTP method, 
  // and body, which will contain any data associated with the request.
  api(path, method = 'GET', body = null,  requiresAuth = false, credentials = null) {
    // The url constant configures the request path using the base URL defined in config.js, which gets passed to the returned fetch() method.
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

 // Check if auth is required
 if (requiresAuth) {    
  // The btoa() method creates a base-64 encoded ASCII string from a "string" of data.
  //  We'll use btoa() to encode the username and password credentials passed to the api() method. 
  //  The credentials will be passed as an object containing username and password properties.
  const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

  options.headers['Authorization'] = `Basic ${encodedCredentials}`;

}

    return fetch(url, options);
  }

  async getUser(emailAddress, password) { // add new parameters
  const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  async createUser(user, emailAddress, password) {
    const response = await this.api('/users', 'POST', user, true, {emailAddress, password});
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }  else if (response.status === 401) {
        return response.json().then(data => {
          return data.errors;
        })
    } else {
      throw new Error();
    }
  }

  async createCourse(newCourse, emailAddress, password) {
    const response = await this.api('/courses/', 'POST', newCourse, true, { emailAddress, password});
        if (response.status === 201) {
          return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
              });
        }   else {
        throw new Error();
    }
}



  async updateCourse(courseUpdate, id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', courseUpdate, true, {emailAddress, password});
    if (response.status === 204) {
        return [];
    } else if (response.status === 400) {
        return response.json().then(data => {
            return data.errors;
        });
    }  else {
        throw new Error();
    }
}


async deleteCourse (id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
        return [];
    } else if (response.status === 403) {
        return response.json().then(data => {
            return data.errors;
        });
    }  else {
        throw new Error();
    }
}
}