import { LoadClients, LoadProjects, LoadReport } from "./actions/api";

class UES {

    recommdationSections() {
        // 13002.01 13245.01 13232.01
        return([
            {section:'General'},
            {section:'Site Clearing'},
            {section:'Site Prepartion'},
            {section:'Engineered Fill Construction'},
            {section:'Subgrade Preparation'},
            {section:'Utility Trench Backfill'},
            {section:'Foundation Design'},
            {section:'Post-Tensioned Concrete Foundation/Slab Systems'},
            {section:'Perimeter Wall Systems'},
            {section:'Sound Wall Foundations'},
            {section:'Conventional Spread Foundations'},
            {section:'Drilled Pier Foundations'},
            {section:'Interior Floor Slab Support'},
            {section:'Floor Slab Moisture Penetration Resistance'},
            {section:'Exterior Flatwork'},
            {section:'Drought Considerations'},
            {section:'Retaining Walls'},
            {section:'Pavement Design'},
            {section:'Site Drainage'},
            {section:'Geotechnical Engineering Construction Observation Services'},
            {section:'Additional Services'}
            
            
        ])
    }

    conclusionSections() {

        return([
            {section:'Seismic Design Criteria'},
            {section:'Seismicity and Faults'},
            {section:'Liquefaction Potential'},
            {section:'Foundation Support'},
            {section:'Bearing Capacity'},
            {section:'Seismic Shear Wave Velocity and Seismic Site Class'},
            {section:'Liquefaction Analysis and Results'},
            {section:'Soil Expanisve Potential'},
            {section:'Soil Corrosion Potential'},
            {section:'Excavation Conditions'},
            {section:'Soil Suitablity for Engineered Fill Construction'},
            {section:'Pavement Subgrade Quality'},
            {section:'Groundwater Conditions and Seasonal Moisture'},
            {section:'Seasonal Water'},
            {section:'Percolation Tests'},
            {section:'Percolation Characteristics of the Subgrade Soils and Conclusions'},
            {section:'Infiltration Characteristics of the Subgrade Soils and Conclusions'}




        ])

    }

    generalSections() {
        return([
            {section:'Supplement Information'},
            {section:'Proposed Development'},
            {section:'Figures and Attachments'},
            {section:'Site Description'},
            {section:'Historical Aerial Photographs'},
            {section:'Site Geology'},
            {section:'Subsurface Conditions'},
            {section:'Groundwater Conditions'}



        ])
    }


    async loadReports(projectid) {
        const ues = new UES();
        let reports = ues.getReports.call(this)
        try {

            let response = await LoadReport(projectid);
            console.log(response)
            if(response.hasOwnProperty("reports")) {
                if(reports) {
                    // eslint-disable-next-line
                    response.reports.map(report=> {
                        reports.push(report)
                    })
                } else {
                    reports = response.reports;
                }
                this.props.reduxReports(reports);
               
            }

        } catch(err) {
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

    getReports() {
        let reports = false;
        if(this.props.reports) {
            if(this.props.reports.hasOwnProperty("length")) {
                reports = this.props.reports;
            }
        }
        return reports;
    }

    getListKeybyID(reportid,listid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid)
        let key = false;
   

           
            if(report.hasOwnProperty("list")) {
               // eslint-disable-next-line
                report.list.map((list,i)=> {
                    if(list.listid === listid) {
                       key= i;

                    }
                })
            }

       
        return key;
    }

    getSublistKeybyID(reportid,listid,sublistid) {
        const ues = new UES();
        const list = ues.getListbyID.call(this,reportid,listid);
        let key = false;
        if(list.hasOwnProperty("sublist")) {
            // eslint-disable-next-line
            list.sublist.map((sublist,i)=> {
                if(sublist.sublistid === sublistid) {
                    key = i;
                }
            })
        }
        return key;
    }

    getSublistbyID(reportid,listid,sublistid) {
        const ues = new UES();
        const list = ues.getListbyID.call(this,reportid,listid);
        let getsublist = false;
        if(list.hasOwnProperty("sublist")) {
            // eslint-disable-next-line
            list.sublist.map(sublist=> {
                if(sublist.sublistid === sublistid) {
                    getsublist= sublist;
                }
            })
        }
        return getsublist;
    }

    getListbyID(reportid,listid) {
        const ues = new UES();
        const report= ues.getReportByID.call(this,reportid)
        let getlist = false;
    

           
            if(report.hasOwnProperty("list")) {
               // eslint-disable-next-line
                report.list.map(list=> {
                    if(list.listid === listid) {
                        getlist = list;

                    }
                })
            }
       

   
        return getlist;
    }

    getListIDfromSublistID(reportid,sublistid) {
        const ues = new UES();
        let listid = false;
        const report = ues.getReportByID.call(this,reportid);
        if(report) {
            if(report.hasOwnProperty("list")) {
                // eslint-disable-next-line
                report.list.map(list=> {
                   
                    if(list.hasOwnProperty("sublist")) {
                        // eslint-disable-next-line
                        list.sublist.map(sublist=> {
                            if(sublist.sublistid === sublistid) {
                                listid = list.listid;
                            }
                        })
                    }
                })
            }
        }
        return listid;
    }

    getGeneralSectionKeybyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let key = false;
        if(report) {
            if(report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map((section,i)=> {
                    if(section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }

          
            
        }
        return key;
    }

    getGeneralSectionbyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let getsection = false;
        if(report) {
            if(report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map(section=> {
                    if(section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }

          
            
        }
        return getsection;
    }

    getConclusionSectionKeybyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let key = false;
        if(report) {
            if(report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.conclusion.map((section,i)=> {
                    if(section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }
    
          
            
        }
        return key;
    }
    
    getConclusionSectionbyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let getsection = false;
        if(report) {
            if(report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.conclusion.map(section=> {
                    if(section.sectionid === sectionid) {
                        getsection = section;
                    }
                })
            }
    
          
            
        }
        return getsection;
    }

    getRecommendationSectionKeybyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let key = false;
        if(report) {
            if(report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.recommendation.map((section,i)=> {
                    if(section.sectionid === sectionid) {
                        key = i;
                    }
                })
            }
    
          
            
        }
        return key;
    }
    
    getRecommendationSectionbyID(reportid,sectionid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this,reportid);
        let getsection = false;
        if(report) {
            if(report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.recommendation.map(section=> {
                    if(section.sectionid === sectionid) {
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
        if(reports) {
            // eslint-disable-next-line
            reports.map((report,i)=> {
                if(report.reportid === reportid) {
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
        if(reports) {
            // eslint-disable-next-line
            reports.map(report=> {
                if(report.reportid === reportid) {
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
        if(reports) {
        // eslint-disable-next-line
        reports.map(report=> {
            if(report.projectid === projectid) {
                getreports.push(report)

            }
        })
       
        if(getreports.length === 0) {
            getreports = false;
        }
    } else {
        getreports = false;
    }
        return getreports;
    }

    checkUser() {
        let myuser = false;
        if(this.props.myuser) {
            if(this.props.myuser.hasOwnProperty("userid")) {
                myuser = this.props.myuser;
            }
        }
        return myuser;
    }

    getLoginButton() {

        if (this.state.width > 1200) {
            return({width:'340px', height:'auto'})

        } else if (this.state.width > 600) {

            return({width:'240px', height:'auto'})

        } else {

            return({width:'200px', height:'auto'})

        }

    }

    removeIcon() {

        if(this.state.width>1200) {
            return({width:'50px', height:'auto'})

        } else if (this.state.width>600) {
            return({width:'40px', height:'auto'})

        } else {
            return({width:'30px', height:'auto'})

        }

    }

    arrowUp() {
        if(this.state.width>1200) {
            return({width:'50px', height:'auto'})

        } else if (this.state.width > 600) {
            return({width:'40px', height:'auto'})

        } else {
            return({width:'30px', height:'auto'})

        }
    }

    generateIcon() {
        if(this.state.width>1200) {
            return({width:'200px', height:'auto'})

        } else if (this.state.width > 600) {
            return({width:'160px', height:'auto'})

        } else {
            return({width:'120px', height:'auto'})

        }
    }


    arrowWidth() {

        if(this.state.width>1200) {
            return({width:'200px', height:'auto'})

        } else if (this.state.width>600) {
            return({width:'150px', height:'auto'})

        } else {
            return({width:'100px', height:'auto'})

        }

    }

    hugeFont() {
        if(this.state.width>1200) {
            return({fontSize:'42px'})

        } else if (this.state.width>600) {
            return({fontSize:'36px'})

        } else {
            return({fontSize:'30px'})

        }

        
    }

    headerFont() {

        if(this.state.width>1200) {
            return({fontSize:'36px'})

        } else if (this.state.width>600) {
            return({fontSize:'30px'})

        } else {
            return({fontSize:'24px'})

        }

    }
    checkBox() {
        return({width:'33px', height:'auto'})
    }
    regularFont() {

        if(this.state.width>1200) {
            return({fontSize:'30px'})

        } else if (this.state.width>600) {
            return({fontSize:'24px'})

        } else {
            return({fontSize:'20px'})

        }

    }

    getProjectKeybyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let key = false;
        if(projects) {
            // eslint-disable-next-line
            projects.map((project,i)=> {
                if(project.projectid === projectid) {
                    key = i
                }
            })
        }
        return key;
    }

    getProjectbyID(projectid) {
        const ues = new UES();
        const projects = ues.getProjects.call(this);
        let getproject = false;
        if(projects) {
            // eslint-disable-next-line
            projects.map(project=> {
                if(project.projectid === projectid) {
                    getproject = project;
                }
            })
        }
        return getproject;
    }

    getProjects() {
        let projects = false;
        if(this.props.projects) {
            if(this.props.projects.hasOwnProperty("length")) {
                projects = this.props.projects;
            }
        }
        return projects;
    }

    getClientKey(clientid) {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let key = false;
        if(clients) {
            // eslint-disable-next-line
            clients.map((client,i)=> {
                if(client.clientid === clientid) {

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
        if(clients) {
            // eslint-disable-next-line
            clients.map(client=> {
                if(client.clientid === clientid) {

                    getclient = client;

                }
            })
        }
        return getclient;
    }

    getClients() {
        let clients = false;
        if(this.props.clients) {
            if(this.props.clients.hasOwnProperty("length")) {
                clients = this.props.clients;
            }
        }

        return clients;
    }


}
export default UES;