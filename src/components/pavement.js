import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { SavePavement } from './actions/api';
import { removeIcon, saveIcon } from './svg';
import { newPavement, inputUTCStringForLaborID, newPavementSection } from './functions';
import MakeID from './makeids';



class Pavement extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activesectionid: false, activepavementid: false, sectionname: '', ti: '', rvalue: '', ab: '', ac: '', as: '', pcc: '', use: ''

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


    showpavementids() {
        const ues = new UES();
        let pavementids = [];
        const projectid = this.props.projectid;
        const pavements = ues.getPavementByProjectID.call(this, projectid)
        if (pavements) {
            // eslint-disable-next-line
            pavements.map(pavement => {
                pavementids.push(this.showpavementid(pavement))
            })
        }

        return pavementids;

    }

    removeSection(sectionid) {

        const ues = new UES();
        const pavements = ues.getPavement.call(this)
        if (pavements) {
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                pavements.splice(i, 1)
                this.props.reduxPavement(pavements)
                this.setState({ activesectionid: false })
            }

        }

    }

    handleSectionID(sectionid) {

        if (this.state.activesectionid) {
            this.setState({ activesectionid: false })
        } else {
            this.setState({ activesectionid: sectionid })
        }
    }

    showpavementid(pavement) {

        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)

        const highlight = (sectionid) => {
            if (this.state.activesectionid === sectionid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={pavement.sectionid}>
                <div style={{ ...styles.flex5, ...highlight(pavement.sectionid) }} onClick={() => { this.handleSectionID(pavement.sectionid) }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Section Name {pavement.sectionname} Rvalue:{pavement.rvalue}</span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeSection(pavement.sectionid) }}>{removeIcon()}</button>
                </div>
            </div>
        )


    }

    getSectionName() {
        const ues = new UES();
        let sectionname = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)
            if (section) {
                sectionname = section.sectionname

            }
        }

        return sectionname;


    }

    handleSectionName(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                pavements[i].sectionname = value;
                this.props.reduxPavement(pavements)
                this.setState({ render: 'render' })
            }
        } else {
            const newsectionid = makeid.pavementid.call(this);
            const projectid = this.props.projectid;
            const rvalue = this.state.rvalue;
            const newpavement = newPavement(newsectionid, projectid, value, rvalue)
            if (pavements) {
                pavements.push(newpavement)

            } else {
                pavements = [newpavement]

            }
            this.setState({ activesectionid: newsectionid })
        }

    }

    getTI() {
        const ues = new UES();
        let ti = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        ti = pavementsection.ti
                    }

                }


            }
        }

        return ti;


    }

    handleTI(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].ti = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)

                    const ac = this.state.ac;
                    const ab = this.state.ab;
                    const as = this.state.as;
                    const use = this.state.use;
                    const pcc = this.state.pcc;
                    const newpavementsection = newPavementSection(pavementid, sectionid, value, ac, ab, as, use, pcc)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }


    getUse() {
        const ues = new UES();
        let use = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        use = pavementsection.use
                    }

                }


            }
        }

        return use;


    }

    handleUse(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].use = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)

                    const ac = this.state.ac;
                    const ab = this.state.ab;
                    const as = this.state.as;
                    const ti = this.state.ti;
                    const pcc = this.state.pcc;
                    const newpavementsection = newPavementSection(pavementid, sectionid, ti, ac, ab, as, pcc, value)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }


    getRvalue() {
        const ues = new UES();
        let rvalue = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)
            if (section) {
                rvalue = section.rvalue

            }
        }

        return rvalue;


    }

    handleRvalue(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                pavements[i].rvalue = value;
                this.props.reduxPavement(pavements)
                this.setState({ render: 'render' })
            }
        } else {
            const newsectionid = makeid.pavementid.call(this);
            const projectid = this.props.projectid;
            const sectionname = this.state.sectionname;

            const newpavement = newPavement(newsectionid, projectid, sectionname, value)
            if (pavements) {
                pavements.push(newpavement)

            } else {
                pavements = [newpavement]

            }
            this.setState({ activesectionid: newsectionid })
        }

    }




    getAC() {
        const ues = new UES();
        let ac = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        ac = pavementsection.ac
                    }

                }


            }
        }

        return ac;


    }

    handleAC(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].ac = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)
                    const ti = this.state.ti;
                    const ab = this.state.ab;
                    const as = this.state.as;
                    const use = this.state.use;
                    const pcc = this.state.pcc;

                    const newpavementsection = newPavementSection(pavementid, sectionid, ti, value, ab, as, use, pcc)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }


    getPCC() {
        const ues = new UES();
        let pcc = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        pcc = pavementsection.pcc
                    }

                }


            }
        }

        return pcc;


    }

    handlePCC(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].pcc = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)
                    const ti = this.state.ti;
                    const ab = this.state.ab;
                    const as = this.state.as;
                    const ac = this.state.ac;
                    const use = this.state.use;
                    const newpavementsection = newPavementSection(pavementid, sectionid, ti, ac, ab, as, value, use)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }


    getAB() {
        const ues = new UES();
        let ab = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        ab = pavementsection.ab
                    }

                }


            }
        }

        return ab;


    }

    calcGERequired() {

        const ti = Number(this.getTI())
        const rvalue = Number(this.getRvalue());
        const GE = 0.0032 * (ti) * (100 - rvalue) * 12;

        return (Math.round(GE))



    }

    calcGF() {
        const ac = Number(this.getAC());
        const ti = Number(this.getTI())
        let gf = 0;
        if (ac <= 6) {
            gf = 5.67 / (Math.sqrt(ti))

        } else {
            gf = 7 * (Math.pow((ac / 12), (1 / 3))) / (Math.sqrt(ti))

        }

        return Number(gf).toFixed(2);
    }

    handleAB(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].ab = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)
                    const ti = this.state.ti;

                    const ac = this.state.ac;
                    const as = this.state.as;
                    const use = this.state.use;
                    const pcc = this.state.pcc;
                    const newpavementsection = newPavementSection(pavementid, sectionid, ti, ac, value, as, pcc, use)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }

    getAS() {
        const ues = new UES();
        let as = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        as = pavementsection.as
                    }

                }


            }
        }

        return as;


    }


    handleAS(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activepavementid) {
                    const pavementid = this.state.activepavementid;
                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)
                    if (pavementsection) {
                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavements[i].design[j].as = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const pavementid = makeid.pavementSectionID.call(this)
                    const ti = this.state.ti;
                    const ac = this.state.ac;
                    const ab = this.state.ab;
                    const use = this.state.use;
                    const pcc = this.state.pcc;
                    const newpavementsection = newPavementSection(pavementid, sectionid, ti, ac, ab, value, pcc, use)
                    if (pavement.hasOwnProperty("design")) {

                        pavement.design.push(newpavementsection)

                    } else {
                        pavement.design = [newpavementsection]

                    }
                    this.setState({ activepavementid: pavementid })
                }
            }
        }

    }


    calcGEDesign() {
        const gfac = Number(this.calcGF());
        const ac = Number(this.getAC())
        const ab = Number(this.getAB())
        const as = Number(this.getAS())
        const pcc = Number(this.getPCC())
        let GE = 0;
        if (ac > 0 || ab > 0 || as > 0 || pcc > 0) {
            GE = (gfac * ac) + (1.8 * pcc) + (ab * 1.1) + as
        }
        return Math.round(GE)
    }

    calcFS() {
        const GErequired = this.calcGERequired();
        const GEDesign = this.calcGEDesign();
        let fs = 0
        if (GErequired > 0 && GErequired > 0) {

            fs = GEDesign / GErequired;
        }
        return (Number(fs).toFixed(2))
    }

    async savePavement() {
        const ues = new UES();
        const pavement = ues.getPavement.call(this)
        if (pavement) {
            try {

                let response = await SavePavement({ pavement })
                if (response.hasOwnProperty("pavement")) {
                    this.props.reduxPavement(response.pavement)
                }


                let message = "";
                if (response.hasOwnProperty("message")) {
                    message += response.message;

                }

                if (response.hasOwnProperty("lastupdated")) {
                    message += ` Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }
                this.setState({ message })


            } catch (err) {

            }

        }

    }

    handlePavementID(pavementid) {
        if (this.state.activepavementid === pavementid) {
            this.setState({ activepavementid: false })
        } else {
            this.setState({ activepavementid: pavementid })
        }

    }

    removePavementSection(pavementid) {
        const ues = new UES();
        let pavement = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid);

            if (section) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (section.hasOwnProperty("design")) {

                    const pavementsection = ues.getPavementSectionByID.call(this, sectionid, pavementid)

                    if (pavementsection) {

                        const j = ues.getPavementSectionKeyByID.call(this, sectionid, pavementid)
                        pavement[i].design.splice(j, 1)
                        this.props.reduxPavement(pavement)
                        this.setState({ activepavementid: false })
                    }
                }

            }
        }

    }

    showPavementSections() {

        const ues = new UES();
        const sectionid = this.state.activesectionid;
        let getsections = [];
        const pavement = ues.getPavementByID.call(this, sectionid);
        if (pavement) {

            if (pavement.hasOwnProperty("design")) {
                // eslint-disable-next-line
                pavement.design.map(section => {

                    getsections.push(this.showPavementSection(section))

                })
            }
        }

        return getsections;

    }



    showPavementSection(section) {

        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)

        const highlight = (pavementid) => {
            if (this.state.activepavementid === pavementid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={section.pavementid}>
                <div style={{ ...styles.flex5, ...highlight(section.pavementid) }} onClick={() => { this.handlePavementID(section.pavementid) }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>TI:{section.ti}  AC: {section.ac}" PCC: {section.pcc}" AB: {section.ab}" AS: {section.as}"</span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removePavementSection(section.pavementid) }}>{removeIcon()}</button>
                </div>
            </div>
        )


    }




    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        if (myuser) {
            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
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
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/pavement`}>
                                /pavement</Link>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                value={this.getSectionName()}
                                onChange={event => { this.handleSectionName(event.target.value) }}
                            />
                            <span style={{ ...regularFont, ...styles.generalFont }}>Section Name</span>

                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                    value={this.getRvalue()}
                                    onChange={event => { this.handleRvalue(event.target.value) }}
                                />
                            </div>
                            <span style={{ ...regularFont, ...styles.generalFont }}>R-Value</span>
                        </div>

                        {this.showpavementids()}

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                        value={this.getTI()}
                                        onChange={event => { this.handleTI(event.target.value) }}
                                    />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>T.I. Traffic Index</span>
                            </div>

                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                        value={this.getUse()}
                                        onChange={event => { this.handleUse(event.target.value) }}
                                    />
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>Use</span>
                            </div>


                        </div>






                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>GE Required (in): {this.calcGERequired()}</span>
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                        value={this.getAC()}
                                        onChange={event => { this.handleAC(event.target.value) }} />
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>
                                        A.C. (in)
                                    </span>
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>
                                    {this.calcGF()}
                                </span>

                            </div>

                            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.flex1 }}>

                                    <div style={{ ...styles.generalContainer }}>
                                        <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                            value={this.getPCC()}
                                            onChange={event => { this.handlePCC(event.target.value) }} />
                                    </div>
                                    <div style={{ ...styles.generalContainer }}>
                                        <span style={{ ...regularFont, ...styles.generalFont }}>
                                            P.C.C. (in)
                                        </span>
                                    </div>
                                    <div style={{ ...styles.generalContainer }}>
                                        <span style={{ ...regularFont, ...styles.generalFont }}>
                                            1.8
                                        </span>
                                    </div>


                                </div>
                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                        value={this.getAB()}
                                        onChange={event => { this.handleAB(event.target.value) }}
                                    />
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>A.B. (in)</span>
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>G.F. 1.1</span>
                            </div>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.mediumwidth, ...regularFont, ...styles.generalFont }}
                                        value={this.getAS()}
                                        onChange={event => { this.handleAS(event.target.value) }} />
                                </div>
                                <div style={{ ...styles.generalContainer }}>
                                    <span style={{ ...regularFont, ...styles.generalFont }}>A.S. (in)</span>
                                </div>
                                <span style={{ ...regularFont, ...styles.generalFont }}>G.F. 1.0</span>
                            </div>



                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>GE Design (in): {this.calcGEDesign()}</span>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont, ...styles.generalFont }}>Factor of Safety:{this.calcFS()}</span>
                        </div>

                        {this.showPavementSections()}



                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { this.savePavement() }}>{saveIcon()}</button>
                        </div>



                    </div>

                )

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
        pavement: state.pavement
    }
}

export default connect(mapStateToProps, actions)(Pavement);



