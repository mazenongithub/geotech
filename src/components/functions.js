export function newSection(sectionid,sectionname,content) {
    return({sectionid,sectionname,content})
}
export function newSublist(sublistid,content) {
    return ({sublistid,content})
}
export function newList(listid,content) {
    return ({listid,content})
}
export function newReport(reportid,projectid,datereport,intro) {
    return({reportid,projectid,datereport,intro})
}
export function currentDate() {
    let currentdate = "";
    const dateobj = new Date();
    const month = dateobj.getMonth() + 1;
    let day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    const year = dateobj.getFullYear();
    currentdate = `${year}-${month}-${day}`

    return currentdate;

}

export function formatDateReport(datestring) {
    datestring = datestring.replace(/-/g, '/');
    let dateob = new Date(datestring);

    let offset = dateob.getTimezoneOffset();
    offset = offset * 60 * 1000;

    let gettime = dateob.getTime() + offset;
    let dateobj = new Date(gettime);
    let month = Number(dateob.getMonth());
    let datereport = "";
    switch (month) {
        case 0:
            datereport += "January";
            break;
        case 1:
            datereport += "February";
            break;
        case 2:
            datereport += "March";
            break;
        case 3:
            datereport += "April";
            break;
        case 4:
            datereport += "May";
            break;
        case 5:
            datereport += "June";
            break;
        case 6:
            datereport += "July";
            break;
        case 7:
            datereport += "August";
            break;
        case 8:
            datereport += "September";
            break;
        case 9:
            datereport += "October";
            break;
        case 10:
            datereport += "November";
            break;
        case 11:
            datereport += "December";
            break;
        default:
            break;
    }
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    return `${datereport} ${day}, ${year}`

}

export function inputUTCStringForLaborID(timein) {

    let datein = new Date(`${timein.replace(/-/g, '/')}-00:00`)
    let hours = datein.getHours();
    let ampm
    if (hours > 12) {
        hours = hours - 12;
        ampm = "PM"
    }
    else if (hours < 12) {
        ampm = "AM"
    }
    else if (hours === 0) {
        hours = 12;
        ampm = "AM"
    }
    else if (hours === 12) {
        ampm = "PM"
    }
    let minutes = datein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    let year = datein.getFullYear()
    let month = datein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${date}/${year} ${hours}:${minutes} ${ampm}`)

}

export function newClient(clientid, firstname, lastname, title, company, address, city, contactstate, zipcode) {
    return ({ clientid, firstname, lastname, title, company, address, city, contactstate, zipcode })
}

export function newProject(projectid, projectnumber, title, address, city, projectstate, description, clientid) {
    return ({ projectid, projectnumber, title, address, city, projectstate, description, clientid })
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