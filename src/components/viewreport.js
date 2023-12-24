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

    showScope() {
        const report = this.getReport();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        let getlist = [];
        let getsublist = [];
        if (report.hasOwnProperty("list")) {
            // eslint-disable-next-line
            report.list.map(list => {


                getlist.push(<li key={list.listid}>{list.content}</li>)

                if (list.hasOwnProperty("sublist")) {
                    // eslint-disable-next-line
                    list.sublist.map(sublist => {

                        getsublist.push(<li key={sublist.sublistid}>{sublist.content}</li>)
                    })
                    getlist.push(<ol key={`reportsublist`} type="a">{getsublist}</ol>)


                }



            })
        }

        return (<ol style={{ ...styles.generalFont, ...regularFont }} key={`reportlist`} type="1">{getlist}</ol>)

    }

    showSection(label, section) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                <span style={{ ...regularFont, ...styles.marginLeft15 }}>{label}</span>
                <span style={{ ...regularFont, ...styles.leftMargin40 }}><u>{section.sectionname}</u></span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15, ...styles.lineSpace }}>
                <span style={{ ...regularFont }}>{section.content}</span>
            </div>

        </div>)

    }

    showPavementSection(pavement) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();


        return (
            <div style={{ ...styles.generalFlex }} key={pavement.sectionid}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder }}>
                    <span style={{ ...regularFont }}>{pavement.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}> {pavement.rvalue}</span>
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

    showPavementSections() {

        const ues = new UES();
        const projectid = this.props.projectid;
        let getsections = [];
        const pavements = ues.getPavementByProjectID.call(this, projectid);
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const titleBlock = () => {
            return (<div style={{ ...styles.generalFlex }} key={`pavemettitleblock`}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>Traffic Index (T.I)</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}> Asphalt Concrete Thickness </span>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}> Aggregate  Base Thickness </span>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}> Aggregate  SubBase Thickness </span>
                </div>

            </div>)
        }
        if (pavements) {
            // eslint-disable-next-line
            pavements.map(pavement => {
                getsections.push(this.showPavementSection(pavement))

                if (pavement.hasOwnProperty("design")) {

                    getsections.push(titleBlock())
                    // eslint-disable-next-line
                    pavement.design.map(section => {
                        getsections.push(this.showSectionDesign(section))
                    })
                }


            })


        }



        return getsections;
    }

    showPavementDesign() {
        const styles = MyStylesheet();
        const ues = new UES();
        const headerFont = ues.headerFont.call(this)
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={`pavementdesign`}>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <span style={{ ...styles.generalFont, ...headerFont, ...styles.boldFont }}>Pavement Design Alternatives</span>

            </div>

            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder }}>
                    <span style={{ ...regularFont }}>Section Name</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.showBorder, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}> RValue</span>
                </div>

            </div>

            {this.showPavementSections()}

            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.marginTop15 }}>
                <span style={{ ...regularFont }}>We emphasize that the performance of pavement is critically dependent upon uniform and adequate compaction of the soil subgrade,
                    as well as all engineered fill and utililty trench backfill within the limits of the pavements.
                    We recommend that final pavement subgrade preparation (i.e., scarification, moisture conditioning and compaction)
                    be performed after underground utility construction is completed and just prior to aggregate base. </span>

            </div>


        </div>)
    }

    showConclusionSections() {

        const report = this.getReport();
        let getSections = [];
        let label = "";
        if (report.hasOwnProperty("conclusion")) {
            // eslint-disable-next-line
            report.conclusion.map((section, i) => {

                if (i < 10) {
                    label = `3.${i + 1}`

                } else {
                    label = `3.${i + 1}`
                }
                getSections.push(this.showSection(label, section))

            })
        }
        return getSections;
    }

    showRecommedationSections() {

        const report = this.getReport();
        let getSections = [];
        let label = "";
        if (report.hasOwnProperty("recommendation")) {
            // eslint-disable-next-line
            report.recommendation.map((section, i) => {
                if (i < 10) {
                    label = `4.${i + 1}`

                } else {
                    label = `4.${i + 1}`
                }

                getSections.push(this.showSection(label, section))
                if (section.sectionname === 'Pavement Design') {
                    getSections.push(this.showPavementDesign())
                }

            })
        }
        return getSections;
    }

    showGeneralSections() {

        const report = this.getReport();
        let getSections = [];
        let label = "";
        if (report.hasOwnProperty("general")) {
            // eslint-disable-next-line
            report.general.map((section, i) => {

                if (i < 10) {
                    label = `1.${i + 1}`

                } else {
                    label = `1.${i + 1}`
                }
                getSections.push(this.showSection(label, section))

                if (section.sectionname === "Scope of Work") {
                    getSections.push(this.showScope())
                } else if (section.sectionname === "Figures and Appendix") {
                    getSections.push(this.showFigures())
                }

            })




        }

        return getSections;
    }

    showFigure(figure) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer }}>
            <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}>F{figure.figurenumber} </span>

                </div>
                <div style={{ ...styles.flex5 }}>
                    <span style={{ ...regularFont }}> {figure.figurename} </span>
                </div>
            </div>


        </div>)
    }

    showAppendix(appendix) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer }}>
            <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                <div style={{ ...styles.flex1 }}>
                    <span style={{ ...regularFont }}>A{appendix.appendixnumber} </span>

                </div>
                <div style={{ ...styles.flex5 }}>
                    <span style={{ ...regularFont }}> {appendix.appendixname} </span>
                </div>
            </div>


        </div>)
    }

    showFigures() {
        const ues = new UES();
        const reportid = this.props.reportid;
        const styles = MyStylesheet();
        const figures = ues.getFiguresbyReportID.call(this, reportid);
        const regularFont = ues.regularFont.call(this);
        const appendix = ues.getAppendixsbyReportID.call(this,reportid)
       
        let getfigures = [];
       
        if (figures) {

            getfigures.push(<div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <span style={{ ...regularFont }}><u>FIGURES</u></span>
            </div>
            )
            // eslint-disable-next-line
            figures.map(figure => {
                getfigures.push(this.showFigure(figure))


            })
        }

        if(appendix) {

            getfigures.push(<div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <span style={{ ...regularFont }}><u>Appendix</u></span>
            </div>
            )
// eslint-disable-next-line
            appendix.map(appendix => {
                getfigures.push(this.showAppendix(appendix))


            })
            
        }


        return getfigures;
    }

    showFindingSections() {

        const report = this.getReport();
        let getSections = [];
        let label = "";
        if (report.hasOwnProperty("finding")) {
            // eslint-disable-next-line
            report.finding.map((section, i) => {

                if (i < 10) {
                    label = `2.${i + 1}`

                } else {
                    label = `2.${i + 1}`
                }

                getSections.push(this.showSection(label, section))

            })
        }
        return getSections;
    }

    showConclusionHeader() {
        const report = this.getReport();
        const styles = MyStylesheet();
        const ues = new UES();
        const headerFont = ues.headerFont.call(this)
        if (report.hasOwnProperty("conclusion")) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <span style={{ ...styles.generalFont, ...headerFont }}>
                        3.0
                    </span>


                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.leftMargin40 }}>
                        CONCLUSION
                    </span>

                </div>)

        }

    }

    showRecommendationHeader() {
        const report = this.getReport();
        const styles = MyStylesheet();
        const ues = new UES();
        const headerFont = ues.headerFont.call(this)
        if (report.hasOwnProperty("recommendation")) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                    <span style={{ ...styles.generalFont, ...headerFont }}>
                        4.0
                    </span>


                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.leftMargin40 }}>
                        RECOMMENDATIONS
                    </span>

                </div>)

        }

    }

    showFindingHeader() {
        const report = this.getReport();
        const styles = MyStylesheet();
        const ues = new UES();
        const headerFont = ues.headerFont.call(this)
        if (report.hasOwnProperty("finding")) {
            return (
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <span style={{ ...styles.generalFont, ...headerFont }}>
                        2.0
                    </span>
                    <span style={{ ...styles.generalFont, ...headerFont, ...styles.leftMargin40 }}>
                        FINDINGS
                    </span>

                </div>)

        }

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

                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                                    <span style={{ ...headerFont }}>1.0</span>
                                    <span style={{ ...headerFont, ...styles.leftMargin40 }}>INTRODUCTION</span>
                                </div>

                                <div style={{ ...styles.bottomMargin15, ...styles.generalFont }}>
                                    <span style={{ ...regularFont }}>{report.intro}</span>
                                </div>

                            </div>


                            <div style={{ ...styles.generalContainer }}>
                                {this.showGeneralSections()}
                            </div>

                            {this.showFindingHeader()}

                            {this.showFindingSections()}

                            {this.showConclusionHeader()}

                            {this.showConclusionSections()}

                            {this.showRecommendationHeader()}

                            {this.showRecommedationSections()}


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