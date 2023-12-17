export function newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200) {
    return ({ sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200 })
}
export function newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks) {
    return ({ sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt,sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks })
}
export function newBoring(boringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter) {
    return { boringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter }
}

export function newPavementSection(pavementid, sectionid, ti,ac,ab,as, pcc,use) {
    return({pavementid, sectionid,ti,ac,ab,as,pcc,use})
}

export function newPavement(sectionid,projectid,sectionname,rvalue) {
    return({sectionid, projectid, sectionname, rvalue})
}
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

export function newClient(clientid, prefix, firstname, lastname, title, company, address, city, contactstate, zipcode) {
    return ({ clientid, prefix, firstname, lastname, title, company, address, city, contactstate, zipcode })
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

export function milestoneformatdatestring(datein) {

    let dateinArray = datein.split('-');
    if (dateinArray.length === 3) {
        let newDate = `${dateinArray[1]}/${dateinArray[2]}/${dateinArray[0]}`
        return newDate;
    } else {
        return datein;
    }

}

export function moist (drywgt,tarewgt, wetwgt,wetwgt_2) {
    let wgtwater = 0;
    let netweight = Number(drywgt) - Number(tarewgt)

    if (Number(wetwgt_2) > 0) {
        wgtwater = Number(wetwgt_2) - Number(drywgt)

    } else {
        wgtwater = Number(wetwgt) - Number(drywgt);

    }
    if ((wgtwater / netweight) > 0) {
        return (wgtwater / netweight)
    } else {
        return 0;
    }

}

export function  netwgt_1 (wetwgt_2, wetwgt,tarewgt, drywgt) {
    let netwgt_1 = 0
    if (Number(wetwgt_2) > 0) {
         netwgt_1 = (Number(wetwgt) - Number(tarewgt)) / (1 + moist(drywgt,tarewgt, wetwgt,wetwgt_2))
        
    }
    return netwgt_1;
}
export function netwgt (drywgt,tarewgt) {
    if (Number(drywgt) && Number(tarewgt) > 0) {
        return (Number(drywgt) - Number(tarewgt));
    } else {
        return 0;
    }
}

export function calcdryden (wetwgt_2, wetwgt, tarewgt, drywgt, diameter,samplelength) {
    let netweight = 0;
    if (Number(wetwgt_2) > 0) {
        netweight = netwgt_1(wetwgt_2, wetwgt,tarewgt, drywgt)
    } else {
        netweight = netwgt(drywgt,tarewgt);
    }
    if (netweight > 0 && diameter > 0 && samplelength > 0) {
        return Math.round(Number((netweight / (.25 * Math.pow(Number(diameter), 2) * Math.PI * Number(samplelength))) * (1 / 453.592) * (144 * 12)))
    } else {
        return 0;
    }
}