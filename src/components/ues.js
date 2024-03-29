import { LoadProposals, LoadBorings, LoadClients, LoadProjects, LoadReport, SaveBorings, LoadPavement, SaveReport } from "./actions/api";
import { inputUTCStringForLaborID } from "./functions";
import { MyStylesheet } from "./styles";
class UES {

    showList(list) {

        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        let getlist = [];
        let getsublist = [];

        // eslint-disable-next-line
        list.map(list => {


            getlist.push(<li key={list.listid}>{list.list}</li>)

            if (list.hasOwnProperty("sublist")) {
                // eslint-disable-next-line
                list.sublist.map(sublist => {

                    getsublist.push(<li key={sublist.sublistid}>{sublist.list}</li>)
                })
                getlist.push(<ol key={`reportsublist`} type="a">{getsublist}</ol>)


            }



        })


        return (<ol style={{ ...styles.generalFont, ...regularFont }} key={`reportlist`} type="1">{getlist}</ol>)

    }

    showSubSection(label, section) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.leftMargin40 }} key={section.subsectionid}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <span style={{ ...regularFont }}>{label}</span>
                <span style={{ ...regularFont, ...styles.marginLeft15 }}><u>{section.sectionname}</u></span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.lineSpace }}>
                <span style={{ ...regularFont }}>{section.content}</span>
            </div>

        </div>)

    }



    showSection(label, section) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.marginLeft15 }} key={section.sectionid}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <span style={{ ...regularFont }}>{label}</span>
                <span style={{ ...regularFont, ...styles.marginLeft15 }}><u>{section.sectionname}</u></span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.lineSpace }}>
                <span style={{ ...regularFont }}>{section.content}</span>
            </div>

        </div>)

    }

    getProjectBlock() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        if (project) {

            const showaddress = (project) => {
                if(project.address) {
                    return( <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{project.address}</span></div>)
                }
            }

            const showcity = (project) => {
                if(project.city) {
                    return(<div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{project.city}, {project.projectstate}</span></div>)
                }
            }

            return (
                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>

                    <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont, ...styles.boldFont }}>{project.title}</span></div>
                   {showaddress(project)}
                   {showcity(project)}

                </div>
            )



        }

    }



    getClientBlock() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        if (project) {
            const clientid = project.clientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                        <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{client.prefix} {client.firstname} {client.lastname}, {client.title}</span></div>
                        <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{client.company}</span> </div>
                        <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{client.address} </span></div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}><span style={{ ...regularFont }}>{client.city},{client.contactstate} {client.zipcode}</span> </div>
                    </div>



                )
            }
        }
    }


    proposalSections() {
        return ([
            { section: 'Plan Review' },
            { section: 'Historical Review' },
            { section: 'Investigation' },
            { section: 'Update Report' },
            { section: 'CPT' },
            { section: 'Soil Report' },
            { section: 'Schedule' },
            { section: 'Fee' },
            { section: 'Assumptions' },
            { section: 'Attachments' },
            { section: 'D.I.R.' }
        ])
    }

    figureList() {
        return ([{ section: 'Vicinity Map' },
        { section: 'Site Plan' },
        { section: 'Boring Logs' },
        { section: 'United Soils Classification' }])
    }

    appendixList() {
        return ([{ section: `Atterberg's Limits Test Results` },
        { section: 'Expansion Index Test Results' },
        { section: 'Resistance Value Test Results' },
        { section: 'United Soils Classification' }])
    }

    recommdationSections() {
        // 13002.01 13245.01 13232.01
        return ([
            { section: 'General' },
            { section: 'Site Clearing' },
            { section: 'Site Prepartion' },
            { section: 'Engineered Fill Construction' },
            { section: 'Chemical Treatment Alternative' },
            { section: 'Subgrade Preparation' },
            { section: 'Utility Trench Backfill' },
            { section: 'Foundation Design' },
            { section: 'Post-Tensioned Concrete Foundation/Slab Systems' },
            { section: 'Perimeter Wall Systems' },
            { section: 'Sound Wall Foundations' },
            { section: 'Conventional Spread Foundations' },
            { section: 'Drilled Pier Foundations' },
            { section: 'Interior Floor Slab Support' },
            { section: 'Floor Slab Moisture Penetration Resistance' },
            { section: 'Exterior Flatwork' },
            { section: 'Drought Considerations' },
            { section: 'Retaining Walls' },
            { section: 'Pavement Design' },
            { section: 'Site Drainage' },
            { section: 'Geotechnical Engineering Observation and Testing During Earthwork' },
            { section: 'Additional Services' }


        ])
    }

    conclusionSections() {

        return ([
            { section: '2022 CBC and ASEC 7-16 Seismic Design Parameters' },
            { section: 'Seismicity and Faults' },
            { section: 'Liquefaction Potential' },
            { section: 'Foundation Support' },
            { section: 'Bearing Capacity' },
            { section: 'Seismic Shear Wave Velocity and Seismic Site Class' },
            { section: 'Liquefaction Analysis and Results' },
            { section: 'Soil Expanisve Potential' },
            { section: 'Soil Corrosion Potential' },
            { section: 'Excavation Conditions' },
            { section: 'Soil Suitablity for Engineered Fill Construction' },
            { section: 'Pavement Subgrade Quality' },
            { section: 'Groundwater Conditions and Seasonal Moisture' },
            { section: 'Seasonal Water' },
            { section: 'Percolation Tests' },
            { section: 'Percolation Characteristics of the Subgrade Soils and Conclusions' },
            { section: 'Infiltration Characteristics of the Subgrade Soils and Conclusions' }




        ])

    }

    generalSections() {
        return ([
            { section: 'Supplement Information' },
            { section: 'Previous Studies' },
            { section: 'Authorization' },
            { section: 'Proposed Development' },
            { section: 'Figures and Appendix' },
            { section: 'Site Description' },
            { section: 'Scope of Work' },
            { section: 'Historical Aerial Photographs' },

            { section: 'Site Geology' },
            { section: 'Field Exploration, Sampling, and Laboratory Testing' }


        ])
    }

    findingSections() {
        return ([
            { section: 'Site Description' },
            { section: 'Historical Aerial Photographs' },
            { section: 'Subsurface Conditions' },
            { section: 'Groundwater Conditions' },
            { section: 'Site Geology' },
            { section: 'Field Exploration, Sampling, and Laboratory Testing' }

        ])
    }

    getMyAdminRequestKeybyID(userid) {
        const ues = new UES();
        let key = false;
        let requests = ues.getMyAdminRequests.call(this)
        if (requests) {
            // eslint-disable-next-line
            requests.map((user, i) => {
                if (user.userid === userid) {
                    key = i;
                }
            })
        }
        return key;
    }



    getMyAdminRequestbyID(userid) {
        const ues = new UES();
        let getuser = false;
        let requests = ues.getMyAdminRequests.call(this)
        if (requests) {
            // eslint-disable-next-line
            requests.map(user => {
                if (user.userid === userid) {
                    getuser = user;
                }
            })
        }
        return getuser;
    }

    getMyAdminRequests() {
        const ues = new UES();
        let requests = false;
        const myadmin = ues.getMyAdmin.call(this)
        if (myadmin) {
            if (myadmin.hasOwnProperty("requests")) {
                requests = myadmin.requests;
            }
        }
        return requests;
    }


    getMyAdminUserKeybyID(userid) {
        const ues = new UES();
        let key = false;
        let users = ues.getMyAdminUsers.call(this)
        if (users) {
            // eslint-disable-next-line
            users.map((user, i) => {
                if (user.userid === userid) {
                    key = i;
                }
            })
        }
        return key;
    }



    getMyAdminUserbyID(userid) {
        const ues = new UES();
        let getuser = false;
        let users = ues.getMyAdminUsers.call(this)

        if (users) {
            // eslint-disable-next-line
            users.map(user => {
                if (user.userid === userid) {
                    getuser = user;
                }
            })
        }

        return getuser;
    }

    getMyAdminUsers() {
        const ues = new UES();
        let users = false;
        const myadmin = ues.getMyAdmin.call(this)
        if (myadmin) {
            if (myadmin.hasOwnProperty("users")) {
                users = myadmin.users;
            }
        }
        return users;
    }

    getMyAdmin() {
        let myadmin = false;
        if (this.props.myadmin) {
            if (this.props.myadmin.hasOwnProperty("users")) {
                myadmin = this.props.myadmin;

            }

        }

        return myadmin;
    }

    async saveReport() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        if (project) {
            const project_id = project._id;
            const reports = ues.getReportsByProjectID.call(this, projectid)

            try {

                this.setState({ spinner: true })
                const response = await SaveReport({ project_id, reports });
                console.log(response)
                if (response.hasOwnProperty("reportsdb")) {
                    // eslint-disable-next-line

                    this.props.reduxReports(response.reportsdb)

                }

                let message = "";
                if (response.hasOwnProperty("message")) {
                    message += response.message;

                }

                if (response.hasOwnProperty("lastupdated")) {
                    message += ` Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }

                this.setState({ message, spinner: false })

            } catch (err) {
                this.setState({ spinner: false })
                alert(err)
            }


        }


    }

    async saveBorings() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        if (project) {
            const project_id = project._id;
            if (projectid) {
                const borings = ues.getBoringsbyProjectID.call(this, projectid);
                if (borings) {
                    try {
                        this.setState({ spinner: true })

                        const response = await SaveBorings({ project_id, borings })
                        console.log(response)
                        if (response.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            response.borings.map(boring => {
                                const boringid = boring.boringid;
                                const getboring = ues.getBoringbyID.call(this, boringid)
                                if (getboring) {
                                    const i = ues.getBoringKeybyID.call(this, boringid)
                                    borings[i] = boring;
                                }
                            })
                            this.props.reduxBorings(borings)
                        }
                        let message = "";
                        if (response.hasOwnProperty("message")) {
                            message += response.message;

                        }

                        if (response.hasOwnProperty("lastupdated")) {
                            message += ` Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                        }
                        this.setState({ message, spinner: false })

                    } catch (err) {
                        this.setState({ spinner: false })
                        alert(err)
                    }

                }

            } else {
                alert(`Save Project Before Save Borings`)
            }

        }

    }


    async loadBorings() {


        try {
            let response = await LoadBorings();
            console.log(response)
            if (response.hasOwnProperty("borings")) {
                this.props.reduxBorings(response.borings)
                this.setState({ render: 'render' })

            }

        } catch (err) {
            alert(err)
        }

    }

    async loadPavement() {
        try {
            const response = await LoadPavement();
            console.log(response)
            if (response.hasOwnProperty("pavement")) {
                this.props.reduxPavement(response.pavement)
            }

        } catch (err) {
            alert(err)
        }
    }


    async loadReports() {


        try {

            let response = await LoadReport();
            console.log(response)
            if (response.hasOwnProperty("reports")) {

                this.props.reduxReports(response.reports);
                this.setState({ render: 'render' })

            }

        } catch (err) {
            alert(err)
        }
    }

    async loadProjects() {
        try {

            let response = await LoadProjects();
            console.log(response)
            if (response.hasOwnProperty("projects")) {
                this.props.reduxProjects(response.projects)
            }


        } catch (err) {

        }
    }


    async loadClients() {

        try {

            let response = await LoadClients();
            console.log(response)
            if (response.hasOwnProperty("clients")) {
                this.props.reduxClients(response.clients);
                this.setState({ render: 'render' })
            }

        } catch (err) {
            alert(err)
        }

    }

    getBoringsbyProjectID(projectid) {
        const ues = new UES();
        let getborings = [];
        const borings = ues.getBorings.call(this)
        if (borings) {
            // eslint-disable-next-line
            borings.map(boring => {
                if (boring.projectid === projectid) {

                    getborings.push(boring)
                }

            })
        }
        if (getborings.length === 0) {
            getborings = false;
        }
        return getborings;
    }

    getSampleKeyByID(boringid, sampleid) {
        const ues = new UES();
        let key = false;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        if (samples) {
            //eslint-disable-next-line
            samples.map((sample, i) => {
                if (sample.sampleid === sampleid) {
                    key = i;
                }

            })
        }
        return key;
    }

    getSampleByID(boringid, sampleid) {
        const ues = new UES();
        let getsample = false;
        const samples = ues.getSamplesbyBoringID.call(this, boringid)
        if (samples) {
            //eslint-disable-next-line
            samples.map(sample => {
                if (sample.sampleid === sampleid) {
                    getsample = sample;
                }

            })
        }
        return getsample;
    }

    getSamplesbyBoringID(boringid) {
        const ues = new UES();
        let getsamples = false;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            if (boring.hasOwnProperty("samples")) {
                getsamples = boring.samples;
                getsamples.sort((a, b) => {
                    if (Number(a.depth) >= Number(b.depth)) {
                        return 1;
                    } else {
                        return -1
                    }
                })
            }

        }
        return getsamples;
    }

    getBoringKeybyID(boringid) {
        const ues = new UES();
        let key = false;
        const borings = ues.getBorings.call(this)
        if (borings) {
            // eslint-disable-next-line 
            borings.map((boring, i) => {
                if (boring.boringid === boringid) {
                    key = i;

                }
            })
        }

        return key;
    }



    getBoringbyID(boringid) {
        const ues = new UES();
        let getboring = false;
        const borings = ues.getBorings.call(this)
        if (borings) {
            // eslint-disable-next-line 
            borings.map(boring => {
                if (boring.boringid === boringid) {
                    getboring = boring;

                }
            })
        }

        return getboring;
    }

    getBorings() {
        let borings = false;
        if (this.props.borings) {
            if (this.props.borings.hasOwnProperty("length")) {
                borings = this.props.borings;
            }
        }

        return borings;
    }

    getPavementByProjectID(projectid) {
        const ues = new UES();
        let getpavements = [];

        const pavements = ues.getPavement.call(this);
        if (pavements) {

            // eslint-disable-next-line
            pavements.map(pavement => {
                if (pavement.projectid === projectid) {
                    getpavements.push(pavement)
                }
            })
        }


        return getpavements;

    }

    getPavementSectionKeyByID(sectionid, serviceid, pavementid) {
        const ues = new UES();
        let key = false;
        const pavementsections = ues.getPavementSections.call(this, sectionid, serviceid);
        if (pavementsections) {
            // eslint-disable-next-line
            pavementsections.map((section, i) => {
                if (section.pavementid === pavementid) {
                    key = i;
                }
            })
        }



        return key;
    }


    getPavementServiceKeyByID(sectionid, serviceid) {
        const ues = new UES();
        const getservice = ues.getPavementService.call(this, sectionid);
        let key = false;
        if (getservice) {
            // eslint-disable-next-line
            getservice.map((service, i) => {
                if (service.serviceid === serviceid) {
                    key = i;

                }
            })


        }
        return key;
    }

    getPavementServiceByID(sectionid, serviceid) {
        const ues = new UES();
        const getservice = ues.getPavementService.call(this, sectionid);
        let findservice = false;
        if (getservice) {
            // eslint-disable-next-line
            getservice.map(service => {
                if (service.serviceid === serviceid) {
                    findservice = service;

                }
            })


        }
        return findservice;
    }

    getPavementService(sectionid) {
        const ues = new UES();
        let getsection = false;
        const section = ues.getPavementByID.call(this, sectionid);

        if (section) {


            if (section.hasOwnProperty("services")) {
                getsection = section.services;
            }



        }

        return getsection;

    }

    getPavementSectionByID(sectionid, serviceid, pavementid) {
        const ues = new UES();
        let getsection = false;
        const pavementsections = ues.getPavementSections.call(this, sectionid, serviceid);
        if (pavementsections) {
            // eslint-disable-next-line
            pavementsections.map(section => {
                if (section.pavementid === pavementid) {
                    getsection = section;
                }
            })
        }

        return getsection;
    }

    getPavementSections(sectionid, serviceid) {
        let getsections = false;
        const ues = new UES();
        const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
        if (service.hasOwnProperty("design")) {
            getsections = service.design;
        }


        return getsections;

    }

    getPavementKeyByID(sectionid) {
        const ues = new UES();
        let key = false;
        const pavements = ues.getPavement.call(this)
        if (pavements) {
            // eslint-disable-next-line
            pavements.map((pavement, i) => {
                if (pavement.sectionid === sectionid) {
                    key = i;
                }
            })
        }

        return key;

    }

    getPavementByID(sectionid) {
        const ues = new UES();
        let getpavement = false;
        const pavements = ues.getPavement.call(this)
        if (pavements) {
            // eslint-disable-next-line
            pavements.map(pavement => {
                if (pavement.sectionid === sectionid) {
                    getpavement = pavement;
                }
            })
        }

        return getpavement;

    }

    getPavement() {
        let pavement = false;
        if (this.props.pavement) {
            if (this.props.pavement.hasOwnProperty("length")) {
                pavement = this.props.pavement;
            }
        }

        return pavement;
    }

    getChapterKeyByID(reportid, chapterid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let key = false;
        if (report) {
            const chapters = ues.getChaptersByReportID.call(this, reportid)
            if (chapters) {
                // eslint-disable-next-line
                chapters.map((chapter, i) => {
                    if (chapter.chapterid === chapterid) {
                        key = i;
                    }
                })
            }
        }

        return key;
    }

    getChapterByID(reportid, chapterid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let getchapter = false;
        if (report) {
            const chapters = ues.getChaptersByReportID.call(this, reportid)
            if (chapters) {
                // eslint-disable-next-line
                chapters.map(chapter => {
                    if (chapter.chapterid === chapterid) {
                        getchapter = chapter;
                    }
                })
            }
        }

        return getchapter;
    }

    getSubSectionKeybyID(reportid, chapterid, sectionid, subsectionid) {
        const ues = new UES();
        let key = false;
        const subsections = ues.getSubSections.call(this, reportid, chapterid, sectionid)
        if (subsections) {
            // eslint-disable-next-line
            subsections.map((subsection, i) => {
                if (subsection.subsectionid === subsectionid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getSubSectionbyID(reportid, chapterid, sectionid, subsectionid) {
        const ues = new UES();
        let getsection = false;
        const subsections = ues.getSubSections.call(this, reportid, chapterid, sectionid)

        if (subsections) {
            // eslint-disable-next-line
            subsections.map(subsection => {
                if (subsection.subsectionid === subsectionid) {
                    getsection = subsection;
                }
            })
        }

        return getsection;
    }

    getSubSections(reportid, chapterid, sectionid) {
        const ues = new UES();
        let getsubsections = false;
        const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
        if (section) {
            if (section.hasOwnProperty("subsections")) {
                getsubsections = section.subsections;

            }
        }
        return getsubsections;
    }

    getSectionKeybyID(reportid, chapterid, sectionid) {
        const ues = new UES();
        let key = false;
        const sections = ues.getSectionsbyChapterID.call(this, reportid, chapterid)
        if (sections) {
            // eslint-disable-next-line
            sections.map((section, i) => {
                if (section.sectionid === sectionid) {
                    key = i
                }
            })
        }
        return key;

    }


    getSectionListKeybyID(reportid, chapterid, sectionid, listid) {
        const ues = new UES();
        let key = false;
        const sectionlist = ues.getSectionList.call(this, reportid, chapterid, sectionid)
        if (sectionlist) {
            // eslint-disable-next-line
            sectionlist.map((list, i) => {
                if (list.listid === listid) {
                    key = i;
                }
            })

        }

        return key;

    }


    getSectionListbyID(reportid, chapterid, sectionid, listid) {
        const ues = new UES();
        let getlist = false;
        const sectionlist = ues.getSectionList.call(this, reportid, chapterid, sectionid)
        if (sectionlist) {
            // eslint-disable-next-line
            sectionlist.map(list => {
                if (list.listid === listid) {
                    getlist = list;
                }
            })

        }

        return getlist;

    }


    getSectionList(reportid, chapterid, sectionid) {
        const ues = new UES();
        let getlist = false;
        const sections = ues.getSectionsbyChapterID.call(this, reportid, chapterid)
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                if (section.sectionid === sectionid) {

                    if (section.hasOwnProperty("list")) {
                        getlist = section.list;
                    }


                }
            })
        }

        return getlist;

    }





    getSectionbyID(reportid, chapterid, sectionid) {
        const ues = new UES();
        let getsection = false;
        const sections = ues.getSectionsbyChapterID.call(this, reportid, chapterid)
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                if (section.sectionid === sectionid) {
                    getsection = section;
                }
            })
        }
        return getsection;

    }


    getSectionsbyChapterID(reportid, chapterid) {
        const ues = new UES();
        let getsections = false;
        const chapter = ues.getChapterByID.call(this, reportid, chapterid)
        if (chapter) {
            if (chapter.hasOwnProperty("sections")) {
                getsections = chapter.sections;
            }
        }
        return getsections;
    }

    getChaptersByReportID(reportid) {
        const ues = new UES();
        let chapters = false;
        const report = ues.getReportByID.call(this, reportid)

        if (report.hasOwnProperty("chapters")) {
            chapters = report.chapters;
        }
        return chapters;
    }

    getReports() {
        let reports = false;
        if (this.props.reports) {
            if (this.props.reports.hasOwnProperty("length")) {
                reports = this.props.reports;
            }
        }
        return reports;
    }

    getListKeybyID(reportid, listid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let key = false;



        if (report.hasOwnProperty("list")) {
            // eslint-disable-next-line
            report.list.map((list, i) => {
                if (list.listid === listid) {
                    key = i;

                }
            })
        }


        return key;
    }

    getSublistKeybyID(reportid, listid, sublistid) {
        const ues = new UES();
        const list = ues.getListbyID.call(this, reportid, listid);
        let key = false;
        if (list.hasOwnProperty("sublist")) {
            // eslint-disable-next-line
            list.sublist.map((sublist, i) => {
                if (sublist.sublistid === sublistid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getSublistbyID(reportid, listid, sublistid) {
        const ues = new UES();
        const list = ues.getListbyID.call(this, reportid, listid);
        let getsublist = false;
        if (list.hasOwnProperty("sublist")) {
            // eslint-disable-next-line
            list.sublist.map(sublist => {
                if (sublist.sublistid === sublistid) {
                    getsublist = sublist;
                }
            })
        }
        return getsublist;
    }

    getListbyID(reportid, listid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        let getlist = false;



        if (report.hasOwnProperty("list")) {
            // eslint-disable-next-line
            report.list.map(list => {
                if (list.listid === listid) {
                    getlist = list;

                }
            })
        }



        return getlist;
    }

    getListIDfromSublistID(reportid, sublistid) {
        const ues = new UES();
        let listid = false;
        const report = ues.getReportByID.call(this, reportid);
        if (report) {
            if (report.hasOwnProperty("list")) {
                // eslint-disable-next-line
                report.list.map(list => {

                    if (list.hasOwnProperty("sublist")) {
                        // eslint-disable-next-line
                        list.sublist.map(sublist => {
                            if (sublist.sublistid === sublistid) {
                                listid = list.listid;
                            }
                        })
                    }
                })
            }
        }
        return listid;
    }

    getGeneralSectionKeybyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let key = false;
        if (report) {
            if (report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map((section, i) => {
                    if (section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }



        }
        return key;
    }

    getGeneralSectionbyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let getsection = false;
        if (report) {
            if (report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map(section => {
                    if (section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }



        }
        return getsection;
    }

    getConclusionSectionKeybyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let key = false;
        if (report) {
            if (report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.conclusion.map((section, i) => {
                    if (section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }



        }
        return key;
    }

    getConclusionSectionbyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let getsection = false;
        if (report) {
            if (report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.conclusion.map(section => {
                    if (section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }



        }
        return getsection;
    }

    getFindingSectionKeybyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let key = false;
        if (report) {
            if (report.hasOwnProperty("finding")) {
                // eslint-disable-next-line
                report.finding.map((section, i) => {
                    if (section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }



        }
        return key;
    }

    getFindingSectionbyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let getsection = false;
        if (report) {
            if (report.hasOwnProperty("finding")) {
                // eslint-disable-next-line
                report.finding.map(section => {
                    if (section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }



        }
        return getsection;
    }

    getRecommendationSectionKeybyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let key = false;
        if (report) {
            if (report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.recommendation.map((section, i) => {
                    if (section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }



        }
        return key;
    }

    getRecommendationSectionbyID(reportid, sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid);
        let getsection = false;
        if (report) {
            if (report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.recommendation.map(section => {
                    if (section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }



        }
        return getsection;
    }


    getReportKeyByID(reportid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        let key = false;
        if (reports) {
            // eslint-disable-next-line
            reports.map((report, i) => {
                if (report.reportid === reportid) {
                    key = i;
                }

            })
        }
        return key;
    }

    getReportByID(reportid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        let getreport = false;
        if (reports) {
            // eslint-disable-next-line
            reports.map(report => {
                if (report.reportid === reportid) {
                    getreport = report;
                }

            })
        }
        return getreport;
    }

    getReportsByProjectID(projectid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        let getreports = [];
        if (reports) {
            // eslint-disable-next-line
            reports.map(report => {
                if (report.projectid === projectid) {
                    getreports.push(report)

                }
            })

            if (getreports.length === 0) {
                getreports = false;
            }
        } else {
            getreports = false;
        }
        return getreports;
    }

    checkUser() {
        let myuser = false;
        if (this.props.myuser) {
            if (this.props.myuser.hasOwnProperty("userid")) {
                myuser = this.props.myuser;
            }
        }
        return myuser;
    }

    getLoginButton() {

        if (this.state.width > 1200) {
            return ({ width: '340px', height: 'auto' })

        } else if (this.state.width > 600) {

            return ({ width: '240px', height: 'auto' })

        } else {

            return ({ width: '200px', height: 'auto' })

        }

    }

    approveIcon() {

        if (this.state.width > 1200) {
            return ({ width: '60px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '50px', height: 'auto' })

        } else {
            return ({ width: '40px', height: 'auto' })

        }

    }

    removeIcon() {

        if (this.state.width > 1200) {
            return ({ width: '50px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '40px', height: 'auto' })

        } else {
            return ({ width: '30px', height: 'auto' })

        }

    }

    logdraftImage() {
        if (this.state.width > 1200) {
            return ({ width: '150px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '100px', height: 'auto' })

        } else {
            return ({ width: '50px', height: 'auto' })

        }
    }

    arrowUp() {
        if (this.state.width > 1200) {
            return ({ width: '50px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '40px', height: 'auto' })

        } else {
            return ({ width: '30px', height: 'auto' })

        }
    }

    generateIcon() {
        if (this.state.width > 1200) {
            return ({ width: '200px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '160px', height: 'auto' })

        } else {
            return ({ width: '120px', height: 'auto' })

        }
    }


    arrowWidth() {

        if (this.state.width > 1200) {
            return ({ width: '200px', height: 'auto' })

        } else if (this.state.width > 600) {
            return ({ width: '150px', height: 'auto' })

        } else {
            return ({ width: '100px', height: 'auto' })

        }

    }

    hugeFont() {
        if (this.state.width > 1200) {
            return ({ fontSize: '42px' })

        } else if (this.state.width > 600) {
            return ({ fontSize: '36px' })

        } else {
            return ({ fontSize: '30px' })

        }


    }

    headerFont() {

        if (this.state.width > 1200) {
            return ({ fontSize: '36px' })

        } else if (this.state.width > 600) {
            return ({ fontSize: '30px' })

        } else {
            return ({ fontSize: '24px' })

        }

    }
    checkBox() {
        return ({ width: '33px', height: 'auto' })
    }
    regularFont() {

        if (this.state.width > 1200) {
            return ({ fontSize: '30px' })

        } else if (this.state.width > 600) {
            return ({ fontSize: '24px' })

        } else {
            return ({ fontSize: '20px' })

        }

    }

    getAppendixKeybyID(reportid, appendixid) {

        const ues = new UES();
        let key = false;
        const appendixs = ues.getAppendixsbyReportID.call(this, reportid)
        if (appendixs) {
            // eslint-disable-next-line
            appendixs.map((appendix, i) => {
                if (appendix.appendixid === appendixid) {
                    key = i;
                }
            })
        }

        return key;
    }

    getAppendixbyID(reportid, appendixid) {

        const ues = new UES();
        let getappendix = false;
        const appendixs = ues.getAppendixsbyReportID.call(this, reportid)
        if (appendixs) {
            // eslint-disable-next-line
            appendixs.map(appendix => {
                if (appendix.appendixid === appendixid) {
                    getappendix = appendix;
                }
            })
        }

        return getappendix;
    }

    getAppendixsbyReportID(reportid) {
        const ues = new UES();
        let getappendix = false;
        const report = ues.getReportByID.call(this, reportid)
        if (report) {
            if (report.hasOwnProperty("appendix")) {
                getappendix = report.appendix;
            }
        }
        return getappendix;
    }

    getFigureKeybyID(reportid, figureid) {

        const ues = new UES();
        let key = false;
        const figures = ues.getFiguresbyReportID.call(this, reportid)
        if (figures) {
            // eslint-disable-next-line
            figures.map((figure, i) => {
                if (figure.figureid === figureid) {
                    key = i;
                }
            })
        }

        return key;
    }

    getFigurebyID(reportid, figureid) {

        const ues = new UES();
        let getfigure = false;
        const figures = ues.getFiguresbyReportID.call(this, reportid)
        if (figures) {
            // eslint-disable-next-line
            figures.map(figure => {
                if (figure.figureid === figureid) {
                    getfigure = figure;
                }
            })
        }

        return getfigure;
    }

    getFiguresbyReportID(reportid) {
        const ues = new UES();
        let getfigures = false;
        const report = ues.getReportByID.call(this, reportid)
        if (report) {
            if (report.hasOwnProperty("figures")) {
                getfigures = report.figures;
            }
        }
        return getfigures;
    }

    getProjectKeybyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let key = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map((project, i) => {
                if (project.projectid === projectid) {
                    key = i
                }
            })
        }
        return key;
    }

    getGroupLineItemKeyByID(proposalid,groupid,lineid) {
        const ues = new UES();
        const lineitems = ues.getGroupLineItems.call(this,proposalid,groupid)
        let key = false;
        if(lineitems) {
            // eslint-disable-next-line
            lineitems.map((item,i)=> {
                if(item.lineid === lineid) {
                   key = i;
                }
            })
        }
        return key
       }

   getGroupLineItemByID(proposalid,groupid,lineid) {
    const ues = new UES();
    const lineitems = ues.getGroupLineItems.call(this,proposalid,groupid)
    let getitem = false;
    if(lineitems) {
        // eslint-disable-next-line
        lineitems.map((item)=> {
            if(item.lineid === lineid) {
                getitem = item;
            }
        })
    }
    return getitem;
   }

    getGroupLineItems(proposalid,groupid) {
        const ues = new UES();
        const group = ues.getProposalGroupByID.call(this,proposalid,groupid)
        let getitems = false;
        if(group) {
            if(group.hasOwnProperty("lineitems")) {
                getitems = group.lineitems;
            }
        }
        return getitems;
    }
    


    getProposalGroupKeyByID(proposalid, groupid) {
        const ues = new UES();
        const costestimate = ues.getProposalEstimate.call(this,proposalid)
        let key = false;
        if(costestimate) {
            // eslint-disable-next-line
            costestimate.map((group,i)=> {
                if(group.groupid === groupid) {
                    key = i;

                }
            })
        }

        return key;
        
    }


    getProposalGroupByID(proposalid, groupid) {
        const ues = new UES();
        const costestimate = ues.getProposalEstimate.call(this,proposalid)
        let getgroup = false;
        if(costestimate) {
            // eslint-disable-next-line
            costestimate.map(group=> {
                if(group.groupid === groupid) {
                    getgroup = group;

                }
            })
        }

        return getgroup;
        
    }

    

    getProposalEstimate(proposalid) {
        const ues = new UES();
        const proposal = ues.getProposalByID.call(this,proposalid)
        let costestimate = false;
        if(proposal) {
            if(proposal.hasOwnProperty("costestimate")) {
                costestimate = proposal.costestimate;

            }
        }

        return costestimate;
        
    }

    getProjectbyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let getproject = false;
        if (projects) {
            // eslint-disable-next-line
            projects.map(project => {
                if (project.projectid === projectid) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }

    getProposalSectionListKeybyID(proposalid,sectionid, listid) {
        const ues = new UES();
        let key = false;
        const lists = ues.getProposalSectionList.call(this,proposalid,sectionid)
        if(lists) {
            // eslint-disable-next-line
            lists.map((list,i)=> {
                if(list.listid === listid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getProposalSectionListbyID(proposalid,sectionid, listid) {
        const ues = new UES();
        let getlist = false;
        const lists = ues.getProposalSectionList.call(this,proposalid,sectionid)
        if(lists) {
            // eslint-disable-next-line
            lists.map(list=> {
                if(list.listid === listid) {
                    getlist = list;
                }
            })
        }
        return getlist;
    }

    getProposalSectionList(proposalid,sectionid) {
        const ues = new UES();
        let list = false;
        const section = ues.getProposalSectionByID.call(this,proposalid,sectionid)
        if(section) {
            if(section.hasOwnProperty("list")) {
                list = section.list;
            }
        }
        return list;
    }

    getProposalSectionKeyByID(proposalid, sectionid) {
        const ues = new UES();
        let key = false;
        const sections = ues.getProposalSections.call(this,proposalid)
        if(sections) {
            // eslint-disable-next-line
            sections.map((section,i)=> {
                if(section.sectionid === sectionid) {
                    key = i;
                }
            })
        }

        return key;

    }

    getProposalSubSectionKeyByID(proposalid,sectionid,subsectionid) {
        const ues = new UES();
        let key = false;
        const subsections = ues.getProposalSubSections.call(this,proposalid,sectionid)
        if(subsections) {
            // eslint-disable-next-line
            subsections.map((subsection,i)=> {
                if(subsection.subsectionid === subsectionid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getProposalSubSectionByID(proposalid,sectionid,subsectionid) {
        const ues = new UES();
        let getsection = false;
        const subsections = ues.getProposalSubSections.call(this,proposalid,sectionid)
        if(subsections) {
            // eslint-disable-next-line
            subsections.map(subsection=> {
                if(subsection.subsectionid === subsectionid) {
                    getsection = subsection;
                }
            })
        }
        return getsection;
    }

    getProposalSubSections(proposalid,sectionid) {
        let subsections = false;
        const ues = new UES();
        const section = ues.getProposalSectionByID.call(this,proposalid,sectionid);
  
        if(section) {
            if(section.hasOwnProperty("subsections")) {
                subsections = section.subsections;
            }
        }

        return subsections;

    }

    getProposalSectionByID(proposalid, sectionid) {
        const ues = new UES();
        let getsection = false;
        const sections = ues.getProposalSections.call(this,proposalid)
        if(sections) {
            // eslint-disable-next-line
            sections.map(section=> {
                if(section.sectionid === sectionid) {
                    getsection = section;
                }
            })
        }

        return getsection;

    }

    getProposalSections(proposalid) {
        const ues = new UES();
        const proposal = ues.getProposalByID.call(this, proposalid)
        let getsections = false;
        if (proposal) {
            if (proposal.hasOwnProperty("sections")) {

                getsections = proposal.sections;

            }
        }

        return getsections;

    }

    getProposalKeyByID(proposalid) {

        let key = false;
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            // eslint-disable-next-line
            proposals.map((proposal, i) => {
                if (proposal.proposalid === proposalid) {
                    key = i;

                }
            })
        }

        return key;

    }

    getProposalByID(proposalid) {
        let getproposal = false;
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            // eslint-disable-next-line
            proposals.map(proposal => {
                if (proposal.proposalid === proposalid) {
                    getproposal = proposal;

                }
            })
        }

        return getproposal;

    }

    async loadProposals() {

        try {
            let response = await LoadProposals();
            if (response.hasOwnProperty("proposals")) {
                this.props.reduxProposals(response.proposals)
                this.setState({ render: 'render' })

            }

        } catch (err) {
            alert(err)
        }

    }

    getProposalsbyProjectID(projectid) {
        const ues = new UES();
        let getproposal = [];
        const proposals = ues.getProposals.call(this);
      
        if(proposals) {
            // eslint-disable-next-line
            proposals.map(proposal=> {
                if(proposal.projectid === projectid) {
                    getproposal.push(proposal)
                }
            })
        }
        if(getproposal.length === 0) {
            getproposal = false;
        }

        return getproposal;

    }

    getProposals() {
        let proposals = false;

        if (this.props.proposals) {
            if (this.props.proposals.hasOwnProperty("length")) {
                proposals = this.props.proposals;
            }
        }
        return proposals;
    }

    getProjects() {
        let projects = false;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                projects = this.props.projects;
            }
        }
        return projects;
    }

    getClientKey(clientid) {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let key = false;
        if (clients) {
            // eslint-disable-next-line
            clients.map((client, i) => {
                if (client.clientid === clientid) {

                    key = i;;

                }
            })
        }
        return key;
    }

    getClient(clientid) {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let getclient = false;
        if (clients) {
            // eslint-disable-next-line
            clients.map(client => {
                if (client.clientid === clientid) {

                    getclient = client;

                }
            })
        }
        return getclient;
    }

    getClients() {
        let clients = false;
        if (this.props.clients) {
            if (this.props.clients.hasOwnProperty("length")) {
                clients = this.props.clients;
                clients.sort((a, b) => {
                    if (a.lastname >= b.lastname) {
                        return 1;
                    } else {
                        return -1
                    }
                })
            }
        }


        return clients;
    }


}
export default UES;