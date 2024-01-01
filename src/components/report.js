import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, saveIcon, dropdownIcon } from './svg';
import { formatDateReport, currentDate, newReport, newChapter, newReportSection, newSubSection } from './functions'
import MakeID from './makeids';
//import GenerateReport from './generatereport';
import Spinner from './spinner';
import Chapters from './chapters';
import Sections from './sections';
import SubSections from './subsection';



class Report extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activechapterid: false, activesectionid: false, activesubsectionid: false, activereportid: false, intro: '', activelistid: false, activesublistid: false, activegeneralid: false, activeconclusionid: false, activerecommendationid: false, activefindingid: false, content: '', spinner: false

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();

        const projects = ues.getProjects.call(this)
        if (!projects) {
            ues.loadProjects.call(this);
        }

        const clients = ues.getClients.call(this);
        if (!clients) {
            ues.loadClients.call(this)
        }

        const reports = ues.getReports.call(this)
        if (!reports) {
            ues.loadReports.call(this)
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
            if (this.state.activereportid === reportid) {
                this.setState({ activereportid: false, activechapterid: false, activesectionid: false, activesubsectionid: false })

            } else {
                this.setState({ activereportid: reportid, activechapterid: false, activesectionid: false, activesubsectionid: false })
            }
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

    showChapterIDs() {
        const ues = new UES();
        const chapter = new Chapters();
        let ids = [];
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const getchapters = ues.getChaptersByReportID.call(this, reportid)

            if (getchapters) {
                // eslint-disable-next-line
                getchapters.map(getchapter => {
                    ids.push(chapter.showChapterID.call(this, getchapter))


                })
            }

        }
        return ids;
    }

    showReport(report) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)
        const projectid = this.props.projectid;
        const myuser = ues.checkUser.call(this)

        const highlight = (reportid) => {
            if (this.state.activereportid === reportid) {
                return (styles.activeid)
            }
        }

        const activemenu = () => {
            if (this.state.activereportid === report.reportid) {
                return (<div style={{ ...styles.generalContainer }}>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/report/${report.reportid}`}><button style={{ ...styles.generalButton, ...iconWidth }}>{dropdownIcon()}</button> View Report </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/report/${report.reportid}/figures`}><button style={{ ...styles.generalButton, ...iconWidth }}>{dropdownIcon()}</button> Figures/Appendix </Link>
                    </div>
                </div>)
            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={report.reportid}>
                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...highlight(report.reportid) }}>
                        <span style={{ ...regularFont }} onClick={() => { this.handleReportID(report.reportid) }}>{formatDateReport(report.datereport)}</span>
                    </div>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeReport(report.reportid) }}>{removeIcon()}</button>
                    </div>

                </div>

                {activemenu()}

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
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        if (project) {
            const project_id = project._id;
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
                const newreport = newReport(reportid, project_id, projectid, value, intro)

                if (reports) {
                    reports.push(newreport)

                } else {
                    reports = [newreport]

                }
                this.setState({ activereportid: reportid })

            }

        }

    }

    handleChapterName(value) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        const makeid = new MakeID();
        if (reports) {
            if (this.state.activereportid) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    if (this.state.activechapterid) {
                        const chapterid = this.state.activechapterid;

                        const chapter = ues.getChapterByID.call(this, reportid, chapterid);
                        if (chapter) {
                            const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                            reports[i].chapters[j].chaptername = value;
                            this.props.reduxReports(reports)
                            this.setState({ render: 'render' })
                        }


                    } else {

                        const chapterid = makeid.chapterID.call(this, reportid)
                        const content = this.state.content;
                        const newchapter = newChapter(reportid, chapterid, value, content)

                        if (report.hasOwnProperty("chapters")) {

                            reports[i].chapters.push(newchapter)


                        } else {

                            reports[i].chapters = [newchapter];

                        }

                        this.props.reduxReports(reports)
                        this.setState({ activechapterid: chapterid })
                    }
                }
            }
        }


    }

    getChapterName() {
        const ues = new UES();
        let chaptername = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        chaptername = chapter.chaptername;
                    }

                }
            }
        }
        return chaptername;
    }

    handleChapterContent(value) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        const makeid = new MakeID();
        if (reports) {
            if (this.state.activereportid) {
                const reportid = this.state.activereportid;
                const report = ues.getReportByID.call(this, reportid)
                if (report) {
                    const i = ues.getReportKeyByID.call(this, reportid)
                    if (this.state.activechapterid) {
                        const chapterid = this.state.activechapterid;

                        const chapter = ues.getChapterByID.call(this, reportid, chapterid);
                        if (chapter) {
                            const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                            reports[i].chapters[j].content = value;
                            this.props.reduxReports(reports)
                            this.setState({ render: 'render' })
                        }


                    } else {

                        const chapterid = makeid.chapterID.call(this, reportid)
                        const chaptername = this.state.chaptername;
                        const newchapter = newChapter(reportid, chapterid, chaptername, value)

                        if (report.hasOwnProperty("chapters")) {

                            reports[i].chapters.push(newchapter)


                        } else {

                            reports[i].chapters = [newchapter];

                        }

                        this.props.reduxReports(reports)
                        this.setState({ activechapterid: chapterid })
                    }
                }
            }
        }


    }

    getChapterContent() {
        const ues = new UES();
        let content = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        content = chapter.content;
                    }

                }
            }
        }
        return content;
    }

    removeChapter(chapterid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                if (chapter) {
                    const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                    reports[i].chapters.splice(j, 1)
                    this.props.reduxReports(reports)
                    this.setState({ activechapterid: false })
                }
            }
        }
    }


    showSectionIDs() {
        const ues = new UES();
        const sections = new Sections();
        let ids = [];
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;
                let getsections = ues.getSectionsbyChapterID.call(this, reportid, chapterid)
                if (getsections) {
                    // eslint-disable-next-line
                    getsections.map(section => {

                        ids.push(sections.showSectionID.call(this, section))

                    })
                }
            }

        }

        return ids;

    }

    handleSectionName(value) {

        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        if (this.state.activesectionid) {
                            let sectionid = this.state.activesectionid;
                            const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                            if (section) {
                                const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)
                                reports[i].chapters[j].sections[k].sectionname = value;
                                this.props.reduxReports(reports)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let sectionid = makeid.sectionID.call(this, reportid, chapterid)

                            const content = this.state.content;
                            const newsection = newReportSection(sectionid, value, content)

                            if (chapter.hasOwnProperty("sections")) {

                                reports[i].chapters[j].sections.push(newsection)


                            } else {

                                reports[i].chapters[j].sections = [newsection]

                            }
                            this.props.reduxReports(reports)
                            this.setState({ activesectionid: sectionid })





                        }


                    }
                }
            }
        }


    }

    getSectionName() {
        const ues = new UES();
        let sectionname = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;

                if (this.state.activesectionid) {
                    const sectionid = this.state.activesectionid;
                    const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)

                    if (section) {
                        sectionname = section.sectionname;
                    }
                }
            }
        }

        return sectionname;

    }

    handleSectionContent(value) {

        const ues = new UES();
        const makeid = new MakeID();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        if (this.state.activesectionid) {
                            let sectionid = this.state.activesectionid;
                            const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                            if (section) {

                                const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)
                                reports[i].chapters[j].sections[k].content = value;
                                this.props.reduxReports(reports)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let sectionid = makeid.sectionID.call(this, reportid, chapterid)

                            const content = this.state.content;
                            const newsection = newReportSection(sectionid, value, content)

                            if (chapter.hasOwnProperty("sections")) {

                                reports[i].chapters[j].sections.push(newsection)


                            } else {

                                reports[i].chapters[j].sections = [newsection]

                            }
                            this.props.reduxReports(reports)
                            this.setState({ activesectionid: sectionid })





                        }


                    }
                }
            }
        }


    }

    getSectionContent() {
        const ues = new UES();
        let sectioncontent = "";
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;

                if (this.state.activesectionid) {
                    const sectionid = this.state.activesectionid;
                    const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)

                    if (section) {
                        sectioncontent = section.content;
                    }
                }
            }
        }

        return sectioncontent;

    }

    removeSection(sectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid)
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                        if (section) {
                            const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)
                            reports[i].chapters[j].sections.splice(k, 1)
                            this.props.reduxReports(reports)
                            this.setState({ activesectionid: false })
                        }
                    }
                }
            }
        }

    }


    showSubSectionIDs() {
        const ues = new UES();
        const subsections = new SubSections();
        let ids = [];
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;

            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;

                if (this.state.activesectionid) {
                    const sectionid = this.state.activesectionid;
                    const getsubsections = ues.getSubSections.call(this, reportid, chapterid, sectionid)
                    if (getsubsections) {
                        // eslint-disable-next-line
                        getsubsections.map(section => {

                            ids.push(subsections.showSubSectionID.call(this, section))

                        })
                    }
                }
            }
        }

        return ids;

    }

    getSubSectionName() {
        let subsectionname = "";

        const ues = new UES();
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;

                if (this.state.activesectionid) {
                    const sectionid = this.state.activesectionid;

                    if (this.state.activesubsectionid) {
                        const subsectionid = this.state.activesubsectionid;

                        const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid)

                        subsectionname = subsection.sectionname;


                    }

                }
            }
        }

        return subsectionname;


    }

    handleSubSectionName(value) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        const makeid = new MakeID();
        if (reports) {

            if (this.state.activereportid) {

                const reportid = this.state.activereportid;

                const report = ues.getReportByID.call(this, reportid)
                if (report) {

                    const i = ues.getReportKeyByID.call(this, reportid)

                    if (this.state.activechapterid) {
                        const chapterid = this.state.activechapterid;

                        const chapter = ues.getChapterByID.call(this, reportid, chapterid)

                        if (chapter) {

                            const j = ues.getChapterKeyByID.call(this, reportid, chapterid)

                            if (this.state.activesectionid) {

                                const sectionid = this.state.activesectionid;

                                const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)

                                if (section) {

                                    const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)

                                    if (this.state.activesubsectionid) {
                                        const subsectionid = this.state.activesubsectionid;

                                        const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid)
                                        if (subsection) {


                                            const l = ues.getSubSectionKeybyID.call(this, reportid, chapterid, sectionid, subsectionid)

                                            reports[i].chapters[j].sections[k].subsections[l].sectionname = value;
                                            this.props.reduxReports(reports)
                                            this.setState({ render: 'render' })



                                        }


                                    } else {
                                        let subsectionid = makeid.reportSectionID.call(this, reportid)
                                        const content = this.state.content;
                                        const newsubsection = newSubSection(subsectionid, value, content)
                                        if (section.hasOwnProperty("subsections")) {

                                            reports[i].chapters[j].sections[k].subsections.push(newsubsection)


                                        } else {
                                            reports[i].chapters[j].sections[k].subsections = [newsubsection]

                                        }

                                        this.props.reduxReports(reports)

                                        this.setState({ activesubsectionid: subsectionid })
                                    }



                                }




                            }





                        }
                    }





                }




            }


        }

    }

    getSubSectionContent() {
        let subsectioncontent = "";

        const ues = new UES();
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            if (this.state.activechapterid) {
                const chapterid = this.state.activechapterid;

                if (this.state.activesectionid) {
                    const sectionid = this.state.activesectionid;

                    if (this.state.activesubsectionid) {
                        const subsectionid = this.state.activesubsectionid;

                        const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid)

                        subsectioncontent = subsection.content;


                    }

                }
            }
        }

        return subsectioncontent;


    }

    handleSubSectionContent(value) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        const makeid = new MakeID();
        if (reports) {

            if (this.state.activereportid) {

                const reportid = this.state.activereportid;

                const report = ues.getReportByID.call(this, reportid)
                if (report) {

                    const i = ues.getReportKeyByID.call(this, reportid)

                    if (this.state.activechapterid) {
                        const chapterid = this.state.activechapterid;

                        const chapter = ues.getChapterByID.call(this, reportid, chapterid)

                        if (chapter) {

                            const j = ues.getChapterKeyByID.call(this, reportid, chapterid)

                            if (this.state.activesectionid) {

                                const sectionid = this.state.activesectionid;

                                const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)

                                if (section) {

                                    const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)

                                    if (this.state.activesubsectionid) {
                                        const subsectionid = this.state.activesubsectionid;

                                        const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid)
                                        if (subsection) {


                                            const l = ues.getSubSectionKeybyID.call(this, reportid, chapterid, sectionid, subsectionid)

                                            reports[i].chapters[j].sections[k].subsections[l].content = value;
                                            this.props.reduxReports(reports)
                                            this.setState({ render: 'render' })



                                        }


                                    } else {
                                        let subsectionid = makeid.reportSectionID.call(this, reportid)
                                        const sectionname = this.state.sectionname
                                        const newsubsection = newSubSection(subsectionid, sectionname, value)
                                        if (section.hasOwnProperty("subsections")) {

                                            reports[i].chapters[j].sections[k].subsections.push(newsubsection)


                                        } else {
                                            reports[i].chapters[j].sections[k].subsections = [newsubsection]

                                        }

                                        this.props.reduxReports(reports)

                                        this.setState({ activesubsectionid: subsectionid })
                                    }



                                }




                            }





                        }
                    }





                }




            }


        }

    }

    removeSubSection(subsectionid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (reports) {

            if (this.state.activereportid) {

                const reportid = this.state.activereportid;

                const report = ues.getReportByID.call(this, reportid)
                if (report) {

                    const i = ues.getReportKeyByID.call(this, reportid)

                    if (this.state.activechapterid) {
                        const chapterid = this.state.activechapterid;

                        const chapter = ues.getChapterByID.call(this, reportid, chapterid)

                        if (chapter) {

                            const j = ues.getChapterKeyByID.call(this, reportid, chapterid)

                            if (this.state.activesectionid) {

                                const sectionid = this.state.activesectionid;

                                const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)

                                if (section) {

                                    const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)

                                    const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid)
                                    if (subsection) {


                                        const l = ues.getSubSectionKeybyID.call(this, reportid, chapterid, sectionid, subsectionid)

                                        reports[i].chapters[j].sections[k].subsections.splice(l, 1)
                                        this.props.reduxReports(reports)
                                        this.setState({ activesubsectionid: false })



                                    }



                                }




                            }





                        }
                    }





                }




            }


        }

    }

    moveChapterUp(chapterid) {
        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                if (chapter) {
                    const j = ues.getChapterKeyByID.call(this, reportid, chapterid)

                    const chaptercount = reports[i].chapters.length;

                    if (chaptercount > 1 && j > 0) {
                        const chapter_1 = reports[i].chapters[j - 1];
                        reports[i].chapters[j] = chapter_1;
                        reports[i].chapters[j - 1] = chapter;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }


                }




            }
        }


    }

    moveChapterDown(chapterid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                if (chapter) {
                    const j = ues.getChapterKeyByID.call(this, reportid, chapterid)

                    const chaptercount = reports[i].chapters.length;

                    if (chaptercount > 1 && j < chaptercount - 1) {
                        const chapter_1 = reports[i].chapters[j + 1];
                        reports[i].chapters[j] = chapter_1;
                        reports[i].chapters[j + 1] = chapter;
                        this.props.reduxReports(reports);
                        this.setState({ render: 'render' })

                    }

                }




            }
        }


    }


    moveSectionUp(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                        if (section) {
                            const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)
                            const sectioncount = reports[i].chapters[j].sections.length;

                            if (sectioncount > 1 && k > 0) {
                                const section_1 = reports[i].chapters[j].sections[k - 1];
                                reports[i].chapters[j].sections[k] = section_1;
                                reports[i].chapters[j].sections[k - 1] = section;
                                this.props.reduxReports(reports);
                                this.setState({ render: 'render' })

                            }

                        }

                    }




                }

            }
        }


    }


    moveSectionDown(sectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                        if (section) {
                            const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)
                            const sectioncount = reports[i].chapters[j].sections.length;

                            if (sectioncount > 1 && k < sectioncount - 1) {
                                const section_1 = reports[i].chapters[j].sections[k + 1];
                                reports[i].chapters[j].sections[k] = section_1;
                                reports[i].chapters[j].sections[k + 1] = section;
                                this.props.reduxReports(reports);
                                this.setState({ render: 'render' })

                            }

                        }

                    }




                }

            }
        }


    }



    moveSubSectionUp(subsectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        if (this.state.activesectionid) {
                            const sectionid = this.state.activesectionid;
                            const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                            if (section) {

                                const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)

                                const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid);

                                if (subsection) {


                                    const l = ues.getSubSectionKeybyID.call(this, reportid, chapterid, sectionid, subsectionid)
                                    const subsectioncount = reports[i].chapters[j].sections[k].subsections.length;

                                    if (subsectioncount > 1 && l > 0) {
                                        const section_1 = reports[i].chapters[j].sections[k].subsections[l - 1];
                                        reports[i].chapters[j].sections[k].subsections[l] = section_1;
                                        reports[i].chapters[j].sections[k].subsections[l - 1] = subsection;
                                        this.props.reduxReports(reports);
                                        this.setState({ render: 'render' })

                                    }

                                }

                            }

                        }

                    }




                }

            }
        }


    }



    moveSubSectionDown(subsectionid) {

        const ues = new UES();
        const reports = ues.getReports.call(this)
        if (this.state.activereportid) {
            const reportid = this.state.activereportid;
            const report = ues.getReportByID.call(this, reportid)
            if (report) {
                const i = ues.getReportKeyByID.call(this, reportid);
                if (this.state.activechapterid) {
                    const chapterid = this.state.activechapterid;
                    const chapter = ues.getChapterByID.call(this, reportid, chapterid)
                    if (chapter) {
                        const j = ues.getChapterKeyByID.call(this, reportid, chapterid)
                        if (this.state.activesectionid) {
                            const sectionid = this.state.activesectionid;
                            const section = ues.getSectionbyID.call(this, reportid, chapterid, sectionid)
                            if (section) {

                                const k = ues.getSectionKeybyID.call(this, reportid, chapterid, sectionid)

                                const subsection = ues.getSubSectionbyID.call(this, reportid, chapterid, sectionid, subsectionid);

                                if (subsection) {


                                    const l = ues.getSubSectionKeybyID.call(this, reportid, chapterid, sectionid, subsectionid)
                                    const subsectioncount = reports[i].chapters[j].sections[k].subsections.length;

                                    if (subsectioncount > 1 && l < subsectioncount - 1) {
                                        const section_1 = reports[i].chapters[j].sections[k].subsections[l + 1];
                                        reports[i].chapters[j].sections[k].subsections[l] = section_1;
                                        reports[i].chapters[j].sections[k].subsections[l + 1] = subsection;
                                        this.props.reduxReports(reports);
                                        this.setState({ render: 'render' })

                                    }


                                }

                            }

                        }

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
        const chapters = new Chapters();
        const sections = new Sections();
        const subsections = new SubSections();

        const showSaveIcon = () => {
            if (this.state.spinner) {

                return (<Spinner />)


            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { ues.saveReport.call(this) }}>{saveIcon()}</button>
                </div>)

            }
        }
        if (myuser) {

            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {

                return (<div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>

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

                    {chapters.showChapters.call(this)}

                    {sections.showSections.call(this)}

                    {subsections.showSubSections.call(this)}



                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                    </div>

                    {showSaveIcon()}

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

