export async function UploadGraphicLog(formData) {

    var APIURL = `https://civilengineer.io/ues/api/uploadgraphiclog.php`
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        body: formData
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export function SaveReport(values) {

    const APIURL = `https://civilengineer.io/UES/api/handlereport.php`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })

}

export async function LoadPavement(projectid) {

    let APIURL = `https://civilengineer.io/UES/api/loadpavement.php`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadBorings(projectid) {

    let APIURL = `https://civilengineer.io/UES/api/loadborings.php?projectid=${projectid}`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}


export async function LoadReport(projectid) {

    let APIURL = `https://civilengineer.io/UES/api/loadreport.php?projectid=${projectid}`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadProjects() {

    let APIURL = `https://civilengineer.io/UES/api/loadprojects.php`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadClients() {

    let APIURL = `https://civilengineer.io/UES/api/loadclients.php`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function LoadUser() {

    let APIURL = `https://civilengineer.io/UES/api/loaduser.php`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}

export async function SaveProjects(values) {
 

    const APIURL = `https://civilengineer.io/UES/api/saveprojects.php`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function SaveClients(values) {
 

    const APIURL = `https://civilengineer.io/UES/api/saveclients.php`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function SaveUser(values) {
 

    const APIURL = `https://civilengineer.io/UES/api/saveuser.php`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function LoginUser(values) {
 

    const APIURL = `https://civilengineer.io/UES/api/loginuser.php`
  
    return fetch(APIURL, {
        method: 'post',
        credentials: 'include',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),

        body: JSON.stringify(values)
    })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {

                        throw data.message;
                    })
                }

            }

            return resp.json();
        })
}

export async function LogOut() {

    let APIURL = `https://civilengineer.io/UES/api/logout.php`
    
    return fetch(APIURL, { credentials: 'include' }).then(resp => {

        if (!resp.ok) {
            if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                    throw data.message
                })
            }
            else {
                let err =  'No network connection or the Server is not responding';
                throw err;
            }
        }

        return resp.json();
    })
}
