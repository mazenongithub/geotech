import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { saveIcon } from './svg';
import { newSieve } from './functions';

class Sieve extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', wgt34: '', wgt38: '', wgt4: '', wgt10: '', wgt30: '', wgt40: '', wgt100: '', wgt200: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const projectid = this.props.projectid;

        if (!projects) {
            ues.loadProjects.call(this);
        }

        const borings = ues.getBoringsbyProjectID.call(this, projectid)
        if (!borings) {
            ues.loadBorings.call(this, projectid)


        }




    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getWgt34() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt34 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt34 = sample.sieve.wgt34

            }
        }


        return wgt34;

    }

    handleWgt34(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt34 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })

                } else {
                    const wgt38 = this.state.wgt38;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, value, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })

                }
            }
        }

    }

    getWgt38() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt38 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt38 = sample.sieve.wgt38
    
            }
        }
    
    
        return wgt38;
    
    }
    
    handleWgt38(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt38 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, value, wgt4, wgt10, wgt30, wgt40, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }
    

    getWgt4() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt4 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt4 = sample.sieve.wgt4
    
            }
        }
    
    
        return wgt4;
    
    }
    
    handleWgt4(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt4 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, value, wgt10, wgt30, wgt40, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }

    getWgt10() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt10 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt10 = sample.sieve.wgt10
    
            }
        }
    
    
        return wgt10;
    
    }
    
    handleWgt10(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt10 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt4 = this.state.wgt4;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, wgt4, value, wgt30, wgt40, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }

    getWgt30() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt30 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt30 = sample.sieve.wgt30
    
            }
        }
    
    
        return wgt30;
    
    }
    
    handleWgt30(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt30 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, value, wgt40, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }
    

    getWgt40() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt40 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt40 = sample.sieve.wgt40
    
            }
        }
    
    
        return wgt40;
    
    }
    
    handleWgt40(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt40 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt100 = this.state.wgt100;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, value, wgt100, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }

    getWgt100() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt100 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt100 = sample.sieve.wgt100
    
            }
        }
    
    
        return wgt100;
    
    }
    
    handleWgt100(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt100 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt200 = this.state.wgt200;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, value, wgt200);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }

    getWgt200() {
        const ues = new UES();
        const boringid = this.props.boringid;
        const sampleid = this.props.sampleid;
        let wgt200 = "";
        const sample = ues.getSampleByID.call(this, boringid, sampleid)
        if (sample) {
            if (sample.hasOwnProperty("sieve")) {
                wgt200 = sample.sieve.wgt200
    
            }
        }
    
    
        return wgt200;
    
    }
    
    handleWgt200(value) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        const boringid = this.props.boringid;
        const boring = ues.getBoringbyID.call(this, boringid)
        if (boring) {
            const i = ues.getBoringKeybyID.call(this, boringid)
            const sampleid = this.props.sampleid;
            const sample = ues.getSampleByID.call(this, boringid, sampleid)
            if (sample) {
                const j = ues.getSampleKeyByID.call(this, boringid, sampleid)
                if (sample.hasOwnProperty("sieve")) {
                    borings[i].samples[j].sieve.wgt200 = value;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                } else {
                    const wgt34 = this.state.wgt34;
                    const wgt38 = this.state.wgt36;
                    const wgt4 = this.state.wgt4;
                    const wgt10 = this.state.wgt10;
                    const wgt30 = this.state.wgt30;
                    const wgt40 = this.state.wgt40;
                    const wgt100 = this.state.wgt100;
                    const newsieve = newSieve(sampleid, wgt34, wgt38, wgt4, wgt10, wgt30, wgt40, wgt100, value);
                    borings[i].samples[j].sieve = newsieve;
                    this.props.reduxBorings(borings)
                    this.setState({ render: 'render' })
    
                }
            }
        }
    
    }
    


    render() {

        const ues = new UES();

        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const buttonWidth = ues.generateIcon.call(this)
        if (myuser) {
            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const boringid = this.props.boringid;
                const boring = ues.getBoringbyID.call(this, boringid)

                if (boring) {

                    const sampleid = this.props.sampleid;
                    const sample = ues.getSampleByID.call(this, boringid, sampleid)
                    if (sample) {

                        return (

                            <div style={{ ...styles.generalContainer }}>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                        /{project.projectnumber} {project.title} </Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings`}>
                                        /borings</Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings/${boringid}/samples`}>
                                        /boring number {boring.boringnumber} samples</Link>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings/${boringid}/samples/${sample.sampleid}/sieve`}>
                                        /Sample {sample.depth} Sieve</Link>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont }}>&nbsp;</div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>Weight Retained (g)</div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>3/4"</div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt34()}
                                        onChange={event => { this.handleWgt34(event.target.value) }}
                                    /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>3/8"</div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt38()}
                                        onChange={event => { this.handleWgt38(event.target.value) }}
                                    /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 4</div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt4()}
                                        onChange={event => { this.handleWgt4(event.target.value) }} /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 10 </div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt10()}
                                        onChange={event => { this.handleWgt10(event.target.value) }}
                                    /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 30 </div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt30()}
                                        onChange={event => { this.handleWgt30(event.target.value) }}
                                    /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 40 </div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt40()}
                                        onChange={event => { this.handleWgt40(event.target.value) }} /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 100 </div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt100()}
                                        onChange={event => { this.handleWgt100(event.target.value) }} /> </div>
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.alignCenter }}>No. 200 </div>
                                    <div style={{ ...styles.flex2, ...styles.generalFont, ...headerFont, ...styles.boldFont }}><input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}
                                        value={this.getWgt200()}
                                        onChange={event => { this.handleWgt200(event.target.value) }}
                                    /> </div>
                                </div>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <span style={{ ...styles.generalFont, ...regularFont }}>&nbsp;{this.state.message}</span>
                                </div>

                                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { ues.saveBorings.call(this) }}>{saveIcon()}</button>
                                </div>

                            </div>
                        )

                    } else {

                        return (<div style={{ ...styles.generalContainer }}>

                            <span style={{ ...styles.generalFont, ...regularFont }}>Sample Not Found </span>
                        </div>)


                    }

                } else {

                    return (<div style={{ ...styles.generalContainer }}>

                        <span style={{ ...styles.generalFont, ...regularFont }}>Boring Not Found </span>
                    </div>)


                }

            } else {

                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
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
        borings: state.borings
    }
}

export default connect(mapStateToProps, actions)(Sieve);