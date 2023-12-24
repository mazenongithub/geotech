

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { MyStylesheet } from './styles';
import { formatDateReport, newFigure, newAppendix } from './functions';
import { Link } from "react-router-dom";
import { removeIcon, saveIcon } from './svg';
import MakeID from './makeids';

class Figures extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activefigureid: false, activeappendixid: false, figurenumber: '', figurename: '', appendixnumber: '', appendixname: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const projectid = this.props.projectid;
        const report = ues.getReportsByProjectID.call(this, projectid)
        if (!projects) {
            ues.loadProjects.call(this);
        }



        if (!report) {
            ues.loadReports.call(this, projectid)
        }




    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    showFigureIDS() {
        const ues = new UES();
        let figureids = [];
        const reportid = this.props.reportid;
        const figures = ues.getFiguresbyReportID.call(this, reportid)
        if (figures) {
            // eslint-disable-next-line
            figures.map(figure => {
                figureids.push(this.showFigureID(figure))
            })
        }

        return figureids;

    }

    removeFigure(figureid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        const reportid = this.props.reportid;
        const report = ues.getReportByID.call(this, reportid);
        if (report) {
            const i = ues.getReportKeyByID.call(this, reportid)
            const figure = ues.getFigurebyID.call(this, reportid, figureid)
            if (figure) {
                const j = ues.getFigureKeybyID.call(this, reportid, figureid)
                reports[i].figures.splice(j, 1)
                this.props.reduxReports(reports)
                this.setState({ activefigureid: false })
            }
        }

    }

    handleFigureID(figureid) {
        if (!this.state.activefigureid) {
            this.setState({ activefigureid: figureid })
        } else {
            this.setState({ activefigureid: false })
        }
    }

    showFigureID(figure) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)

        const highlight = (figureid) => {
            if (this.state.activefigureid === figureid) {
                return (styles.activeid)
            }
        }

        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={figure.figureid}>
            <div style={{ ...styles.flex5 }}>

                <span style={{ ...styles.generalFlex, ...regularFont, ...highlight(figure.figureid) }}
                    onClick={() => { this.handleFigureID(figure.figureid) }}> Figure Number: {figure.figurenumber} Figure Name: {figure.figurename}</span>

            </div>
            <div style={{ ...styles.flex1 }}>
                <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeFigure(figure.figureid) }}>{removeIcon()}</button>
            </div>
        </div>)
    }

    getFigureNumber() {
        const ues = new UES();
        let figurenumber = "";
        if (this.state.activefigureid) {
            const reportid = this.props.reportid;
            const figureid = this.state.activefigureid;
            const figure = ues.getFigurebyID.call(this, reportid, figureid)

            figurenumber = figure.figurenumber;

        }
        return figurenumber;
    }

    handleFigureNumber(value) {
        const ues = new UES();
        const makeid = new MakeID();

        let reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.props.reportid;

            const report = ues.getReportByID.call(this, reportid)
            if (report) {

                const i = ues.getReportKeyByID.call(this, reportid)

                if (this.state.activefigureid) {
                    let figureid = this.state.activefigureid;
                    const figure = ues.getFigurebyID.call(this, reportid, figureid)
                    if (figure) {
                        console.log(figure)
                        const j = ues.getFigureKeybyID.call(this, reportid, figureid)
                        reports[i].figures[j].figurenumber = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })


                    }


                } else {

                    let figureid = makeid.figureID.call(this, reportid)
                    let figurename = this.state.figurename;
                    const newfigure = newFigure(figureid, value, figurename)
                    if (report.hasOwnProperty("figures")) {
                        reports[i].figures.push(newfigure)

                    } else {
                        reports[i].figures = [newfigure]
                    }

                    this.setState({ activefigureid: figureid })
                }





            }


        }
    }


    getFigureName() {
        const ues = new UES();
        let figurename = "";
        if (this.state.activefigureid) {
            const reportid = this.props.reportid;
            const figureid = this.state.activefigureid;
            const figure = ues.getFigurebyID.call(this, reportid, figureid)

            figurename = figure.figurename;

        }
        return figurename;
    }

    handleFigureName(value) {
        const ues = new UES();
        const makeid = new MakeID();

        let reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.props.reportid;

            const report = ues.getReportByID.call(this, reportid)
            if (report) {

                const i = ues.getReportKeyByID.call(this, reportid)

                if (this.state.activefigureid) {
                    let figureid = this.state.activefigureid;
                    const figure = ues.getFigurebyID.call(this, reportid, figureid)
                    if (figure) {
                        console.log(figure)
                        const j = ues.getFigureKeybyID.call(this, reportid, figureid)
                        reports[i].figures[j].figurename = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })


                    }


                } else {

                    let figureid = makeid.figureID.call(this, reportid)
                    let figurenumber = this.state.figurenumber;
                    const newfigure = newFigure(figureid, figurenumber, value)
                    if (report.hasOwnProperty("figures")) {
                        reports[i].figures.push(newfigure)

                    } else {
                        reports[i].figures = [newfigure]
                    }

                    this.setState({ activefigureid: figureid })
                }





            }


        }
    }




    showAppendixIDS() {
        const ues = new UES();
        let appendixids = [];
        const reportid = this.props.reportid;
        const appendixs = ues.getAppendixsbyReportID.call(this, reportid)
        if (appendixs) {
            // eslint-disable-next-line
            appendixs.map(appendix => {
                appendixids.push(this.showAppendixID(appendix))
            })
        }

        return appendixids;

    }


    showAppendixID(appendix) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)

        const highlight = (appendixid) => {
            if (this.state.activeappendixid === appendixid) {
                return (styles.activeid)
            }
        }

        return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={appendix.appendixid}>
            <div style={{ ...styles.flex5 }}>

                <span style={{ ...styles.generalFlex, ...regularFont, ...highlight(appendix.appendixid) }}
                    onClick={() => { this.handleAppendixID(appendix.appendixid) }}> Appendix Number: {appendix.appendixnumber} Appendix Name: {appendix.appendixname}</span>

            </div>
            <div style={{ ...styles.flex1 }}>
                <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeAppendix(appendix.appendixid) }}>{removeIcon()}</button>
            </div>
        </div>)
    }

    removeAppendix(appendixid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        const reportid = this.props.reportid;
        const report = ues.getReportByID.call(this, reportid);
        if (report) {
            const i = ues.getReportKeyByID.call(this, reportid)
            const appendix = ues.getAppendixbyID.call(this, reportid, appendixid)
            if (appendix) {
                const j = ues.getAppendixKeybyID.call(this, reportid, appendixid)
                reports[i].appendix.splice(j, 1)
                this.props.reduxReports(reports)
                this.setState({ activeappendixid: false })
            }
        }

    }

    handleAppendixID(appendixid) {
        if (!this.state.activeappendixid) {
            this.setState({ activeappendixid: appendixid })
        } else {
            this.setState({ activeappendixid: false })
        }
    }


    getAppendixNumber() {
        const ues = new UES();
        let appendixnumber = "";
        if (this.state.activeappendixid) {
            const reportid = this.props.reportid;
            const appendixid = this.state.activeappendixid;
            const appendix = ues.getAppendixbyID.call(this, reportid, appendixid)

            appendixnumber = appendix.appendixnumber;

        }
        return appendixnumber;
    }

    handleAppendixNumber(value) {
        const ues = new UES();
        const makeid = new MakeID();

        let reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.props.reportid;

            const report = ues.getReportByID.call(this, reportid)
            if (report) {

                const i = ues.getReportKeyByID.call(this, reportid)

                if (this.state.activeappendixid) {
                    let appendixid = this.state.activeappendixid;
                    const appendix = ues.getAppendixbyID.call(this, reportid, appendixid)
                    if (appendix) {

                        const j = ues.getAppendixKeybyID.call(this, reportid, appendixid)
                        reports[i].appendix[j].appendixnumber = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })


                    }


                } else {

                    let appendixid = makeid.appendixID.call(this, reportid)
                    let appendixname = this.state.appendixname;
                    const newappendix = newAppendix(appendixid, value, appendixname)
                    if (report.hasOwnProperty("appendix")) {
                        reports[i].appendix.push(newappendix)

                    } else {
                        reports[i].appendix = [newappendix]
                    }

                    this.setState({ activeappendixid: appendixid })
                }





            }


        }
    }


    getAppendixName() {
        const ues = new UES();
        let appendixname = "";
        if (this.state.activeappendixid) {
            const reportid = this.props.reportid;
            const appendixid = this.state.activeappendixid;
            const appendix = ues.getAppendixbyID.call(this, reportid, appendixid)

            appendixname = appendix.appendixname;

        }
        return appendixname;
    }

    handleAppendixName(value) {
        const ues = new UES();
        const makeid = new MakeID();

        let reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.props.reportid;

            const report = ues.getReportByID.call(this, reportid)
            if (report) {

                const i = ues.getReportKeyByID.call(this, reportid)

                if (this.state.activeappendixid) {
                    let appendixid = this.state.activeappendixid;
                    const appendix = ues.getAppendixbyID.call(this, reportid, appendixid)
                    if (appendix) {

                        const j = ues.getAppendixKeybyID.call(this, reportid, appendixid)
                        reports[i].appendix[j].appendixname = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })


                    }


                } else {

                    let appendixid = makeid.appendixID.call(this, reportid)
                    let appendixnumber = this.state.appendixnumber;
                    const newappendix = newAppendix(appendixid, appendixnumber, value)
                    if (report.hasOwnProperty("appendix")) {
                        reports[i].appendix.push(newappendix)

                    } else {
                        reports[i].appendix = [newappendix]
                    }

                    this.setState({ activeappendixid: appendixid })
                }





            }


        }
    }


    render() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        if (myuser) {

            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)

            if (project) {
                const reportid = this.props.reportid;
                const report = ues.getReportByID.call(this, reportid);
                if (report) {
                    return (<div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>

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
                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/report/${reportid}/figures`}>
                                /Figures and Appendix </Link>
                        </div>


                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}><u>FIGURES</u></span>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                                        value={this.getFigureNumber()}
                                        onChange={event => { this.handleFigureNumber(event.target.value) }}
                                    />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Figure Number </span>
                            </div>
                            <div style={{ ...styles.flex5, ...styles.addMargin }}>

                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                                        value={this.getFigureName()}
                                        onChange={event => { this.handleFigureName(event.target.value) }} />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Figure Name </span>
                            </div>

                        </div>

                        {this.showFigureIDS()}



                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}><u>APPENDIX</u></span>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1, ...styles.addMargin }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                                        value={this.getAppendixNumber()}
                                        onChange={event => { this.handleAppendixNumber(event.target.value) }}
                                    />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Appendix Number </span>
                            </div>
                            <div style={{ ...styles.flex5, ...styles.addMargin }}>

                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalField, ...regularFont }}
                                        value={this.getAppendixName()}
                                        onChange={event => { this.handleAppendixName(event.target.value) }}
                                    />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Appendix Name </span>
                            </div>

                        </div>

                        {this.showAppendixIDS()}


                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { ues.saveReport.call(this) }}>{saveIcon()}</button>
                        </div>




                    </div>)


                } else {

                    return (<div style={{ ...styles.generalContainer }}>

                        <span style={{ ...styles.generalFont, ...regularFont }}>Report Not Found</span>
                    </div>)

                }


            } else {

                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found</span>
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
        projects: state.projects,
        reports: state.reports
    }
}

export default connect(mapStateToProps, actions)(Figures);



