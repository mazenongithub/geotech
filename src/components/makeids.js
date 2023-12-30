import UES from "./ues";
import { makeID } from "./functions";
class MakeID {

    reportSectionID(reportid) {
        let sectionid = false;
        const ues = new UES();

        const report = ues.getReportByID.call(this,reportid) 
        if(report) {
            while(!sectionid) {
            sectionid = makeID(16)
            if(report.hasOwnProperty("chapters")) {
                report.chapters.map(chapter=> {
                    if(chapter.chapterid === sectionid) {
                        sectionid = false;
                    }

                    if(chapter.hasOwnProperty("sections")) {
                        chapter.sections.map(section=> {
                            if(section.sectionid === sectionid) {
                                sectionid = false;
                            }

                            if(section.hasOwnProperty("subsections")) {
                                section.subsections.map(subsection=> {
                                    if(subsection.subsectionid === sectionid) {
                                        sectionid = false;
                                    }
                                })
                            }
                       
                       
                       
                        })
                    }
                
                
                
                })

            } 

        }
            
        } else {
            sectionid = makeID(16)
        }

        return sectionid;
    }

    userID() {
        const ues = new UES();
        let _id = false;
        const users = ues.getMyAdminUsers.call(this)
        if (users) {
            while (!_id) {
                _id = makeID(16)

                users.map(user => {
                    if (user._id === _id) {
                        _id = false;
                    }
                })


            }

        } else {
            _id = makeID(16)
        }
        return _id;
    }

    appendixID(reportid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let appendixid = false;
        if (report) {
            while (!appendixid) {
                appendixid = makeID(16);
                if (report.hasOwnProperty("appendix")) {
                    report.appendix.map(getappendix => {
                        if (getappendix.appendixid === appendixid) {
                            appendixid = false;
                        }
                    })

                }

            }

        } else {
            appendixid = makeID(16)
        }
        return appendixid;
    }


    figureID(reportid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let figureid = false;
        if (report) {
            while (!figureid) {
                figureid = makeID(16);
                if (report.hasOwnProperty("figures")) {
                    report.figures.map(figure => {
                        if (figure.figureid === figureid) {
                            figureid = false;
                        }
                    })

                }

            }

        } else {
            figureid = makeID(16)
        }
        return figureid;
    }

    pavementSectionID() {
        let pavementid = false;
        const ues = new UES();
        const pavements = ues.getPavement.call(this);
        if (pavements) {

            while (!pavementid) {
                pavementid = makeID(16)
                // eslint-disable-next-line
                pavements.map(pavement => {
                    if (pavement.hasOwnProperty("design")) {

                        // eslint-disable-next-line
                        pavement.design.map(section => {
                            if (section.pavementid === pavementid) {
                                pavementid = false;
                            }
                        })
                    }
                })


            }


        } else {
            pavementid = makeID(16)
        }
        return pavementid;
    }

    sampleID() {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        let sampleid = false;
        if (borings) {
            while (!sampleid) {
                sampleid = makeID(8)
                // eslint-disable-next-line
                borings.map(boring => {
                    if (boring.hasOwnProperty("samples")) {
                        // eslint-disable-next-line
                        boring.samples.map(sample => {


                            if (sample.sampleid === sampleid) {
                                sampleid = false;
                            }

                        })

                    }

                })

            }

        } else {
            sampleid = makeID(8)
        }

        return sampleid;

    }

    boringID() {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        let boringid = false;
        if (borings) {
            while (!boringid) {
                boringid = makeID(8)
                // eslint-disable-next-line
                borings.map(boring => {
                    if (boring.boringid === boringid) {
                        boringid = false;
                    }

                })

            }

        } else {
            boringid = makeID(8)
        }

        return boringid;

    }

    pavementid() {
        const ues = new UES();
        let sectionid = false;
        const pavements = ues.getPavement.call(this)
        if (pavements) {
            while (!sectionid) {
                sectionid = makeID(16)
                // eslint-disable-next-line
                pavements.map(pavement => {
                    if (pavement.sectionid === sectionid) {
                        sectionid = false;
                    }
                })
            }

        } else {
            sectionid = makeID(16)
        }
        return sectionid;
    }

    sectionID(reportid, chapterid) {
        const ues = new UES();
        let sectionid = false;
        const chapter = ues.getChapterByID.call(this, reportid, chapterid)
        if (chapter) {

            if (chapter.hasOwnProperty("sections")) {
                while (!sectionid) {
                    sectionid = makeID(16);
                    chapter.sections.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionid = false;
                        }
                    })

                }

            } else {

                sectionid = makeID(16);

            }


        }
        return sectionid;

    }

    chapterID(reportid) {

        const ues = new UES();
        let chapterid = false;
        const report = ues.getReportByID.call(this, reportid)
        if (report) {
            while (!chapterid) {
                chapterid = makeID(16)
                if (report.hasOwnProperty("chapters")) {
                    report.chapters.map(chapter => {
                        if (chapter.chapterid === chapterid) {
                            chapterid = false;
                        }
                    })
                }

            }

        } else {
            chapterid = makeID(16)
        }

        return chapterid;

    }

    sectionid(reportid) {
        const ues = new UES();
        let sectionid = false;
        const report = ues.getReportByID.call(this, reportid)
        if (report) {
            while (!sectionid) {
                sectionid = makeID(16);

                if (report.hasOwnProperty("general")) {
                    // eslint-disable-next-line
                    report.general.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionid = false;
                        }
                    })
                }

                if (report.hasOwnProperty("conclusion")) {
                    // eslint-disable-next-line
                    report.general.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionid = false;
                        }
                    })
                }

                if (report.hasOwnProperty("recommendation")) {
                    // eslint-disable-next-line
                    report.general.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionid = false;
                        }
                    })
                }

            }
        } else {
            sectionid = makeID(16)
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