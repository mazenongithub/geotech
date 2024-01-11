export function newChapter(reportid, chapterid, chaptername, content) {
    return ({ reportid, chapterid, chaptername, content })
}

export function newReportSection(sectionid, sectionname, content) {
    return ({ sectionid, sectionname, content })
}

export function newSubSection(subsectionid, sectionname, content) {
    return ({ subsectionid, sectionname, content })
}

export function validateUserID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (!value) {
        errmsg = " DriverID is required ";

    }
    else if (value.length > 36) {
        errmsg = " DriverID should be less than 36 characters";
    }
    else if (!test) {
        errmsg = ` Invalid Provider ID format ${value} `;
    }

    return errmsg;
}

export function newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200) {
    return ({ sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200 })
}
export function newSample(sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks) {
    return ({ sampleid, boringid, sampledepth, depth, samplenumber, sampleset, diameter, samplelength, description, uscs, spt, sptlength, wetwgt, wetwgt_2, drywgt, tarewgt, tareno, graphiclog, ll, pi, remarks })
}
export function newBoring(boringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod, contractor, samplingmethod, drivingmethod, checkedby, figure, backfill) {
    return { boringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod, contractor, samplingmethod, drivingmethod, checkedby, figure, backfill }
}

export function newAppendix(appendixid, appendixnumber, appendixname) {
    return ({ appendixid, appendixnumber, appendixname })
}

export function newFigure(figureid, figurenumber, figurename) {
    return ({ figureid, figurenumber, figurename })
}

export function newProposal(proposalid,projectid,dateproposal,proposalnumber,intro) {
    return({proposalid,projectid,dateproposal,proposalnumber,intro})
}

export function newPavementService(serviceid,sectionid,servicetype,ti) {
    return({serviceid,sectionid,servicetype,ti})
}

export function newPavementSection(pavementid, serviceid,  ac, ab, as, pcc) {
    return ({ pavementid, serviceid, ac, ab, as, pcc })
}

export function newPavement(sectionid, project_id, projectid, sectionname, rvalue) {
    return ({ sectionid, project_id, projectid, sectionname, rvalue })
}
export function newSection(sectionid, sectionname, content) {
    return ({ sectionid, sectionname, content })
}

export function newSectionList(listid, sectionid, list) {
    return ({ listid, sectionid, list })
}
export function newSublist(sublistid, content) {
    return ({ sublistid, content })
}
export function newList(listid, content) {
    return ({ listid, content })
}
export function newReport(reportid, project_id, projectid, datereport, intro) {
    return ({ reportid, project_id, projectid, datereport, intro })
}
export function currentDate() {
    let currentdate = "";
    const dateobj = new Date();
    let month = dateobj.getMonth() + 1;
    if(month < 10) {
        month = `0${month}`
    }
    let day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    const year = dateobj.getFullYear();
    currentdate = `${year}-${month}-${day}`

    return currentdate;

}

export function convertDegree(degree) {
    if (Number(degree) > 0) {
        degree = degree.toString();
        let degreeArray = degree.split('.')
        let decimal = `0.${degreeArray[1]}`;
        decimal = Number(decimal)
        let whole = degreeArray[0]

        let totalcentiseconds = decimal * (60 * 60 * 100)

        let minutes = Math.floor(decimal * (60))
        let subtractseconds = minutes * (60 * 100)

        let remainingseconds = totalcentiseconds - subtractseconds
        let seconds = Math.floor(remainingseconds / 100);
        remainingseconds = remainingseconds - (seconds * 100)
        let decimalseconds = Math.round(remainingseconds)
        if (decimalseconds < 10) {
            decimalseconds = `0${decimalseconds}`
        }
        return `${whole}.${minutes}'${seconds}.${decimalseconds}"`

    }

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

export function moist(drywgt, tarewgt, wetwgt, wetwgt_2) {
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

export function netwgt_1(wetwgt_2, wetwgt, tarewgt, drywgt) {
    let netwgt_1 = 0
    if (Number(wetwgt_2) > 0) {
        netwgt_1 = (Number(wetwgt) - Number(tarewgt)) / (1 + moist(drywgt, tarewgt, wetwgt, wetwgt_2))

    }
    return netwgt_1;
}
export function netwgt(drywgt, tarewgt) {
    if (Number(drywgt) && Number(tarewgt) > 0) {
        return (Number(drywgt) - Number(tarewgt));
    } else {
        return 0;
    }
}

export function calcdryden(wetwgt_2, wetwgt, tarewgt, drywgt, diameter, samplelength) {
    let netweight = 0;
    if (Number(wetwgt_2) > 0) {
        netweight = netwgt_1(wetwgt_2, wetwgt, tarewgt, drywgt)
    } else {
        netweight = netwgt(drywgt, tarewgt);
    }
    if (netweight > 0 && diameter > 0 && samplelength > 0) {
        return Math.round(Number((netweight / (.25 * Math.pow(Number(diameter), 2) * Math.PI * Number(samplelength))) * (1 / 453.592) * (144 * 12)))
    } else {
        return 0;
    }
}