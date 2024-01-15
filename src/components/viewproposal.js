
import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { formatDateReport } from './functions'

class ViewProposal extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activeproposalid: false, intro: '', activelistid: false, activesublistid: false, activegeneralid: false, activeconclusionid: false, activerecommendationid: false, content: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const clients = ues.getClients.call(this);
        const proposals = ues.getProposals.call(this)
        if (!projects) {
            ues.loadProjects.call(this);
        }

        if (!clients) {
            ues.loadClients.call(this)
        }

        if (!proposals) {
            ues.loadProposals.call(this)
        }



    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

   

    getProposal() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        const proposal = ues.getProposalByID.call(this,proposalid)
        return proposal;
    }


    showProposal() {
        const ues = new UES();

        const proposal = this.getProposal();
        let getproposal = [];
        if (proposal) {
            if (proposal.hasOwnProperty("sections")) {
                // eslint-disable-next-line
                proposal.sections.map((section, i) => {

                    let label = Number(i + 1).toFixed(1)
                    getproposal.push(ues.showSection.call(this,label, section))

                    
                    if (section.hasOwnProperty("list")) {

                        getproposal.push(ues.showList.call(this,section.list))

                    }

                    if (section.hasOwnProperty("subsections")) {
                        // eslint-disable-next-line
                        section.subsections.map((subsection, j) => {

                            let label_1 = `${Number(i + 1)}.${Number(j + 1)}`
                            getproposal.push(ues.showSubSection.call(this,label_1, subsection))

                        })



                    }



                })



            }



        }
        return getproposal;



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
                const proposalid = this.props.proposalid;
                const proposal = ues.getProposalByID.call(this, proposalid)
                if (proposal) {
                    return (<div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>
                        <div className={`noPrint`} style={{  ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                                /Projects </Link>
                        </div>
                        <div className={`noPrint`} style={{  ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                /{project.projectnumber} {project.title} </Link>
                        </div>

                        <div className={`noPrint`} style={{  ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals`}>
                                /Proposals </Link>
                        </div>
                        <div className={`noPrint`} style={{  ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals/${proposalid}`}>
                                /{formatDateReport(proposal.dateproposal)} </Link>
                        </div>
                        {ues.getClientBlock.call(this)}

                        {ues.getProjectBlock.call(this)}

                        <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                            <span style={{...regularFont }}>Proposal Number {proposal.proposalnumber}</span>
                        </div>

                        <div style={{...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15}}>
                            <span style={{...regularFont, ...styles.lineSpace}}>{proposal.intro}</span>
                        </div>

                        {this.showProposal()}

                    </div>)

                }
            }

        }

    }


}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        clients: state.clients,
        projects: state.projects,
        proposals: state.proposals
    }
}

export default connect(mapStateToProps, actions)(ViewProposal)