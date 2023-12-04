import UES from "./ues";
import { makeID } from "./functions";
class MakeID {

    sectionid(reportid) {
        const ues = new UES();
        let sectionid = false;
        const report = ues.getReportByID.call(this,reportid)
        if(report) {
            while(!sectionid) {
            sectionid = makeID(16);

            if(report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map(section=> {
                    if(section.sectionid === sectionid) {
                        sectionid = false;
                    }
                })
            }

            if(report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.general.map(section=> {
                    if(section.sectionid === sectionid) {
                        sectionid = false;
                    }
                })
            }

            if(report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.general.map(section=> {
                    if(section.sectionid === sectionid) {
                        sectionid = false;
                    }
                })
            }

            }
        } else {
            sectionid= makeID(16)
        }

        return sectionid;
    }

    sublistid() {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        let sublistid = false;
        if (reports) {
            while (!sublistid) {
                sublistid = makeID(16);
                // eslint-disable-next-line
                reports.map(report => {
                    if (report.hasOwnProperty("list")) {
                        // eslint-disable-next-line
                        report.list.map(list => {
                            if (list.hasOwnProperty("sublist")) {
                                // eslint-disable-next-line
                                list.sublist.map(sublist => {
                                    if (sublist.sublistid === sublistid) {
                                        sublistid = false;
                                    }
                                })

                            }
                        })

                    }
                })

            }

        } else {
            sublistid = makeID(16)
        }
        return sublistid;
    }

    listid() {
        const ues = new UES();
        let listid = false;
        const reports = ues.getReports.call(this)
        if (reports) {
            while (!listid) {
                listid = makeID(16)
                // eslint-disable-next-line
                reports.map(report => {
                    if (report.hasOwnProperty('list')) {
                        // eslint-disable-next-line
                        report.list.map(list => {
                            if (list.listid === listid) {
                                listid = false
                            }
                        })
                    }

                })

            }

        } else {
            listid = makeID(16)
        }
        return listid;

    }

    reportid() {
        let reportid = false;
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            while (!reportid) {
                reportid = makeID(8)
                // eslint-disable-next-line
                reports.map(report => {

                    if (report.reportid === reportid) {
                        reportid = false;
                    }
                })

            }
        } else {
            reportid = makeID(8)

        }

        return reportid;
    }

    projectid() {
        let projectid = false;
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        if (projects) {
            while (!projectid) {
                projectid = makeID(8)
                // eslint-disable-next-line
                projects.map(project => {

                    if (project.projectid === projectid) {
                        projectid = false;
                    }
                })

            }
        } else {
            projectid = makeID(8)

        }

        return projectid;
    }

    clientid() {
        let clientid = false;
        const ues = new UES();
        const clients = ues.getClients.call(this)
        if (clients) {
            while (!clientid) {
                clientid = makeID(16)
                // eslint-disable-next-line
                clients.map(client => {

                    if (client.clientid === clientid) {
                        clientid = false;
                    }

                })

            }
        } else {
            clientid = makeID(16)
        }
        return clientid;

    }



}

export default MakeID;