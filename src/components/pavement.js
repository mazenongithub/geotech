import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { SavePavement } from './actions/api';
import { removeIcon, saveIcon } from './svg';
import { newPavement, inputUTCStringForLaborID, newPavementSection, newPavementService } from './functions';
import MakeID from './makeids';
import Spinner from './spinner'



class Pavement extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activesectionid: false, activepavementid: false, activeserviceid: false, sectionname: '', ti: '', rvalue: '', ab: '', ac: '', as: '', pcc: '', servicetype: '', spinner: false

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

    handleServiceID(serviceid) {

        if (this.state.activeserviceid) {
            if (this.state.activeserviceid === serviceid) {
                this.setState({ activeserviceid: false,  activepavementid:false })

            } else {
                this.setState({ activeserviceid: serviceid, activepavementid:false})
            }
        } else {
            this.setState({ activeserviceid: serviceid, activepavementid:false })
        }
    }

    handleSectionID(sectionid) {

        if (this.state.activesectionid) {
            if(sectionid === this.state.activesectionid) {
            this.setState({ activesectionid: false, activeserviceid:false, activepavementid:false })
            } else {
            this.setState({ activesectionid: sectionid,  activeserviceid:false, activepavementid:false  })
            }
        } else {
            this.setState({ activesectionid: sectionid, activeserviceid:false, activepavementid:false  })
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
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
                const project_id = project._id;
                const newpavement = newPavement(newsectionid, project_id, projectid, value, rvalue)
                if (pavements) {
                    pavements.push(newpavement)

                } else {
                    pavements = [newpavement]

                }
                this.setState({ activesectionid: newsectionid })

            }
        }

    }

    removeService(serviceid) {
        const ues = new UES()
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
               
             
                    const pavementservice = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (pavementservice) {

                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)
                        pavements[i].services.splice(j,1)
                        this.props.reduxPavement(pavements)
                        this.setState({ activeserviceid:false })

                    }


                
            }
        }

    }

    getTI() {
        const ues = new UES();
        let ti = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activeserviceid) {
                    const serviceid = this.state.activeserviceid
                    const pavementservice = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (pavementservice) {
                        ti = pavementservice.ti
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
                if (this.state.activeserviceid) {
                    const serviceid = this.state.activeserviceid
                    const pavementservice = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (pavementservice) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)
                        pavements[i].services[j].ti = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const serviceid = makeid.pavementSectionID.call(this);
                    const servicetype = this.state.servicetype;

                    const newpavementsection = newPavementService(serviceid, sectionid, servicetype, value)
                    if (pavement.hasOwnProperty("services")) {

                        pavement.services.push(newpavementsection)

                    } else {
                        pavement.services = [newpavementsection]

                    }
                    this.setState({ activeserviceid: serviceid })
                }
            }
        }

    }


    getServiceType() {
        const ues = new UES();
        let servicetype = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const section = ues.getPavementByID.call(this, sectionid)

            if (section) {
                if (this.state.activeserviceid) {
                    const serviceid = this.state.activeserviceid
                    const pavementservice = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (pavementservice) {
                        servicetype = pavementservice.servicetype
                    }

                }


            }
        }

        return servicetype;


    }

    handleServiceType(value) {
        const ues = new UES()
        const makeid = new MakeID();
        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {
                const i = ues.getPavementKeyByID.call(this, sectionid)
                if (this.state.activeserviceid) {
                    const serviceid = this.state.activeserviceid
                    const pavementservice = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (pavementservice) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)
                        pavements[i].services[j].servicetype = value;
                        this.props.reduxPavement(pavements)
                        this.setState({ render: 'render' })

                    }


                } else {
                    const serviceid = makeid.pavementSectionID.call(this);
                    const ti = this.state.ti;

                    const newpavementsection = newPavementService(serviceid, sectionid, value, ti)
                    if (pavement.hasOwnProperty("services")) {

                        pavement.services.push(newpavementsection)

                    } else {
                        pavement.services = [newpavementsection]

                    }
                    this.setState({ activeserviceid: serviceid })
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
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {

                const project_id = project._id;

                const newpavement = newPavement(newsectionid, project_id, projectid, sectionname, value)
                if (pavements) {
                    pavements.push(newpavement)

                } else {
                    pavements = [newpavement]

                }
                this.setState({ activesectionid: newsectionid })

            }
        }

    }




    getAC() {
        const ues = new UES();
        let ac = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;


            if (this.state.activeserviceid) {

                const serviceid = this.state.activeserviceid;

                const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                if (service) {



                    if (service) {

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                ac = pavementsection.ac
                            }

                        }


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

                if (this.state.activeserviceid) {

                    const serviceid = this.state.activeserviceid;

                    const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (service) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                const k = ues.getPavementSectionKeyByID.call(this, sectionid, serviceid, pavementid)
                                pavements[i].services[j].design[k].ac = value;
                                this.props.reduxPavement(pavements)
                                this.setState({ render: 'render' })

                            }


                        } else {
                            const pavementid = makeid.pavementSectionID.call(this)
                            const ab = this.state.ab;
                            const as = this.state.as;
                            const pcc = this.state.pcc;

                            const newpavementsection = newPavementSection(pavementid, serviceid, value, ab, as, pcc)
                            if (service.hasOwnProperty("design")) {

                                pavements[i].services[j].design.push(newpavementsection)

                            } else {
                                pavements[i].services[j].design = [newpavementsection]

                            }
                            this.props.reduxPavement(pavements)
                            this.setState({ activepavementid: pavementid })
                        }
                    }

                }

            }
        }

    }


    getPCC() {
        const ues = new UES();
        let pcc = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;


            if (this.state.activeserviceid) {

                const serviceid = this.state.activeserviceid;

                const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                if (service) {



                    if (service) {

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                pcc = pavementsection.pcc
                            }

                        }


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

                if (this.state.activeserviceid) {

                    const serviceid = this.state.activeserviceid;

                    const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (service) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                const k = ues.getPavementSectionKeyByID.call(this, sectionid, serviceid, pavementid)
                                pavements[i].services[j].design[k].pcc = value;
                                this.props.reduxPavement(pavements)
                                this.setState({ render: 'render' })

                            }


                        } else {
                            const pavementid = makeid.pavementSectionID.call(this)
                            const ab = this.state.ab;
                            const as = this.state.as;
                            const ac = this.state.ac;

                            const newpavementsection = newPavementSection(pavementid, serviceid, ac, ab, as, value)
                            if (service.hasOwnProperty("design")) {

                                pavements[i].services[j].design.push(newpavementsection)

                            } else {
                                pavements[i].services[j].design = [newpavementsection]

                            }
                            this.props.reduxPavement(pavements)
                            this.setState({ activepavementid: pavementid })
                        }
                    }

                }

            }
        }

    }




    getAB() {
        const ues = new UES();
        let ab = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;


            if (this.state.activeserviceid) {

                const serviceid = this.state.activeserviceid;

                const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                if (service) {



                    if (service) {

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                ab = pavementsection.ab
                            }

                        }


                    }

                }

            }
        }

        return ab;


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

                if (this.state.activeserviceid) {

                    const serviceid = this.state.activeserviceid;

                    const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (service) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                const k = ues.getPavementSectionKeyByID.call(this, sectionid, serviceid, pavementid)
                                pavements[i].services[j].design[k].ab = value;
                                this.props.reduxPavement(pavements)
                                this.setState({ render: 'render' })

                            }


                        } else {
                            const pavementid = makeid.pavementSectionID.call(this)
                            const pcc = this.state.pcc;
                            const as = this.state.as;
                            const ac = this.state.ac;

                            const newpavementsection = newPavementSection(pavementid, serviceid, ac, value, as, pcc)
                            if (service.hasOwnProperty("design")) {

                                pavements[i].services[j].design.push(newpavementsection)

                            } else {
                                pavements[i].services[j].design = [newpavementsection]

                            }
                            this.props.reduxPavement(pavements)
                            this.setState({ activepavementid: pavementid })
                        }
                    }

                }

            }
        }

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



    getAS() {
        const ues = new UES();
        let as = "";
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;


            if (this.state.activeserviceid) {

                const serviceid = this.state.activeserviceid;

                const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                if (service) {



                    if (service) {

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                as = pavementsection.as
                            }

                        }


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

                if (this.state.activeserviceid) {

                    const serviceid = this.state.activeserviceid;

                    const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (service) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)

                        if (this.state.activepavementid) {
                            const pavementid = this.state.activepavementid;
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                const k = ues.getPavementSectionKeyByID.call(this, sectionid, serviceid, pavementid)
                                pavements[i].services[j].design[k].as = value;
                                this.props.reduxPavement(pavements)
                                this.setState({ render: 'render' })

                            }


                        } else {
                            const pavementid = makeid.pavementSectionID.call(this)
                            const pcc = this.state.pcc;
                            const ab = this.state.ab;
                            const ac = this.state.ac;

                            const newpavementsection = newPavementSection(pavementid, serviceid, ac, ab, value, pcc)
                            if (service.hasOwnProperty("design")) {

                                pavements[i].services[j].design.push(newpavementsection)

                            } else {
                                pavements[i].services[j].design = [newpavementsection]

                            }
                            this.props.reduxPavement(pavements)
                            this.setState({ activepavementid: pavementid })
                        }
                    }

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
        console.log(pavement)
        if (pavement) {
            try {
                this.setState({ spinner: true })

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
                this.setState({ message, spinner: false })


            } catch (err) {

                alert(err)

                this.setState({ spinner: false })

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
        const ues = new UES()

        let pavements = ues.getPavement.call(this)
        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;

            const pavement = ues.getPavementByID.call(this, sectionid)
            if (pavement) {

                const i = ues.getPavementKeyByID.call(this, sectionid)

                if (this.state.activeserviceid) {

                    const serviceid = this.state.activeserviceid;

                    const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                    if (service) {
                        const j = ues.getPavementServiceKeyByID.call(this, sectionid, serviceid)

                    
                            const pavementsection = ues.getPavementSectionByID.call(this, sectionid, serviceid, pavementid)
                            if (pavementsection) {
                                const k = ues.getPavementSectionKeyByID.call(this, sectionid, serviceid, pavementid)
                                pavements[i].services[j].design.splice(k,1)
                                this.props.reduxPavement(pavements)
                                this.setState({ render: 'render' })

                            }


                        
                    }

                }

            }
        }

    }

    showPavementSections() {

        const ues = new UES();
        let getsections = [];

        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            if (this.state.activeserviceid) {
                const serviceid = this.state.activeserviceid;

                const service = ues.getPavementServiceByID.call(this, sectionid, serviceid)
                if (service) {

                    const pavement = ues.getPavementSections.call(this, sectionid, serviceid);
                    if (pavement) {
// eslint-disable-next-line
                        pavement.map(section => {

                            getsections.push(this.showPavementSection(section))

                        })

                    }

                }



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

    showServiceIDs() {

        const ues = new UES();
        let getids = [];

        if (this.state.activesectionid) {
            const sectionid = this.state.activesectionid;
            const services = ues.getPavementService.call(this, sectionid)

            if (services) {
                // eslint-disable-next-line
                services.map(service => {
                    getids.push(this.showServiceID(service))

                })
            }

        }
        return getids;

    }

    showServiceID(service) {

        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)

        const highlight = (serviceid) => {
            if (this.state.activeserviceid === serviceid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }} key={service.serviceid}>
                <div style={{ ...styles.flex5, ...highlight(service.serviceid) }} onClick={() => { this.handleServiceID(service.serviceid) }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}> TI:{service.ti} Service Type {service.servicetype}</span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeService(service.serviceid) }}>{removeIcon()}</button>
                </div>
            </div>
        )


    }

    showpavementservice() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        if(this.state.activesectionid) {
            return( <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.generalPadding, ...styles.bottomMargin15, ...styles.marginLeft15 }}>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>Pavement Service</span>
                </div>

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
                                value={this.getServiceType()}
                                onChange={event => { this.handleServiceType(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont, ...styles.generalFont }}>Service Type</span>
                    </div>


                </div>

                {this.showServiceIDs()}


                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <span style={{ ...regularFont, ...styles.generalFont }}>GE Required (in): {this.calcGERequired()}</span>
                </div>


            </div>)
        }
    }


    showPavementDesign() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)

        if(this.state.activeserviceid) {
            return(      <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.generalPadding, ...styles.bottomMargin15, ...styles.marginLeft30 }}>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                    <span style={{ ...regularFont }}>Pavement Design</span>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalFont }}
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

                   
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{  ...regularFont, ...styles.generalFont }}
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


            </div>
)
        }
    }




    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)

        const showSaveIcon = () => {
            if (this.state.spinner) {

                return (<Spinner />)

            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { this.savePavement() }}>{saveIcon()}</button>
                </div>)
            }
        }
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

                        <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.generalPadding, ...styles.bottomMargin15 }}>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                                <span style={{ ...regularFont }}>Pavement Section</span>
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


                        </div>


                       {this.showpavementservice()}


                      {this.showPavementDesign()}


                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                        </div>

                        {showSaveIcon()}



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



