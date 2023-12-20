import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { arrowUp, generateIcon, removeIcon, saveIcon, arrowDown, linkArrow } from './svg';
import { formatDateReport, currentDate, newReport, newList, newSublist, newSection } from './functions'
import MakeID from './makeids';



class Report extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activereportid: false, intro: '', activelistid: false, activesublistid: false, activegeneralid: false, activeconclusionid: false, activerecommendationid: false, activefindingid: false, content: ''

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


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    loadRecommendationSections() {

        const ues = new UES();
        const sections = ues.recommdationSections();
        let getsections = [];
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                getsections.push(this.showOptionValue(section))

            })

        }
        return getsections;

    }

    loadConclusionSections() {

        const ues = new UES();
        const sections = ues.conclusionSections();
        let getsections = [];
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                getsections.push(this.showOptionValue(section))

            })

        }
        return getsections;

    }

    loadGeneralSections() {
        const ues = new UES();
        const sections = ues.generalSections();
        let getsections = [];
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                getsections.push(this.showOptionValue(section))

            })

        }
        return getsections;
    }

    showOptionValue(section) {
        return (<option key={section.section} value={section.section}>{section.section}</option>)
    }

    showReports() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const reports = ues.getReportsByProjectID.call(this, projectid);
        let getreports = [];
        if (reports) {
            // eslint-disable-next-line
            reports.map(report => {

                getreports.push(this.showReport(report))

            })
        }
        return getreports;

    }

    handleReportID(reportid) {
        if (this.state.activereportid) {
            this.setState({ activereportid: false })
        } else {
            this.setState({ activereportid: reportid })
        }
    }

    removeReport(reportid) {
        const ues = new UES();
        const report = ues.getReportByID.call(this, reportid)
        const reports = ues.getReports.call(this)
        if (report) {
            const i = ues.getReportKeyByID.call(this, reportid)
            reports.splice(i, 1);
            this.props.reduxReports(reports)
            this.setState({ activereportid: false })

        }

    }

    showReport(report) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)
        const projectid = this.props.projectid;
        const headerFont = ues.headerFont.call(this)
        const myuser = ues.checkUser.call(this)
        const arrowWidth = ues.arrowWidth.call(this)
        const highlight = (reportid) => {
            if (this.state.activereportid === reportid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={report.reportid}>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...highlight(report.reportid) }}>
                        <span style={{ ...regularFont }} onClick={() => { this.handleReportID(report.reportid) }}>{formatDateReport(report.datereport)}</span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeReport(report.reportid) }}>{removeIcon()}</button>
                    </div>

                </div>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/report/${report.reportid}`}><button style={{ ...styles.generalButton, ...arrowWidth }}>{linkArrow()}</button> View Report </Link>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/report/${report.reportid}/figures`}><button style={{ ...styles.generalButton, ...arrowWidth }}>{linkArrow()}</button> Figures/Appendix </Link>
                    </div>
                </div>

            </div>)
    }

    getDateReport() {
        const ues = new UES();
        let datereport = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                datereport = report.datereport;
            }
        } else {
            datereport = currentDate()
        }

        return datereport;

    }

    handleDateReport(value) {
        const ues = new UES();
        let reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;


            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                reports[i].datereport = value;
                this.props.reduxReports(reports)
                this.setState({ render: 'render' })
            }

        } else {
            const makeid = new MakeID();
            const reportid = makeid.reportid.call(this)
            const projectid = this.props.projectid;
            const intro = this.state.intro;
            const newreport = newReport(reportid, projectid, value, intro)

            if (reports) {
                reports.push(newreport)

            } else {
                reports = [newreport]

            }
            this.setState({ activereportid: reportid })

        }

    }

    getIntro() {
        const ues = new UES();
        let intro = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                intro = report.intro;
            }
        }

        return intro;

    }

    handleIntro(value) {
        const ues = new UES();
        let reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;


            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                reports[i].intro = value;
                this.props.reduxReports(reports)
                this.setState({ render: 'render' })
            }

        } else {
            const makeid = new MakeID();
            const reportid = makeid.reportid.call(this)
            const projectid = this.props.projectid;
            const datereport = this.getDateReport()
            const newreport = newReport(reportid, projectid, datereport, value)

            if (reports) {
                reports.push(newreport)

            } else {
                reports = [newreport]

            }
            this.setState({ activereportid: reportid })

        }

    }

    handlelistid(listid) {
        if (this.state.activelistid) {
            this.setState({ activelistid: false, activesublistid: false })
        } else {
            this.setState({ activelistid: listid })
        }
    }

    handlesublistid(sublistid) {
        const ues = new UES();
        if (this.state.activereportid) {


            if (this.state.activesublistid) {
                this.setState({ activesublistid: false })
            } else {
                const reportid = this.state.activereportid;
                const listid = ues.getListIDfromSublistID.call(this, reportid, sublistid)
                this.setState({ activesublistid: sublistid, activelistid: listid })
            }

        }
    }


    showLists() {
        const ues = new UES();
        let getlist = [];
        let getsublist = [];
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid);

            if (report) {
                if (report.hasOwnProperty("list")) {
                    // eslint-disable-next-line
                    report.list.map(list => {

                        getlist.push(this.showList(list))

                        if (list.hasOwnProperty("sublist")) {
                            // eslint-disable-next-line
                            list.sublist.map(sublist => {
                                getsublist.push(this.showsublist(sublist))
                            })
                            getlist.push(<ol key={`reportsublist`} type="a">{getsublist}</ol>)


                        }



                    })



                }
            }
        }

        return (<ol key={`reportlist`} type="1">{getlist}</ol>)

    }

    removeList(listid) {
        const ues = new UES();
        const reports = ues.getReports.call(this);
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                const list = ues.getListbyID.call(this, reportid, listid)
                if (list) {
                    const j = ues.getListKeybyID.call(this, reportid, listid)
                    reports[i].list.splice(j, 1)
                    this.props.reduxReports(reports)
                    this.setState({ activelistid: false, activesublistid: false })
                }
            }
        }

    }

    movelistup(listid) {
        const ues = new UES();
        const report = this.getReport();
        const reports = ues.getReports.call(this)
        if (report) {
            const reportid = this.state.activereportid;
            const i = ues.getReportKeyByID.call(this, reportid)
            const list = ues.getListbyID.call(this, reportid, listid)
            if (list) {
                const j = ues.getListKeybyID.call(this, reportid, listid)
                if (report.list.length > 1 && j > 0) {
                    const list_1 = reports[i].list[j - 1]
                    reports[i].list[j] = list_1;
                    reports[i].list[j - 1] = list;
                    this.props.reduxReports(reports);
                    this.setState({ render: 'render' })
                }
            }
        }
    }

    movelistdown(listid) {
        const ues = new UES();
        const report = this.getReport();
        const reports = ues.getReports.call(this)
        if (report) {
            const reportid = this.state.activereportid;
            const i = ues.getReportKeyByID.call(this, reportid)
            const list = ues.getListbyID.call(this, reportid, listid)
            if (list) {
                const j = ues.getListKeybyID.call(this, reportid, listid)
                const listcount = report.list.length;
                if (listcount > 1 && j < listcount - 1) {
                    const list_1 = reports[i].list[j + 1]
                    reports[i].list[j] = list_1;
                    reports[i].list[j + 1] = list;
                    this.props.reduxReports(reports);
                    this.setState({ render: 'render' })
                }
            }
        }
    }

    showList(list) {
        const ues = new UES();
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this);
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)
        const highlight = (listid) => {
            if (this.state.activelistid === listid) {
                return (styles.activeid)
            }
        }

        return (<li style={{ ...styles.bottomMargin15 }} key={list.listid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex3 }}><span style={{ ...styles.generalFont, ...regularFont, ...highlight(list.listid) }} onClick={() => { this.handlelistid(list.listid) }}>{list.content}</span></div>

                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.movelistup(list.listid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.movelistdown(list.listid) }}>{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...iconWidth, ...styles.leftMargin40 }} onClick={() => { this.removeList(list.listid) }}>{removeIcon()}</button>
                </div>

            </div>


        </li>)

    }

    removeSubbList(sublistid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid);
            if (report) {

                const i = ues.getReportKeyByID.call(this, reportid)

                const listid = ues.getListIDfromSublistID.call(this, reportid, sublistid)
                const list = ues.getListbyID.call(this, reportid, listid)
                if (list) {

                    const j = ues.getListKeybyID.call(this, reportid, listid);
                    const sublist = ues.getSublistbyID.call(this, reportid, listid, sublistid)

                    if (sublist) {
                        const k = ues.getSublistKeybyID.call(this, reportid, listid, sublistid)
                        reports[i].list[j].sublist.splice(k, 1)
                        this.setState({ activesublistid: false })
                    }


                }



            }
        }
    }

    movesublistup(sublistid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        const report = this.getReport();
        if (report) {
            const reportid = this.state.activereportid;
            const i = ues.getReportKeyByID.call(this, reportid)
            const listid = ues.getListIDfromSublistID.call(this, reportid, sublistid)
            const list = ues.getListbyID.call(this, reportid, listid);
            if (list) {
                const j = ues.getListKeybyID.call(this, reportid, listid)
                const sublist = ues.getSublistbyID.call(this, reportid, listid, sublistid)
                if (sublist) {
                    const k = ues.getSublistKeybyID.call(this, reportid, listid, sublistid)
                    const listcount = reports[i].list[j].sublist.length;
                    if (listcount > 1 && k > 0) {
                        const sublist_1 = reports[i].list[j].sublist[k - 1];
                        reports[i].list[j].sublist[k] = sublist_1;
                        reports[i].list[j].sublist[k - 1] = sublist;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }

                }
            }
        }

    }

    movesublistdown(sublistid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        const report = this.getReport();
        if (report) {
            const reportid = this.state.activereportid;
            const i = ues.getReportKeyByID.call(this, reportid)
            const listid = ues.getListIDfromSublistID.call(this, reportid, sublistid)
            const list = ues.getListbyID.call(this, reportid, listid);
            if (list) {
                const j = ues.getListKeybyID.call(this, reportid, listid)
                const sublist = ues.getSublistbyID.call(this, reportid, listid, sublistid)
                if (sublist) {
                    const k = ues.getSublistKeybyID.call(this, reportid, listid, sublistid)
                    const listcount = reports[i].list[j].sublist.length;
                    if (listcount > 1 && k < listcount - 1) {
                        const sublist_1 = reports[i].list[j].sublist[k + 1];
                        reports[i].list[j].sublist[k] = sublist_1;
                        reports[i].list[j].sublist[k + 1] = sublist;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }

                }
            }
        }

    }

    showsublist(sublist) {
        const ues = new UES();
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)
        const highlight = (sublistid) => {
            if (this.state.activesublistid === sublistid) {
                return (styles.activeid)
            }
        }
        return (<li key={sublist.sublistid} style={{ ...styles.bottomMargin15 }}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex3 }}>
                    <span style={{ ...styles.generalFont, ...regularFont, ...highlight(sublist.sublistid) }} onClick={() => { this.handlesublistid(sublist.sublistid) }}>{sublist.content}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.movesublistup(sublist.sublistid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.movesublistdown(sublist.sublistid) }}>{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...iconWidth, ...styles.leftMargin40 }} onClick={() => { this.removeSubbList(sublist.sublistid) }}>{removeIcon()}</button>
                </div>
            </div>



        </li>)
    }

    getSublist() {
        const ues = new UES();
        let getsublist = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const listid = this.state.activelistid;
            if (this.state.activesublistid) {
                const sublistid = this.state.activesublistid;
                const sublist = ues.getSublistbyID.call(this, reportid, listid, sublistid)
                getsublist = sublist.content;
            }
        }
        return getsublist;

    }

    handleSublist(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid);
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activelistid) {

                    const listid = this.state.activelistid;
                    const list = ues.getListbyID.call(this, reportid, listid)
                    if (list) {
                        const j = ues.getListKeybyID.call(this, reportid, listid)
                        if (this.state.activesublistid) {
                            const sublistid = this.state.activesublistid;
                            const sublist = ues.getSublistbyID.call(this, reportid, listid, sublistid);
                            if (sublist) {
                                const k = ues.getSublistKeybyID.call(this, reportid, listid, sublistid)

                                reports[i].list[j].sublist[k].content = value
                                this.props.reduxReports(reports)
                                this.setState({ render: 'render' })
                            }



                        } else {

                            const sublistid = makeid.sublistid.call(this);
                            const newsublist = newSublist(sublistid, value)

                            if (list.hasOwnProperty("sublist")) {
                                reports[i].list[j].sublist.push(newsublist)

                            } else {
                                reports[i].list[j].sublist = [newsublist]
                            }
                            this.setState({ activesublistid: sublistid })


                        }
                    }
                }
            }
        }

    }

    getList() {
        const ues = new UES();
        let content = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activelistid) {
                const listid = this.state.activelistid;

                const list = ues.getListbyID.call(this, reportid, listid)
                if (list) {
                    content = list.content;
                }

            }

        }

        return content;

    }

    handleList(value) {
        const ues = new UES();
        let reports = ues.getReports.call(this);
        const makeid = new MakeID();
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)

                if (this.state.activelistid) {

                    const listid = this.state.activelistid;
                    const list = ues.getListbyID.call(this, reportid, listid);
                    if (list) {
                        const j = ues.getListKeybyID.call(this, reportid, listid)
                        reports[i].list[j].content = value;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }

                } else {
                    const listid = makeid.listid.call(this);
                    const newlist = newList(listid, value)
                    if (report.hasOwnProperty("list")) {
                        reports[i].list.push(newlist)

                    } else {
                        reports[i].list = [newlist]

                    }

                    this.setState({ activelistid: listid })

                }





            }



        }

    }
    getReport() {
        const ues = new UES();
        let getreport = false;
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                getreport = report;
            }
        }

        return getreport;

    }

    showGeneralIDs() {
        const report = this.getReport();
        let getids = [];
        if (report) {
            if (report.hasOwnProperty("general")) {
                // eslint-disable-next-line
                report.general.map(section => {
                    getids.push(this.showGeneralID(section))
                })
            }
        }

        return getids;


    }

    removeGeneralSection(sectionid) {
        const ues = new UES();

        if (this.state.activereportid) {
            const reports = ues.getReports.call(this)
            if (reports) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    const section = ues.getGeneralSectionbyID.call(this, reportid, sectionid)
                    if (section) {

                        const j = ues.getGeneralSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].general.splice(j, 1);
                        this.props.reduxReports(reports);
                        this.setState({ activegeneralid: false })
                    }

                }

            }

        }

    }

    handleGeneralID(sectionid) {
        if (this.state.activegeneralid) {
            this.setState({ activegeneralid: false })
        } else {
            this.setState({ activegeneralid: sectionid })
        }
    }

    moveGeneralSectionDown(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getGeneralSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getGeneralSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].general.length;
                    if (sectioncount > 1 && j < sectioncount - 1) {
                        const section_1 = reports[i].general[j + 1];
                        reports[i].general[j] = section_1;
                        reports[i].general[j + 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    moveGeneralSectionUp(sectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getGeneralSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getGeneralSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].general.length;
                    if (sectioncount > 1 && j > 0) {
                        const section_1 = reports[i].general[j - 1];
                        reports[i].general[j] = section_1;
                        reports[i].general[j - 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    showGeneralID(section) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this);
        const arrowWidth = ues.arrowUp.call(this)

        const highlight = (sectionid) => {
            if (this.state.activegeneralid === sectionid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }} key={section.sectionid}>
                <div style={{ ...styles.flex5, ...highlight(section.sectionid) }} onClick={() => { this.handleGeneralID(section.sectionid) }}>
                    <span style={{ ...regularFont }}>{section.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveGeneralSectionUp(section.sectionid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveGeneralSectionDown(section.sectionid) }}>{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeGeneralSection(section.sectionid) }}>{removeIcon()}</button>
                </div>
            </div>

        )

    }

    getGeneralSection() {
        const report = this.getReport();
        let sectionname = "";
        if (this.state.activegeneralid) {
            const sectionid = this.state.activegeneralid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("general")) {
                    // eslint-disable-next-line 
                    report.general.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionname = section.sectionname;

                        }

                    })
                }

            }

        }

        return sectionname;

    }

    handleGeneralSection(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activegeneralid) {
                    const sectionid = this.state.activegeneralid;
                    const section = ues.getGeneralSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getGeneralSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].general[j].sectionname = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const content = this.state.content;
                    const newsection = newSection(newsectionid, value, content)
                    if (report.hasOwnProperty("general")) {
                        reports[i].general.push(newsection);

                    } else {
                        reports[i].general = [newsection]

                    }
                    this.setState({ activegeneralid: newsectionid })
                }


            }
        }

    }


    getGeneralContent() {
        const report = this.getReport();
        let content = "";
        if (this.state.activegeneralid) {
            const sectionid = this.state.activegeneralid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("general")) {
                    // eslint-disable-next-line 
                    report.general.map(section => {

                        if (section.sectionid === sectionid) {
                            content = section.content;

                        }

                    })
                }

            }

        }

        return content;

    }

    handleGeneralContent(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activegeneralid) {
                    const sectionid = this.state.activegeneralid;
                    const section = ues.getGeneralSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getGeneralSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].general[j].content = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const sectionname = this.state.sectionname;
                    const newsection = newSection(newsectionid, sectionname, value)
                    if (report.hasOwnProperty("general")) {
                        reports[i].general.push(newsection);

                    } else {
                        reports[i].general = [newsection]

                    }
                    this.setState({ activegeneralid: newsectionid })
                }


            }
        }

    }


    handleConclusionID(sectionid) {
        if (this.state.activeconclusionid) {
            this.setState({ activeconclusionid: false })
        } else {
            this.setState({ activeconclusionid: sectionid })
        }
    }

    removeConclusionSection(sectionid) {
        const ues = new UES();

        if (this.state.activereportid) {
            const reports = ues.getReports.call(this)
            if (reports) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    const section = ues.getConclusionSectionbyID.call(this, reportid, sectionid)
                    if (section) {

                        const j = ues.getConclusionSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].conclusion.splice(j, 1);
                        this.props.reduxReports(reports);
                        this.setState({ activeconclusionid: false })
                    }

                }

            }

        }

    }

    getConclusionSection() {
        const report = this.getReport();
        let sectionname = "";
        if (this.state.activeconclusionid) {
            const sectionid = this.state.activeconclusionid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("conclusion")) {
                    // eslint-disable-next-line 
                    report.conclusion.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionname = section.sectionname;

                        }

                    })
                }

            }

        }

        return sectionname;

    }

    handleConclusionSection(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activeconclusionid) {
                    const sectionid = this.state.activeconclusionid;
                    const section = ues.getConclusionSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getConclusionSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].conclusion[j].sectionname = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const content = this.state.content;
                    const newsection = newSection(newsectionid, value, content)
                    if (report.hasOwnProperty("conclusion")) {
                        reports[i].conclusion.push(newsection);

                    } else {
                        reports[i].conclusion = [newsection]

                    }
                    this.setState({ activeconclusionid: newsectionid })
                }


            }
        }

    }

    getConclusionContent() {
        const report = this.getReport();
        let content = "";
        if (this.state.activeconclusionid) {
            const sectionid = this.state.activeconclusionid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("conclusion")) {
                    // eslint-disable-next-line 
                    report.conclusion.map(section => {
                        if (section.sectionid === sectionid) {
                            content = section.content;

                        }

                    })
                }

            }

        }

        return content;

    }

    handleConclusionContent(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activeconclusionid) {
                    const sectionid = this.state.activeconclusionid;
                    const section = ues.getConclusionSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getConclusionSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].conclusion[j].content = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const sectionname = this.state.sectionname;
                    const newsection = newSection(newsectionid, sectionname, value)
                    if (report.hasOwnProperty("conclusion")) {
                        reports[i].conclusion.push(newsection);

                    } else {
                        reports[i].conclusion = [newsection]

                    }
                    this.setState({ activeconclusionid: newsectionid })
                }


            }
        }

    }


    showConclusionIDs() {
        const report = this.getReport();
        let getids = [];
        if (report) {
            if (report.hasOwnProperty("conclusion")) {
                // eslint-disable-next-line
                report.conclusion.map(section => {
                    getids.push(this.showConclusionID(section))
                })
            }
        }

        return getids;


    }

    moveConclusionSectionDown(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getConclusionSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getConclusionSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].conclusion.length;
                    if (sectioncount > 1 && j < sectioncount - 1) {
                        const section_1 = reports[i].conclusion[j + 1];
                        reports[i].conclusion[j] = section_1;
                        reports[i].conclusion[j + 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    moveConclusionSectionUp(sectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getConclusionSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getConclusionSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].conclusion.length;
                    if (sectioncount > 1 && j > 0) {
                        const section_1 = reports[i].conclusion[j - 1];
                        reports[i].conclusion[j] = section_1;
                        reports[i].conclusion[j - 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    removeFindingSection(sectionid) {
        const ues = new UES();

        if (this.state.activereportid) {
            const reports = ues.getReports.call(this)
            if (reports) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    const section = ues.getFindingSectionbyID.call(this, reportid, sectionid)
                    if (section) {

                        const j = ues.getFindingSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].finding.splice(j, 1);
                        this.props.reduxReports(reports);
                        this.setState({ activefindingid: false })
                    }

                }

            }

        }

    }



    showConclusionID(section) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)

        const highlight = (sectionid) => {
            if (this.state.activeconclusionid === sectionid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }} key={section.sectionid}>
                <div style={{ ...styles.flex5, ...highlight(section.sectionid) }} onClick={() => { this.handleConclusionID(section.sectionid) }}>
                    <span style={{ ...regularFont }}>{section.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveConclusionSectionUp(section.sectionid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveConclusionSectionDown(section.sectionid) }}>{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeConclusionSection(section.sectionid) }}>{removeIcon()}</button>
                </div>
            </div>

        )

    }


    handleRecommendationID(sectionid) {
        if (this.state.activerecommendationid) {
            this.setState({ activerecommendationid: false })
        } else {
            this.setState({ activerecommendationid: sectionid })
        }
    }

    removeRecommendationSection(sectionid) {
        const ues = new UES();

        if (this.state.activereportid) {
            const reports = ues.getReports.call(this)
            if (reports) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    const section = ues.getRecommendationSectionbyID.call(this, reportid, sectionid)
                    if (section) {

                        const j = ues.getRecommendationSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].recommendation.splice(j, 1);
                        this.props.reduxReports(reports);
                        this.setState({ activerecommendationid: false })
                    }

                }

            }

        }

    }

    showRecommendationIDs() {
        const report = this.getReport();
        let getids = [];
        if (report) {
            if (report.hasOwnProperty("recommendation")) {
                // eslint-disable-next-line
                report.recommendation.map(section => {
                    getids.push(this.showRecommendationID(section))
                })
            }
        }

        return getids;


    }

    moveRecommendationSectionDown(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getRecommendationSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getRecommendationSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].recommendation.length;
                    if (sectioncount > 1 && j < sectioncount - 1) {
                        const section_1 = reports[i].recommendation[j + 1];
                        reports[i].recommendation[j] = section_1;
                        reports[i].recommendation[j + 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    moveRecommendationSectionUp(sectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getRecommendationSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getRecommendationSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].recommendation.length;
                    if (sectioncount > 1 && j > 0) {
                        const section_1 = reports[i].recommendation[j - 1];
                        reports[i].recommendation[j] = section_1;
                        reports[i].recommendation[j - 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }


    showRecommendationID(section) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)

        const highlight = (sectionid) => {
            if (this.state.activerecommendationid === sectionid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }} key={section.sectionid}>
                <div style={{ ...styles.flex5, ...highlight(section.sectionid) }} onClick={() => { this.handleRecommendationID(section.sectionid) }}>
                    <span style={{ ...regularFont }}>{section.sectionname}</span>
                </div>

                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveRecommendationSectionUp(section.sectionid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveRecommendationSectionDown(section.sectionid) }}>{arrowDown()}</button>
                </div>

                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeRecommendationSection(section.sectionid) }}>{removeIcon()}</button>
                </div>
            </div>

        )

    }


    getRecommendationContent() {
        const report = this.getReport();
        let content = "";
        if (this.state.activerecommendationid) {
            const sectionid = this.state.activerecommendationid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("recommendation")) {
                    // eslint-disable-next-line 
                    report.recommendation.map(section => {
                        if (section.sectionid === sectionid) {
                            content = section.content;

                        }

                    })
                }

            }

        }

        return content;

    }

    handleRecommendationContent(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activerecommendationid) {
                    const sectionid = this.state.activerecommendationid;
                    const section = ues.getRecommendationSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getRecommendationSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].recommendation[j].content = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const sectionname = this.state.sectionname;
                    const newsection = newSection(newsectionid, sectionname, value)
                    if (report.hasOwnProperty("recommendation")) {
                        reports[i].recommendation.push(newsection);

                    } else {
                        reports[i].recommendation = [newsection]

                    }
                    this.setState({ activerecommendationid: newsectionid })
                }


            }
        }

    }

    getRecommendationSection() {
        const report = this.getReport();
        let sectionname = "";
        if (this.state.activerecommendationid) {
            const sectionid = this.state.activerecommendationid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("recommendation")) {
                    // eslint-disable-next-line 
                    report.recommendation.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionname = section.sectionname;

                        }

                    })
                }

            }

        }

        return sectionname;

    }

    handleRecommendationSection(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activerecommendationid) {
                    const sectionid = this.state.activerecommendationid;
                    const section = ues.getRecommendationSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getRecommendationSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].recommendation[j].sectionname = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const content = this.state.content;
                    const newsection = newSection(newsectionid, value, content)
                    if (report.hasOwnProperty("recommendation")) {
                        reports[i].recommendation.push(newsection);

                    } else {
                        reports[i].recommendation = [newsection]

                    }
                    this.setState({ activerecommendationid: newsectionid })
                }


            }
        }

    }

    handleGeneralMenu(value) {

        this.handleGeneralSection(value)
        //window.open('/mazen/projects/_projectid/report')
    }

    handleConclusionMenu(value) {

        this.handleConclusionSection(value)
        //window.open('/mazen/projects/_projectid/report')
    }

    handleRecommendationMenu(value) {

        this.handleRecommendationSection(value)
        //window.open('/mazen/projects/_projectid/report')
    }

  




    handleFindingMenu(value) {

        this.handleFindingSection(value)
        //window.open('/mazen/projects/_projectid/report')
    }



    loadFindingSections() {

        const ues = new UES();
        const sections = ues.findingSections();
        let getsections = [];
        if (sections) {
            // eslint-disable-next-line
            sections.map(section => {
                getsections.push(this.showOptionValue(section))

            })

        }
        return getsections;

    }


    showFindingIDs() {
        const report = this.getReport();
        let getids = [];
        if (report) {
            if (report.hasOwnProperty("finding")) {
                // eslint-disable-next-line
                report.finding.map(section => {
                    getids.push(this.showFindingID(section))
                })
            }
        }

        return getids;


    }

    showFindingID(section) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)

        const highlight = (sectionid) => {
            if (this.state.activefindingid === sectionid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.generalFont }} key={section.sectionid}>
                <div style={{ ...styles.flex5, ...highlight(section.sectionid) }} onClick={() => { this.handleFindingID(section.sectionid) }}>
                    <span style={{ ...regularFont }}>{section.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveFindingSectionUp(section.sectionid) }}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveFindingSectionDown(section.sectionid) }}>{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeFindingSection(section.sectionid) }}>{removeIcon()}</button>
                </div>
            </div>

        )

    }


    handleFindingID(sectionid) {
        if (this.state.activefindingid) {
            this.setState({ activefindingid: false })
        } else {
            this.setState({ activefindingid: sectionid })
        }
    }

    handleFindingSection(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activefindingid) {
                    const sectionid = this.state.activefindingid;
                    const section = ues.getFindingSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getFindingSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].finding[j].sectionname = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const content = this.state.content;
                    const newsection = newSection(newsectionid, value, content)
                    if (report.hasOwnProperty("finding")) {
                        reports[i].finding.push(newsection);

                    } else {
                        reports[i].finding = [newsection]

                    }
                    this.setState({ activefindingid: newsectionid })
                }


            }
        }

    }

    getFindingSection() {
        const report = this.getReport();
        let sectionname = "";
        if (this.state.activefindingid) {
            const sectionid = this.state.activefindingid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("finding")) {
                    // eslint-disable-next-line 
                    report.finding.map(section => {
                        if (section.sectionid === sectionid) {
                            sectionname = section.sectionname;

                        }

                    })
                }

            }

        }

        return sectionname;

    }


    getFindingContent() {
        const report = this.getReport();
        let content = "";
        if (this.state.activefindingid) {
            const sectionid = this.state.activefindingid;

            if (report) {
                // eslint-disable-next-line
                if (report.hasOwnProperty("finding")) {
                    // eslint-disable-next-line 
                    report.finding.map(section => {
                        if (section.sectionid === sectionid) {
                            content = section.content;

                        }

                    })
                }

            }

        }

        return content;

    }

    handleFindingContent(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (reports) {
            const report = this.getReport();
            if (report) {
                const reportid = this.state.activereportid;
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activefindingid) {
                    const sectionid = this.state.activefindingid;
                    const section = ues.getFindingSectionbyID.call(this, reportid, sectionid)
                    if (section) {
                        const j = ues.getFindingSectionKeybyID.call(this, reportid, sectionid)
                        reports[i].finding[j].content = value;
                        this.props.reduxReports(reports)
                        this.setState({ render: 'render' })
                    }

                } else {
                    const newsectionid = makeid.sectionid.call(this, reportid)
                    const sectionname = this.state.sectionname;
                    const newsection = newSection(newsectionid, sectionname, value)
                    if (report.hasOwnProperty("finding")) {
                        reports[i].finding.push(newsection);

                    } else {
                        reports[i].finding = [newsection]

                    }
                    this.setState({ activefindingid: newsectionid })
                }


            }
        }

    }

    moveFindingSectionDown(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getFindingSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getFindingSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].finding.length;
                    if (sectioncount > 1 && j < sectioncount - 1) {
                        const section_1 = reports[i].finding[j + 1];
                        reports[i].finding[j] = section_1;
                        reports[i].finding[j + 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }

    moveFindingSectionUp(sectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const section = ues.getFindingSectionbyID.call(this, reportid, sectionid)
                if (section) {
                    const j = ues.getFindingSectionKeybyID.call(this, reportid, sectionid)
                    const sectioncount = reports[i].finding.length;
                    if (sectioncount > 1 && j > 0) {
                        const section_1 = reports[i].finding[j - 1];
                        reports[i].finding[j] = section_1;
                        reports[i].finding[j - 1] = section;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }
                }
            }


        }

    }








    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const headerFont = ues.headerFont.call(this)
        const myuser = ues.checkUser.call(this)
        const regularFont = ues.regularFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        if (myuser) {

            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {

                return (<div style={{ ...styles.generalContainer }}>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                            /Projects </Link>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                            /{project.projectnumber} {project.title} </Link>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/report`}>
                            /Report </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="date" style={{ ...styles.generalFont, ...regularFont }}
                                value={this.getDateReport()}
                                onChange={event => { this.handleDateReport(event.target.value) }}
                            />
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}> Date of Report</span>
                        </div>
                        {this.showReports()}
                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5 }}>&nbsp;</div>
                        <div style={{ ...styles.flex1 }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}
                            value={this.getIntro()}
                            onChange={event => { this.handleIntro(event.target.value) }}></textarea>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Intro</span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                            <span style={{ ...styles.generalFont, ...regularFont }}>Scope of Report</span> <button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getList()}
                                onChange={event => { this.handleList(event.target.value) }}
                            />
                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...styles.generalFont, ...regularFont }}
                                >List</span>
                            </div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.marginLeft15 }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getSublist()}
                                onChange={event => { this.handleSublist(event.target.value) }}
                            />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Sub-List</span>
                        </div>
                    </div>
                    {this.showLists()}
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.generalFont, ...headerFont }}><u>General</u></span>
                        </div>
                        <div style={{ ...styles.flex4, ...styles.addMargin }}>
                            <select style={{ ...styles.generalField, ...styles.generalFont, ...styles.alignCenter, ...regularFont }} onChange={event => { this.handleGeneralMenu(event.target.value) }}>
                                <option value="">Select Section</option>
                                {this.loadGeneralSections()}

                            </select>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getGeneralSection()}
                            onChange={event => { this.handleGeneralSection(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Section</span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.areatext, ...styles.generalFont }}
                            value={this.getGeneralContent()}
                            onChange={event => { this.handleGeneralContent(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Content</span>
                    </div>

                    {this.showGeneralIDs()}


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.generalFont, ...headerFont }}><u>Findings</u></span>
                        </div>
                        <div style={{ ...styles.flex4, ...styles.addMargin }}>
                            <select style={{ ...styles.generalField, ...styles.generalFont, ...styles.alignCenter, ...regularFont }}
                                onChange={event => { this.handleFindingMenu(event.target.value) }}>
                                <option value="">Select Section</option>
                                {this.loadFindingSections()}
                            </select>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getFindingSection()}
                            onChange={event => { this.handleFindingSection(event.target.value) }} />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Section</span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.areatext, ...styles.generalFont }}
                            value={this.getFindingContent()}
                            onChange={event => { this.handleFindingContent(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Content</span>
                    </div>

                    {this.showFindingIDs()}


                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.generalFont, ...headerFont }}><u>Conclusions</u></span>
                        </div>
                        <div style={{ ...styles.flex4, ...styles.addMargin }}>
                            <select style={{ ...styles.generalField, ...styles.generalFont, ...styles.alignCenter, ...regularFont }}
                                onChange={event => { this.handleConclusionMenu(event.target.value) }}>
                                <option value="">Select Section</option>
                                {this.loadConclusionSections()}
                            </select>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getConclusionSection()}
                            onChange={event => { this.handleConclusionSection(event.target.value) }} />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Section</span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.areatext, ...styles.generalFont }}
                            value={this.getConclusionContent()}
                            onChange={event => { this.handleConclusionContent(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Content</span>
                    </div>

                    {this.showConclusionIDs()}
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <span style={{ ...styles.generalFont, ...headerFont }}><u>Recommendations</u></span>
                        </div>
                        <div style={{ ...styles.flex4, ...styles.addMargin }}>
                            <select style={{ ...styles.generalField, ...styles.generalFont, ...styles.alignCenter, ...regularFont }}
                                onChange={(event) => { this.handleRecommendationMenu(event.target.value) }}>
                                <option value="">Select Section</option>
                                {this.loadRecommendationSections()}
                            </select>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont }}
                            value={this.getRecommendationSection()}
                            onChange={event => { this.handleRecommendationSection(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Section</span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalField, ...regularFont, ...styles.areatext, ...styles.generalFont }}
                            value={this.getRecommendationContent()}
                            onChange={event => { this.handleRecommendationContent(event.target.value) }}
                        />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Content</span>
                    </div>
                    {this.showRecommendationIDs()}


                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { ues.saveReport.call(this) }}>{saveIcon()}</button>
                    </div>

                </div>)

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

export default connect(mapStateToProps, actions)(Report);

