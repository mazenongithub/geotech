import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, linkArrow, saveIcon, dropdownIcon } from './svg'
import { LoadProposals, SaveProposals } from './actions/api';
// import Investigation from './investigation'
import Sections from './sections';
import SectionList from './sectionlist';
import { newProposal, currentDate, newSection, newList, inputUTCStringForLaborID, newSubSection } from './functions';
import MakeID from './makeids';
import Spinner from './spinner';
import SubSections from './subsection';



class Proposals extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activesectionid: false, activesubsectionid: '', dateproposal: currentDate(), intro: '', sectionname: '', sectioncontent: '', activesectionlistid: false, spinner: false

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }




    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const clients = ues.getClients.call(this)
        const proposals = ues.getProposals.call(this)
        if (!projects) {
            ues.loadProjects.call(this);
        }

        if (!clients) {
            ues.loadClients.call(this)
        }

        if (!proposals) {

            this.loadProposals()

        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async loadProposals() {

        try {
            let response = await LoadProposals();
            if (response.hasOwnProperty("proposals")) {
                this.props.reduxProposals(response.proposals)
                this.setState({ render: 'render' })

            }

        } catch (err) {
            alert(err)
        }

    }

    getProposalNumber() {
        const ues = new UES();
        let proposalnumber = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                proposalnumber = proposal.proposalnumber;
            }
        }

        return proposalnumber;

    }

    handleProposalNumber(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let proposals = ues.getProposals.call(this)
        if (this.state.activeproposalid) {

            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {

                const i = ues.getProposalKeyByID.call(this, proposalid)
                proposals[i].proposalnumber = value
                this.props.reduxProposals(proposals)
                this.setState({ render: 'render' })
            }
        } else {
            let proposalid = makeid.proposalid.call(this)
            const projectid = this.props.projectid;
            const dateproposal = this.state.dateproposal;
            const intro = this.state.intro;
            const newproposal = newProposal(proposalid, projectid, dateproposal, value, intro)

            if (proposals) {
                proposals.push(newproposal)

            } else {
                proposals = [newproposal]

            }
            this.props.reduxProposals(proposals)
            this.setState({ activeproposalid: proposalid })
        }

    }

    getDateProposal() {
        const ues = new UES();
        let dateproposal = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                dateproposal = proposal.dateproposal;
            }
        } else {
            dateproposal = currentDate()
        }

        return dateproposal;

    }

    handleDateProposal(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let proposals = ues.getProposals.call(this)
        if (this.state.activeproposalid) {

            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {

                const i = ues.getProposalKeyByID.call(this, proposalid)
                proposals[i].dateproposal = value
                this.props.reduxProposals(proposals)
                this.setState({ render: 'render' })
            }
        } else {
            let proposalid = makeid.proposalid.call(this)
            const projectid = this.props.projectid;
            const intro = this.state.intro;
            const proposalnumber = this.state.proposalnumber;
            const newproposal = newProposal(proposalid, projectid, value, proposalnumber, intro)

            if (proposals) {
                proposals.push(newproposal)

            } else {
                proposals = [newproposal]

            }
            this.props.reduxProposals(proposals)
            this.setState({ activeproposalid: proposalid })
        }

    }

    getIntro() {
        const ues = new UES();
        let intro = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                intro = proposal.intro;
            }
        }

        return intro;

    }

    handleIntro(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let proposals = ues.getProposals.call(this)
        if (this.state.activeproposalid) {

            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {

                const i = ues.getProposalKeyByID.call(this, proposalid)
                proposals[i].intro = value
                this.props.reduxProposals(proposals)
                this.setState({ render: 'render' })
            }
        } else {
            let proposalid = makeid.proposalid.call(this)
            const projectid = this.props.projectid;
            const dateproposal = this.state.dateproposal;
            const proposalnumber = this.state.proposalnumber;
            const newproposal = newProposal(proposalid, projectid, dateproposal, proposalnumber, value)

            if (proposals) {
                proposals.push(newproposal)

            } else {
                proposals = [newproposal]

            }
            this.props.reduxProposals(proposals)
            this.setState({ activeproposalid: proposalid })
        }

    }



    showProposalIDs() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const proposals = ues.getProposalsbyProjectID.call(this, projectid)
        let ids = [];
        if (proposals) {
            // eslint-disable-next-line
            proposals.map(proposal => {

                ids.push(this.showProposal(proposal))

            })
        }

        return ids;

    }

    removeProposal(proposalid) {
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                proposals.splice(i, 1)
                this.props.reduxProposals(proposals)
                this.setState({ render: 'render' })
            }
        }
    }

    handleProposalID(proposalid) {
        if (this.state.activeproposalid) {
            if (this.state.activeproposalid === proposalid) {
                this.setState({ activeproposalid: false, activesectionid: false })
            } else {
                this.setState({ activeproposalid: proposalid, activesectionid: false })
            }

        } else {
            this.setState({ activeproposalid: proposalid, activesectionid: false })
        }
    }

    showProposal(proposal) {

        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)
        const headerFont = ues.headerFont.call(this)
        const arrowWidth = ues.arrowWidth.call(this);
        const myuser = ues.checkUser.call(this)
        const projectid = this.props.projectid;

        const highlight = (proposalid) => {
            if (this.state.activeproposalid === proposalid) {
                return (styles.activeid)
            }
        }

    
        const project = ues.getProjectbyID.call(this, projectid)



        if (project) {

            

            const activemenu = () => {
                if (this.state.activeproposalid === proposal.proposalid) {
                    return (<div style={{ ...styles.generalContainer }}>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/proposals/${proposal.proposalid}`}><button style={{ ...styles.generalButton, ...iconWidth }}>{dropdownIcon()}</button> View Proposal </Link>
                        </div>
                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/proposals/${proposal.proposalid}/costestimate`}><button style={{ ...styles.generalButton, ...iconWidth }}>{dropdownIcon()}</button> Cost Estimate </Link>
                        </div>
                    </div>)
                }
            }


            return (
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} key={proposal.proposalid}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex5, ...styles.generalFont, ...highlight(proposal.proposalid) }} onClick={() => { this.handleProposalID(proposal.proposalid) }}>

                            <div style={{ ...styles.generalContainer }}>
                                <span style={{ ...regularFont }}>
                                    {proposal.dateproposal}  {proposal.proposalnumber}
                                </span>
                            </div>


                        </div>
                        <div style={{ ...styles.flex1 }}>

                            <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeProposal(proposal.proposalid) }}>{removeIcon()}</button>

                        </div>
                    </div>

                    {activemenu()}

                </div>
            )

        }



    }


    getSectionName() {
        let sectionname = "";
        const ues = new UES();
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;

            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;
                const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                sectionname = section.sectionname;
            }
        }

        return sectionname;


    }

    handleSectionName(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        let sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)
                            proposals[i].sections[j].sectionname = value;
                            this.props.reduxProposals(proposals)
                            this.setState({ render: 'render' })
                        }

                    } else {

                        const sectionid = makeid.proposalid.call(this)
                        const content = this.state.content;
                        const newsection = newSection(sectionid, value, content)
                        if (proposal.hasOwnProperty("sections")) {
                            proposals[i].sections.push(newsection)

                        } else {
                            proposals[i].sections = [newsection]

                        }
                        this.props.reduxProposals(proposals)
                        this.setState({ activesectionid: sectionid })
                    }
                }
            }
        }

    }

    getSectionContent() {
        let sectioncontent = "";
        const ues = new UES();
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;

            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;
                const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                sectioncontent = section.content;
            }
        }

        return sectioncontent;


    }

    handleSectionContent(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        let sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)
                            proposals[i].sections[j].content = value;
                            this.props.reduxProposals(proposals)
                            this.setState({ render: 'render' })
                        }

                    } else {

                        const sectionid = makeid.proposalid.call(this)
                        const sectionname = this.state.sectionname;
                        const newsection = newSection(sectionid, sectionname, value)
                        if (proposal.hasOwnProperty("sections")) {
                            proposals[i].sections.push(newsection)

                        } else {
                            proposals[i].sections = [newsection]

                        }
                        this.props.reduxProposals(proposals)
                        this.setState({ activesectionid: sectionid })
                    }
                }
            }
        }

    }

    removeSection(sectionid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);

                    const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                    if (section) {
                        const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)
                        proposals[i].sections.splice(j, 1);
                        this.props.reduxProposals(proposals)
                        this.setState({ activesectionid: false, activesectionlistid: false })
                    }


                }
            }
        }


    }

    moveSectionUp(sectionid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);

                    const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                    if (section) {
                        const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                        const sectioncount = proposals[i].sections.length;

                        if (sectioncount > 1 && j > 0) {
                            const section_1 = proposals[i].sections[j - 1];
                            proposals[i].sections[j] = section_1;
                            proposals[i].sections[j - 1] = section;
                            this.props.reduxProposals(proposals)
                            this.setState({ render: 'render' })

                        }



                    }


                }
            }
        }

    }

    moveSectionDown(sectionid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);

                    const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                    if (section) {
                        const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                        const sectioncount = proposals[i].sections.length;

                        if (sectioncount > 1 && j < sectioncount - 1) {
                            const section_1 = proposals[i].sections[j + 1];
                            proposals[i].sections[j] = section_1;
                            proposals[i].sections[j + 1] = section;
                            this.props.reduxReports(proposals);
                            this.setState({ render: 'render' })

                        }



                    }


                }
            }
        }

    }


    showSectionIDs() {
        const sections = new Sections()
        const ues = new UES();
        let ids = [];
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                if (proposal.hasOwnProperty("sections")) {
                    // eslint-disable-next-line
                    proposal.sections.map(section => {
                        ids.push(sections.showSectionID.call(this, section))
                    })
                }
            }
        }

        return ids;

    }

    showSectionListIDs() {
        const ues = new UES();
        const sectionlist = new SectionList();
        let ids = [];
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;
                const lists = ues.getProposalSectionList.call(this, proposalid, sectionid)
                if (lists) {
                    // eslint-disable-next-line
                    lists.map(list => {

                        ids.push(sectionlist.showListID.call(this, list))

                    })

                }

            }
        }
        return ids;

    }

    getSectionList() {
        const ues = new UES();
        let getlist = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;

                if (this.state.activesectionlistid) {
                    const listid = this.state.activesectionlistid;
                    const list = ues.getProposalSectionListbyID.call(this, proposalid, sectionid, listid)

                    if (list) {
                        getlist = list.list;
                    }

                }


            }

        }
        return getlist;

    }

    handleSectionList(value) {
        const makeid = new MakeID();
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid)
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid)
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)
                            if (this.state.activesectionlistid) {
                                const listid = this.state.activesectionlistid;
                                const list = ues.getProposalSectionListbyID.call(this, proposalid, sectionid, listid)

                                if (list) {
                                    const k = ues.getProposalSectionListKeybyID.call(this, proposalid, sectionid, listid)
                                    proposals[i].sections[j].list[k].list = value;
                                    this.props.reduxProposals(proposals)
                                    this.setState({ render: 'render' })
                                }

                            } else {
                                const listid = makeid.proposalid.call(this)
                                const newlist = newList(listid, value)

                                if (section.hasOwnProperty("list")) {
                                    proposals[i].sections[j].list.push(newlist)

                                } else {
                                    proposals[i].sections[j].list = [newlist]

                                }
                                this.props.reduxProposals(proposals)
                                this.setState({ activesectionlistid: listid })
                            }
                        }
                    }
                }
            }
        }




    }

    removeSectionList(listid) {
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid)
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid)
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                            const list = ues.getProposalSectionListbyID.call(this, proposalid, sectionid, listid)

                            if (list) {
                                const k = ues.getProposalSectionListKeybyID.call(this, proposalid, sectionid, listid)
                                proposals[i].sections[j].list.splice(k, 1);
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }


                        }
                    }
                }
            }
        }

    }

    moveSectionListUp(listid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);

                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;

                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {

                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                            const list = ues.getProposalSectionListbyID.call(this, proposalid, sectionid, listid)

                            if (list) {
                                const k = ues.getProposalSectionListKeybyID.call(this, proposalid, sectionid, listid)

                                const listcount = proposals[i].sections[j].list.length;



                                if (listcount > 1 && k > 0) {
                                    const section_1 = proposals[i].sections[j].list[k - 1];
                                    proposals[i].sections[j].list[k] = section_1;
                                    proposals[i].sections[j].list[k - 1] = list;
                                    this.props.reduxProposals(proposals)
                                    this.setState({ render: 'render' })

                                }



                            }

                        }


                    }


                }
            }
        }

    }

    moveSectionListDown(listid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                            const list = ues.getProposalSectionListbyID.call(this, proposalid, sectionid, listid)

                            if (list) {
                                const k = ues.getProposalSectionListKeybyID.call(this, proposalid, sectionid, listid)

                                const listcount = proposals[i].sections[j].list.length;

                                if (listcount > 1 && j < listcount - 1) {
                                    const section_1 = proposals[i].sections[j].list[k + 1];
                                    proposals[i].sections[j].list[k] = section_1;
                                    proposals[i].sections[j].list[k + 1] = list;
                                    this.props.reduxReports(proposals);
                                    this.setState({ render: 'render' })

                                }

                            }



                        }

                    }


                }
            }
        }


    }

    async saveProposals() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid)
        if (project) {
            const project_id = project._id;
            const proposals = ues.getProposalsbyProjectID.call(this, projectid)


            if (proposals) {

                try {
                    this.setState({spinner:true})
                    let response = await SaveProposals({ project_id, proposals })
             
                    if (response.hasOwnProperty("proposals")) {
                        this.props.reduxProposals(response.proposals)
                    }
                    let message = "";
                    if (response.hasOwnProperty("message")) {
                        message = response.message;
                    }

                    if (response.hasOwnProperty("lastupdated")) {
                        message += `Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                    }

                    this.setState({ message, spinner: false })


                } catch (err) {
                    this.setState({ spinner: false })
                    alert(err)
                }





            }
        }
    }

    moveSubSectionUp(subsectionid) {
        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                            const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid);

                            if (subsection) {

                                const k = ues.getProposalSubSectionKeyByID.call(this, proposalid, sectionid, subsectionid)

                                const sectioncount = proposals[i].sections[j].subsections.length;

                                if (sectioncount > 1 && k > 0) {
                                    const section_1 = proposals[i].sections[j].subsections[k - 1];
                                    proposals[i].sections[j].subsections[k] = section_1;
                                    proposals[i].sections[j].subsections[k - 1] = subsection;
                                    this.props.reduxProposals(proposals)
                                    this.setState({ render: 'render' })

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

        const proposals = ues.getProposals.call(this)
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;

                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid)
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid)

                            const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid);

                            if (subsection) {

                                const k = ues.getProposalSubSectionKeyByID.call(this, proposalid, sectionid, subsectionid)

                                const sectioncount = proposals[i].sections[j].subsections.length;

                                if (sectioncount > 1 && k < sectioncount - 1) {
                                    const section_1 = proposals[i].sections[j].subsections[k + 1];
                                    proposals[i].sections[j].subsections[k] = section_1;
                                    proposals[i].sections[j].subsections[k + 1] = subsection;
                                    this.props.reduxReports(proposals);
                                    this.setState({ render: 'render' })

                                }


                            }



                        }

                    }


                }
            }
        }

    }

    getSubSectionName() {
        const ues = new UES();
        let sectionname = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;

                if (this.state.activesubsectionid) {
                    const subsectionid = this.state.activesubsectionid;
                    const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid)
                    if (subsection) {
                        sectionname = subsection.sectionname;
                    }




                }


            }

        }
        return sectionname;

    }

    handleSubSectionName(value) {
        const ues = new UES();
        const proposals = ues.getProposals.call(this);
        const makeid = new MakeID();
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid);
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid);

                            if (this.state.activesubsectionid) {
                                const subsectionid = this.state.activesubsectionid;
                                const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid)
                                if (subsection) {
                                    const k = ues.getProposalSubSectionKeyByID.call(this, proposalid, sectionid, subsectionid)
                                    proposals[i].sections[j].subsections[k].sectionname = value;
                                    this.props.reduxProposals(proposals)
                                    this.setState({ render: 'render' })

                                }

                            } else {
                                const subsectionid = makeid.proposalid.call(this);
                                const content = this.state.content;
                                const newsubsection = newSubSection(subsectionid, value, content)
                                if (section.hasOwnProperty("subsections")) {
                                    proposals[i].sections[j].subsections.push(newsubsection)

                                } else {
                                    proposals[i].sections[j].subsections = [newsubsection]
                                }
                                this.props.reduxProposals(proposals)
                                this.setState({ activesubsectionid: subsectionid })
                            }


                        }
                    }

                }
            }

        }

    }

    getSubSectionContent() {
        const ues = new UES();
        let content = "";
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;

                if (this.state.activesubsectionid) {
                    const subsectionid = this.state.activesubsectionid;
                    const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid)
                    if (subsection) {
                        content = subsection.content;
                    }




                }


            }

        }
        return content;

    }

    handleSubSectionContent(value) {
        const ues = new UES();
        const proposals = ues.getProposals.call(this);
        const makeid = new MakeID();
        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid);
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid);

                            if (this.state.activesubsectionid) {
                                const subsectionid = this.state.activesubsectionid;
                                const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid)
                                if (subsection) {
                                    const k = ues.getProposalSubSectionKeyByID.call(this, proposalid, sectionid, subsectionid)
                                    proposals[i].sections[j].subsections[k].content = value;
                                    this.props.reduxProposals(proposals)
                                    this.setState({ render: 'render' })

                                }

                            } else {
                                const subsectionid = makeid.proposalid.call(this);
                                const sectionname = this.state.sectionname;
                                const newsubsection = newSubSection(subsectionid, sectionname, value)
                                if (section.hasOwnProperty("subsections")) {
                                    proposals[i].sections[j].subsections.push(newsubsection)

                                } else {
                                    proposals[i].sections[j].subsections = [newsubsection]
                                }
                                this.props.reduxProposals(proposals)
                                this.setState({ activesubsectionid: subsectionid })
                            }


                        }
                    }

                }
            }

        }

    }

    removeSubSection(subsectionid) {

        const ues = new UES();
        const proposals = ues.getProposals.call(this);

        if (proposals) {
            if (this.state.activeproposalid) {
                const proposalid = this.state.activeproposalid;
                const proposal = ues.getProposalByID.call(this, proposalid);
                if (proposal) {
                    const i = ues.getProposalKeyByID.call(this, proposalid);
                    if (this.state.activesectionid) {
                        const sectionid = this.state.activesectionid;
                        const section = ues.getProposalSectionByID.call(this, proposalid, sectionid);
                        if (section) {
                            const j = ues.getProposalSectionKeyByID.call(this, proposalid, sectionid);


                            const subsection = ues.getProposalSubSectionByID.call(this, proposalid, sectionid, subsectionid)
                            if (subsection) {
                                const k = ues.getProposalSubSectionKeyByID.call(this, proposalid, sectionid, subsectionid)
                                proposals[i].sections[j].subsections.splice(k, 1)
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })

                            }




                        }
                    }

                }
            }

        }

    }

    showSubSectionIDs() {
        const ues = new UES();
        let ids = [];
        const subsection = new SubSections();
        if (this.state.activeproposalid) {
            const proposalid = this.state.activeproposalid;
            if (this.state.activesectionid) {
                const sectionid = this.state.activesectionid;
                const subsections = ues.getProposalSubSections.call(this, proposalid, sectionid)

                if (subsections) {
                    // eslint-disable-next-line
                    subsections.map(section => {
                        ids.push(subsection.showSubSectionID.call(this, section))
                    })
                }
            }
            return ids;
        }

    }







    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const regularFont = ues.regularFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)


        const showSaveIcon = () => {
            if (this.state.spinner) {

                return (<Spinner />)


            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { this.saveProposals() }}>{saveIcon()}</button>
                </div>)

            }
        }


        const sections = new Sections();
        const sectionlist = new SectionList();
        const subsections = new SubSections();

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
                                    <input type="date" style={{ ...styles.generalFont, ...regularFont }}
                                        value={this.getDateProposal()}
                                        onChange={event => { this.handleDateProposal(event.target.value) }} />
                                </div>
                                <span style={{ ...styles.generalFont, ...regularFont }}> Date of Proposal</span>
                            </div>

                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer }}>
                                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.mediumwidth }}
                                        value={this.getProposalNumber()}
                                        onChange={event => { this.handleProposalNumber(event.target.value) }} />
                                </div>
                                <span style={{ ...styles.generalFont, ...regularFont }}>Proposal Number</span>

                            </div>

                        </div>

                        {this.showProposalIDs()}



                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}
                                value={this.getIntro()}
                                onChange={event => { this.handleIntro(event.target.value) }}
                            />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Intro</span>
                        </div>


                        {sections.showSections.call(this)}

                        {sectionlist.showSectionList.call(this)}

                        {subsections.showSubSections.call(this)}

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <span style={{ ...regularFont }}>{this.state.message}</span>

                        </div>
                        {showSaveIcon()}





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
        projects: state.projects,
        proposals: state.proposals
    }
}

export default connect(mapStateToProps, actions)(Proposals);