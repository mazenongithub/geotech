import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { generateIcon } from './svg'
import Investigation from './investigation'

class Proposals extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activeprojectid: '', projectnumber: '', title: '', address: '', city: '', description: '', clientid: '', projectstate: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const clients = ues.getClients.call(this)
        if (!projects) {
            ues.loadProjects.call(this);
        }

        if (!clients) {
            ues.loadClients.call(this)
        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    showSection(section) {
        return (<option value={section.section} key={section.section}>{section.section}</option>)
    }
    showProposalSections() {
        const ues = new UES();
        let getsections = [];
        const sections = ues.proposalSections();
        // eslint-disable-next-line
        sections.map(section => {
            getsections.push(this.showSection(section))


        })
        return getsections;
    }

    showSoilReport() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Soil Report</span> <button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
                <span style={{ ...styles.generalFont, ...regularFont }}>Item</span>
            </div>

            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.marginLeft15 }}>
                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
                <span style={{ ...styles.generalFont, ...regularFont }}>Sub-Item</span>
            </div>
        </div>)
    }

    showAssumptions() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
            <input type="text" style={{ ...styles.generalField, ...regularFont }} />
            <span style={{ ...styles.generalFont, ...regularFont }}>Assumptions</span>
        </div>)
    }

    showFee() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <input type="text" style={{ ...styles.small, ...regularFont, ...styles.generalFont }} />
            <div style={{ ...styles.generalContainer }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Fee</span>
            </div>
        </div>)
    }

    showHistoricalReview() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.addMargin, ...styles.showBorder, ...styles.generalPadding }}>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Plan Review</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <input type="text" style={{ ...styles.generalField, ...regularFont }} />
            </div>
        </div>)
    }

    showPlanReview() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.addMargin, ...styles.showBorder, ...styles.generalPadding }}>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Plan Review</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <input type="text" style={{ ...styles.generalField, ...regularFont }} />
            </div>
        </div>)
    }

    showUpdateReport() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.flex1, ...styles.addMargin, ...styles.showBorder, ...styles.generalPadding }}>

            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>Update Report</span>
            </div>
            <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                <input type="text" style={{ ...styles.generalField, ...regularFont }} />
            </div>
        </div>
        )
    }

    showSchedule() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        
        return(<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
        <div style={{ ...styles.flex1, ...styles.addMargin }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
            <span style={{ ...styles.generalFont, ...regularFont }}>Field Investigation</span>
        </div>
        <div style={{ ...styles.flex1, ...styles.addMargin }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
            <span style={{ ...styles.generalFont, ...regularFont }}>Duration</span>
        </div>
        <div style={{ ...styles.flex1, ...styles.addMargin }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
            <span style={{ ...styles.generalFont, ...regularFont }}>Lab Testing</span>
        </div>
        <div style={{ ...styles.flex1, ...styles.addMargin }}>
            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} />
            <span style={{ ...styles.generalFont, ...regularFont }}>Report</span>
        </div>
    </div>)
    }

    showCPT() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return( <div style={{ ...styles.flex1 }}>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...styles.generalFont, ...regularFont }}>CPT</span> 
            </div>
            <div style={{ ...styles.generalContainer }}>
                <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }} />
                <span style={{ ...styles.generalFont, ...regularFont }}>Depth</span>
            </div>
        </div>)
    }


    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const regularFont = ues.regularFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        const investigation = new Investigation()

        if (myuser) {
            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                                /Projects </Link>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                /{project.projectnumber} {project.title} </Link>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals`}>
                                /Proposals </Link>
                        </div>

                        <div style={{ ...styles.generalFlex }}>

                            <div style={{ ...styles.flex1, ...styles.bottomMargin15 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="date" style={{ ...styles.generalFont, ...regularFont }} />
                                </div>
                                <span style={{ ...styles.generalFont, ...regularFont }}> Date of Proposal</span>
                            </div>

                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.mediumwidth }} />
                                </div>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Proposal Number</span>

                            </div>

                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex5 }}>&nbsp;</div>
                            <div style={{ ...styles.flex1 }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}></textarea>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Intro</span>
                        </div>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex5 }}>&nbsp;</div>
                            <div style={{ ...styles.flex1 }}><button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button></div>
                        </div>
                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <select style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }}>
                                <option value="">Select  A Section</option>
                                {this.showProposalSections()}
                            </select>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                            <input type="text" style={{ ...styles.generalField, ...regularFont }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Section Name</span>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}></textarea>
                            <span style={{ ...styles.generalFont, ...regularFont }}>Content</span>
                        </div>









                        {investigation.showInvestigation.call(this)}



                    </div>
                )

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
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(Proposals);