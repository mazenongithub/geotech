import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { formatDateReport } from './functions'


class ViewReport extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activereportid: false, intro: '', activelistid: false, activesublistid: false, activegeneralid: false, activeconclusionid: false, activerecommendationid: false, content: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const clients = ues.getClients.call(this);
        const projectid = this.props.projectid;
        const report = ues.getReportsByProjectID.call(this, projectid)
        if (!projects) {
            ues.loadProjects.call(this);
        }

        if (!clients) {
            ues.loadClients.call(this)
        }

        if (!report) {
            ues.loadReports.call(this, projectid)
        }

        const pavement = ues.getPavement.call(this);
        if (!pavement) {
            ues.loadPavement.call(this)
        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    getProjectBlock() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        if (project) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>

                    <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont, ...styles.boldFont }}>{project.title}</span></div>
                    <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{project.address}</span></div>
                    <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{project.city}, {project.projectstate}</span></div>


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
                        <div style={{ ...styles.generalContainer }}><span style={{ ...regularFont }}>{client.city},{client.contactstate} {client.zipcode}</span> </div>
                    </div>



                )
            }
        }
    }

    getReport() {
        const ues = new UES();
        const reportid = this.props.reportid;
        const report = ues.getReportByID.call(this, reportid)
        return report;
    }

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

    showChapter(label, chapter) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <span style={{ ...regularFont }}>{label}</span>
                <span style={{ ...regularFont, ...styles.marginLeft15 }}><u>{chapter.chaptername}</u></span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.lineSpace }}>
                <span style={{ ...regularFont }}>{chapter.content}</span>
            </div>

        </div>)

    }

    showSubSection(label, section) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.leftMargin40 }}>
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
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.marginLeft15 }}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <span style={{ ...regularFont }}>{label}</span>
                <span style={{ ...regularFont, ...styles.marginLeft15 }}><u>{section.sectionname}</u></span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.lineSpace }}>
                <span style={{ ...regularFont }}>{section.content}</span>
            </div>

        </div>)

    }



    showSectionDesign(section) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        return (<div style={{ ...styles.generalFlex }} key={section.pavementid}>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                <span style={{ ...regularFont }}>{section.ti}</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                <span style={{ ...regularFont }}> {section.ac}"</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                <span style={{ ...regularFont }}> {section.ab}"</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                <span style={{ ...regularFont }}> {section.as}"</span>
            </div>

        </div>)

    }



    showPavementTables() {

        const ues = new UES();
        let getsections = [];
        const projectid = this.props.projectid;
        const pavements = ues.getPavementByProjectID.call(this, projectid);
        if (pavements) {
            // eslint-disable-next-line
            pavements.map(pavement => {
                getsections.push(this.showPavementTable(pavement))



            })


        }

        return getsections;

    }
    showPavementTable(pavement) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)

        const escapeZero = (val) => {
            if(Number(val) === 0) {
                val = '-'
            } else {
                val = Number(val)
            }
            return val;
        }

        const showDesignRow = (design) => {
            return (<tr>
                <td width="29%" style={{ ...styles.alignCenter }}>{escapeZero(design.ac)}</td>
                <td width="32%" style={{ ...styles.alignCenter }}>{escapeZero(design.ab)}</td>
                <td width="39%" style={{ ...styles.alignCenter }}>{escapeZero(design.pcc)}</td>
            </tr>)
        }

        const showDesign = (service) => {
            let getdesgin = [];
            if (service.hasOwnProperty("design")) {
                // eslint-disable-next-line
                service.design.map(pavement => {
                    getdesgin.push(showDesignRow(pavement))
                })
            }
            return getdesgin;

        }

        const showservicerows = (pavement) => {
            let getrows = [];
            if (pavement.hasOwnProperty("services")) {
                // eslint-disable-next-line
                pavement.services.map(service => {

                    getrows.push
                        (<tr>
                            <td style={{ ...styles.alignCenter }}><div style={{...styles.generalFont}}><span style={{...regularFont}}>{service.ti}</span></div></td>
                            <td style={{ ...styles.alignCenter }}><div>{service.servicetype}</div></td>
                            <td colspan="3">
                                <table width="99%" border="0" cellpadding="3">
                                    <tbody>
                                    {showDesign(service)}
                                    </tbody>
                                </table></td>
                        </tr>)


                })

            }

            return getrows;
        }

        let tablerows = [];
        if (pavement.hasOwnProperty("services")) {
            // eslint-disable-next-line
            pavement.services.map(service => {
                console.log(service)
                tablerows.push(showservicerows(service))
            })
        }


        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <table width="99%" border="1" cellpadding="3" style={{...styles.generalFont, ...regularFont}}>
                    <tbody>
                        <tr>
                            <td width="11%" rowspan="2" style={{ ...styles.alignCenter }}><div>Traffic Index</div></td>
                            <td width="40%" rowspan="2" style={{ ...styles.alignCenter }}><div>Pavement Use</div></td>
                            <td colspan="3" style={{ ...styles.alignCenter }}>
                                <div>{pavement.sectionname}</div>
                                <div>RValue={pavement.rvalue}</div>

                            </td>
                        </tr>
                        <tr>
                            <td width="16%" style={{ ...styles.alignCenter }}><div>Type A Asphalt Concrete (inches)</div></td>
                            <td width="17%" style={{ ...styles.alignCenter }}><div>Class 2 Aggregate Base (inches)</div></td>
                            <td width="16%" style={{ ...styles.alignCenter }}><div>Portland Cement Concrete (inches)</div></td>
                        </tr>
                        {showservicerows(pavement)}
                    </tbody>
                </table>
            </div>)
    }




    showReport() {

        const report = this.getReport();
        let getreport = [];
        if (report) {
            if (report.hasOwnProperty("chapters")) {
                // eslint-disable-next-line
                report.chapters.map((chapter, i) => {

                    let label = Number(i + 1).toFixed(1)
                    getreport.push(this.showChapter(label, chapter))

                    if (chapter.hasOwnProperty("sections")) {
                        // eslint-disable-next-line
                        chapter.sections.map((section, j) => {

                            let label_1 = `${Number(i + 1)}.${Number(j + 1)}`
                            getreport.push(this.showSection(label_1, section))

                            if (section.sectionname === 'Pavement Design') {
                                getreport.push(this.showPavementTables())
                            }

                            if (section.hasOwnProperty("list")) {

                                getreport.push(this.showList(section.list))

                            }


                            if (section.hasOwnProperty("subsections")) {
                                // eslint-disable-next-line
                                section.subsections.map((subsection, k) => {

                                    let label_2 = `${Number(i + 1)}.${Number(j + 1)}.${Number(k + 1)}`

                                    getreport.push(this.showSubSection(label_2, subsection))

                                })



                            }



                        })



                    }



                })



            }



        }
        return getreport;



    }






    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const myuser = ues.checkUser.call(this)
        if (myuser) {

            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
                const reportid = this.props.reportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {

                    return (
                        <div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>
                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                                    /Projects </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                    /{project.projectnumber} {project.title} </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/report`}>
                                    /Report </Link>
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/report/${reportid}`}>
                                    /{formatDateReport(report.datereport)} </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.generalContainer }}>{this.getClientBlock()}</div>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                {this.getProjectBlock()}
                            </div>

                            <div style={{ ...styles.generalContainer }}>
                                {this.showReport()}
                            </div>







                        </div>
                    )

                }

                else {
                    return (<div style={{ ...styles.generalContainer }}>

                        <span style={{ ...styles.generalFont, ...regularFont }}>Report Not found</span>
                    </div>)
                }





            } else {

                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>No Project Found </span>
                </div>)
            }

        } else {

            return (<div style={{ ...styles.generalContainer }}>

                <span style={{ ...styles.generalFont, ...regularFont }}>No User Found</span>
            </div>)

        }
    }

}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        clients: state.clients,
        projects: state.projects,
        reports: state.reports,
        pavement: state.pavement
    }
}

export default connect(mapStateToProps, actions)(ViewReport);