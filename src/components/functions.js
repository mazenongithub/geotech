export function newClient(clientid,firstname,lastname,title,company,address,city,contactstate,zipcode) {
    return({clientid,firstname,lastname,title,company,address,city,contactstate,zipcode})
}

export function newProject(projectid,projectnumber,title,address,city,projectstate, description,clientid) {
    return({projectid,projectnumber,title,address,city,projectstate, description,clientid})
}

export function makeID(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}