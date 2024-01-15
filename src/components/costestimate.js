import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { formatDateReport, newCostGroup, newLineItem, inputUTCStringForLaborID, calcAmount, calcFieldAmount } from './functions'
import { removeIcon, arrowUp, arrowDown, saveIcon } from './svg';
import MakeID from './makeids';
import Spinner from './spinner';
import { SaveEstimate } from './actions/api';


class CostEstimate extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activegroupid: false, groupname: '', activelineid: false, overhead: '', unit: '', unitprice: '', quantity: '', lineitem: ''

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

    showGroupIDs() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        const proposal = ues.getProposalByID.call(this, proposalid)
        let groupids = [];
        if (proposal) {
            if (proposal.hasOwnProperty("costestimate")) {
                // eslint-disable-next-line
                proposal.costestimate.map(group => {
                    groupids.push(this.showGroupID(group))

                })
            }
        }
        return groupids;



    }

    handleGroupID(groupid) {
        if (this.state.activegroupid) {
            if (this.state.activegroupid === groupid) {
                this.setState({ activegroupid: false })
            } else {
                this.setState({ activegroupid: groupid })
            }

        } else {
            this.setState({ activegroupid: groupid })
        }

    }

    moveGroupUp(groupid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {

            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid);
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid);

                const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                if (group) {
                    const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)

                    const groupcount = proposals[i].costestimate.length;

                    if (groupcount > 1 && j > 0) {
                        const group_1 = proposals[i].costestimate[j - 1];
                        proposals[i].costestimate[j] = group_1;
                        proposals[i].costestimate[j - 1] = group;
                        this.props.reduxProposals(proposals)
                        this.setState({ render: 'render' })

                    }



                }


            }

        }

    }

    moveGroupDown(groupid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {

            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid);
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid);

                const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                if (group) {
                    const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)

                    const groupcount = proposals[i].costestimate.length;

                    if (groupcount > 1 && j < groupcount - 1) {
                        const group_1 = proposals[i].costestimate[j + 1];
                        proposals[i].costestimate[j] = group_1;
                        proposals[i].costestimate[j + 1] = group;
                        this.props.reduxReports(proposals);
                        this.setState({ render: 'render' })

                    }



                }


            }

        }

    }

    removeGroup(groupid) {

        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)

                const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                if (group) {
                    const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                    proposals[i].costestimate.splice(j, 1)
                    this.props.reduxProposals(proposals)
                    this.setState({ render: 'render' })
                }


            }


        }
    }
    getProposal() {
        const ues = new UES();
        let proposalid = this.props.proposalid;
        const proposal = ues.getProposalByID.call(this, proposalid)
        return proposal;
    }

    getGroupName() {
        const ues = new UES();
        const proposal = this.getProposal();
        const proposalid = this.props.proposalid;
        let groupname = "";
        if (proposal) {
            if (this.state.activegroupid) {

                const groupid = this.state.activegroupid;
                const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                if (group) {
                    groupname = group.groupname;
                }
            }
        }
        return groupname;

    }

    handleGroupName(value) {
        const makeid = new MakeID();
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    let groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        proposals[i].costestimate[j].groupname = value;
                        this.props.reduxProposals(proposals)
                        this.setState({ render: 'render' })
                    }

                } else {
                    let groupid = makeid.proposalid.call(this)
                    const newgroup = newCostGroup(groupid, proposalid, value)
                    if (proposal.hasOwnProperty("costestimate")) {
                        proposals[i].costestimate.push(newgroup)

                    } else {
                        proposals[i].costestimate = [newgroup]
                    }
                    this.props.reduxProposals(proposals)

                    this.setState({ activegroupid: groupid })
                }
            }


        }

    }

    showGroupID(group) {



        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (groupid) => {
            if (this.state.activegroupid === groupid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont }} key={group.groupid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(group.groupid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { this.handleGroupID.call(this, group.groupid) }}>{group.groupname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveGroupUp(group.groupid) }} >{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveGroupDown(group.groupid) }} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeGroup(group.groupid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)



    }

    showLineIDs() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let getids = [];
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
            if (group) {
                if (group.hasOwnProperty("lineitems")) {
                    // eslint-disable-next-line
                    group.lineitems.map(item => {
                        getids.push(this.showLineID(item))
                    })

                }

            }
        }
        return getids;

    }

    moveLineUp(lineid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {

            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid);
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid);
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                    if (group) {


                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)

                        const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                        if (lineitem) {
                            const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                            const linecount = proposals[i].costestimate[j].lineitems.length;

                            if (linecount > 1 && k > 0) {
                                const group_1 = proposals[i].costestimate[j].lineitems[k - 1];
                                proposals[i].costestimate[j].lineitems[k] = group_1;
                                proposals[i].costestimate[j].lineitems[k - 1] = lineitem
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })

                            }


                        }



                    }

                }


            }

        }


    }

    moveLineDown(lineid) {

        const ues = new UES();

        const proposals = ues.getProposals.call(this)
        if (proposals) {

            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid);
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid);
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid)
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                        if (lineitem) {
                            const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                            const linecount = proposals[i].costestimate[j].lineitems.length;

                            if (linecount > 1 && k < linecount - 1) {
                                const group_1 = proposals[i].costestimate[j].lineitems[k + 1];
                                proposals[i].costestimate[j].lineitems[k] = group_1;
                                proposals[i].costestimate[j].lineitems[k + 1] = lineitem;
                                this.props.reduxReports(proposals);
                                this.setState({ render: 'render' })

                            }

                        }



                    }


                }

            }

        }


    }

    removeLine(lineid) {
        const ues = new UES();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)

                        const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                        if (lineitem) {
                            const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                            proposals[i].costestimate[j].lineitems.splice(k, 1)
                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid:false })
                        }


                    }
                }
            }
        }

    }




    handleLineID(lineid) {
        if (this.state.activelineid) {
            if (this.state.activelineid === lineid) {
                this.setState({ activelineid: false })
            } else {
                this.setState({ activelineid: lineid })
            }

        } else {
            this.setState({ activelineid: lineid })
        }

    }

    showLineID(line) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (lineid) => {
            if (this.state.activelineid === lineid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} key={line.lineid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(line.lineid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { this.handleLineID.call(this, line.lineid) }}>{line.lineitem} Quantity {line.quantity} Unit {line.unit} Unit Price {line.unitprice} Overhead {line.overhead}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveLineUp(line.lineid) }} >{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveLineDown(line.lineid) }} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeLine(line.lineid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)


    }

    getQuantity() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let quantity = "";
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            if (this.state.activelineid) {
                const lineid = this.state.activelineid;

                const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                if (lineitem) {
                    quantity = lineitem.quantity;
                }
            }
        }
        return quantity;

    }

    handleQuantity(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        if (this.state.activelineid) {
                            let lineid = this.state.activelineid;
                            const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                            if (lineitem) {
                                const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                                proposals[i].costestimate[j].lineitems[k].quantity = value;
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let lineid = makeid.proposalid.call(this)
                            const lineitem = this.state.lineitem;
                            const unit = this.state.unit;
                            const unitprice = this.state.unitprice;
                            const overhead = this.state.overhead;
                            const newline = newLineItem(lineid, groupid, lineitem, value, unit, unitprice, overhead)
                            if (group.hasOwnProperty("lineitems")) {
                                proposals[i].costestimate[j].lineitems.push(newline)

                            } else {
                                proposals[i].costestimate[j].lineitems = [newline]

                            }

                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid: lineid })
                        }
                    }
                }
            }
        }

    }

    getUnit() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let unit = "";
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            if (this.state.activelineid) {
                const lineid = this.state.activelineid;

                const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                if (lineitem) {
                    unit = lineitem.unit;
                }
            }
        }
        return unit;

    }

    handleUnit(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        if (this.state.activelineid) {
                            let lineid = this.state.activelineid;
                            const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                            if (lineitem) {
                                const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                                proposals[i].costestimate[j].lineitems[k].unit = value;
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let lineid = makeid.proposalid.call(this)
                            const lineitem = this.state.lineitem;
                            const quantity = this.state.quantity
                            const unitprice = this.state.unitprice;
                            const overhead = this.state.overhead;
                            const newline = newLineItem(lineid, groupid, lineitem, quantity, value, unitprice, overhead)
                            if (group.hasOwnProperty("lineitems")) {
                                proposals[i].costestimate[j].lineitems.push(newline)

                            } else {
                                proposals[i].costestimate[j].lineitems = [newline]

                            }

                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid: lineid })
                        }
                    }
                }
            }
        }

    }

    getUnitPrice() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let unitprice = "";
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            if (this.state.activelineid) {
                const lineid = this.state.activelineid;

                const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                if (lineitem) {
                    unitprice = lineitem.unitprice;
                }
            }
        }
        return unitprice;

    }

    handleUnitPrice(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        if (this.state.activelineid) {
                            let lineid = this.state.activelineid;
                            const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                            if (lineitem) {
                                const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                                proposals[i].costestimate[j].lineitems[k].unitprice = value;
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let lineid = makeid.proposalid.call(this)
                            const lineitem = this.state.lineitem;
                            const quantity = this.state.quantity
                            const unit = this.state.unit;
                            const overhead = this.state.overhead;
                            const newline = newLineItem(lineid, groupid, lineitem, quantity, unit, value, overhead)
                            if (group.hasOwnProperty("lineitems")) {
                                proposals[i].costestimate[j].lineitems.push(newline)

                            } else {
                                proposals[i].costestimate[j].lineitems = [newline]

                            }

                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid: lineid })
                        }
                    }
                }
            }
        }

    }

    getOverhead() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let overhead = "";
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            if (this.state.activelineid) {
                const lineid = this.state.activelineid;

                const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                if (lineitem) {
                    overhead = lineitem.overhead;
                }
            }
        }
        return overhead;

    }

    handleOverhead(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        if (this.state.activelineid) {
                            let lineid = this.state.activelineid;
                            const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                            if (lineitem) {
                                const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                                proposals[i].costestimate[j].lineitems[k].overhead = value;
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let lineid = makeid.proposalid.call(this)
                            const lineitem = this.state.lineitem;
                            const quantity = this.state.quantity
                            const unit = this.state.unit;
                            const unitprice = this.state.unitprice;
                            const newline = newLineItem(lineid, groupid, lineitem, quantity, unit, unitprice, value)
                            if (group.hasOwnProperty("lineitems")) {
                                proposals[i].costestimate[j].lineitems.push(newline)

                            } else {
                                proposals[i].costestimate[j].lineitems = [newline]

                            }

                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid: lineid })
                        }
                    }
                }
            }
        }

    }

    getLineItem() {
        const ues = new UES();
        const proposalid = this.props.proposalid;
        let getlineitem = "";
        if (this.state.activegroupid) {
            const groupid = this.state.activegroupid;
            if (this.state.activelineid) {
                const lineid = this.state.activelineid;

                const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                if (lineitem) {
                    getlineitem = lineitem.lineitem;
                }
            }
        }
        return getlineitem;

    }

    handleLineItem(value) {
        const ues = new UES();
        const makeid = new MakeID();
        const proposals = ues.getProposals.call(this)
        if (proposals) {
            const proposalid = this.props.proposalid;
            const proposal = ues.getProposalByID.call(this, proposalid)
            if (proposal) {
                const i = ues.getProposalKeyByID.call(this, proposalid)
                if (this.state.activegroupid) {
                    const groupid = this.state.activegroupid;
                    const group = ues.getProposalGroupByID.call(this, proposalid, groupid);
                    if (group) {
                        const j = ues.getProposalGroupKeyByID.call(this, proposalid, groupid)
                        if (this.state.activelineid) {
                            let lineid = this.state.activelineid;
                            const lineitem = ues.getGroupLineItemByID.call(this, proposalid, groupid, lineid)
                            if (lineitem) {
                                const k = ues.getGroupLineItemKeyByID.call(this, proposalid, groupid, lineid)
                                proposals[i].costestimate[j].lineitems[k].lineitem = value;
                                this.props.reduxProposals(proposals)
                                this.setState({ render: 'render' })
                            }

                        } else {
                            let lineid = makeid.proposalid.call(this)
                            const overhead = this.state.overhead
                            const quantity = this.state.quantity
                            const unit = this.state.unit;
                            const unitprice = this.state.unitprice;
                            const newline = newLineItem(lineid, groupid, value, quantity, unit, unitprice, overhead)
                            if (group.hasOwnProperty("lineitems")) {
                                proposals[i].costestimate[j].lineitems.push(newline)

                            } else {
                                proposals[i].costestimate[j].lineitems = [newline]

                            }

                            this.props.reduxProposals(proposals)
                            this.setState({ activelineid: lineid })
                        }
                    }
                }
            }
        }

    }

    async saveEstimate() {
        const projectid = this.props.projectid;
        const ues = new UES();

        const project = ues.getProjectbyID.call(this, projectid)
        if (project) {
            const project_id = project._id;
            const proposals = ues.getProposalsbyProjectID.call(this, projectid)

            try {
                this.setState({ spinner: true })
                let response = await SaveEstimate({ project_id, proposals })
                if (response.hasOwnProperty("proposals")) {
                    this.props.reduxProposals(response.proposals)
                }
                let message = "";
                if (response.hasOwnProperty("message")) {
                    message = response.message;
                }

                if (response.hasOwnProperty("lastupdated")) {
                    message += ` Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }

                this.setState({ message, spinner: false })

            } catch (err) {
                this.setState({ spinner: false })
                alert(err)

            }


        }
    }

    showLineItem(item) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)

        const amount = calcAmount(item.quantity, item.unitprice);
        const fieldamount = calcFieldAmount(item.quantity, item.unitprice, item.overhead)

        return (<div style={{ ...styles.generalContainer }}>

            <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
                <div style={{ ...styles.flex3, ...styles.showBorder, ...styles.generalPadding }}>
                    <span style={{ ...regularFont }}>{item.lineitem}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}>{item.quantity}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}>{item.unit}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}>{item.unitprice}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}>{amount} </span>
                </div>

                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}>{item.overhead} </span>
                </div>
                <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                    <span style={{ ...regularFont, ...styles.alignCenter }}> {fieldamount} </span>
                </div>

            </div>


        </div>)

        }


    showTableLable() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        
        return(   <div style={{ ...styles.generalFlex, ...styles.generalFont }}>
            <div style={{ ...styles.flex3, ...styles.showBorder, ...styles.generalPadding }}>
                <span style={{ ...regularFont }}>&nbsp;</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}>Quantity</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}>Unit</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}>Unit Price</span>
            </div>
            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}>Amount </span>
            </div>

            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}>Overhead </span>
            </div>

            <div style={{ ...styles.flex1, ...styles.showBorder, ...styles.generalPadding, ...styles.alignCenter }}>
                <span style={{ ...regularFont, ...styles.alignCenter }}> Field Amount</span>
            </div>

        </div>)

    }

    showLineItems(group) {
        let items = [];
        if (group.hasOwnProperty("lineitems")) {
            // eslint-disable-next-line
            group.lineitems.map(item => {
                items.push(this.showLineItem(item))

            })
        }
        return items;

    }

    getGroupTotal(group) {
        let amount  = 0;
        if(group.hasOwnProperty("lineitems")) {
            // eslint-disable-next-line
            group.lineitems.map(item=> {
             
                amount +=Number(calcFieldAmount(item.quantity,item.unitprice,item.overhead))
                
            })
        }
        return Number(amount).toFixed(2)
    }

    showGroup(group) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.showBorder, ...styles.generalPadding }}>
                <span style={{ ...regularFont }}>{group.groupname}</span>
            </div>
            {this.showTableLable()}
            {this.showLineItems(group)}
            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignRight, ...styles.generalFont}}>
                <span style={{...regularFont}}>Group Total ${this.getGroupTotal(group)}</span>
            </div>

        </div>)

    }

    showCostEstimate() {


        const proposal = this.getProposal();
        let estimate = [];
        if (proposal) {
            if (proposal.hasOwnProperty("costestimate")) {
                // eslint-disable-next-line
                proposal.costestimate.map(group => {
                    estimate.push(this.showGroup(group))

                })
            }
        }
        return estimate;

    }

    getEstimatTotal() {
        const  proposal = this.getProposal();
        let amount = 0;
        if(proposal.hasOwnProperty("costestimate")) {
            // eslint-disable-next-line
            proposal.costestimate.map(group=> {

                if(group.hasOwnProperty("lineitems")) {
                    // eslint-disable-next-line
                    group.lineitems.map(item=> {
                        amount +=Number(calcFieldAmount(item.quantity,item.unitprice,item.overhead))
                    })

                }
            })

        }
        return amount;
    }

    getAmount() {
        const quantity = this.getQuantity();
        const unitprice = this.getUnitPrice();
        const amount = calcAmount(quantity,unitprice);
        return Number(amount).toFixed(2)

    }

    getFieldCost() {
        const quantity = this.getQuantity();
        const unitprice = this.getUnitPrice();
        const overhead = this.getOverhead();
        const fieldcost = calcFieldAmount(quantity,unitprice,overhead);
        return Number(fieldcost).toFixed(2)

    }

    render() {
        const styles = MyStylesheet();
        const ues = new UES();

        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const myuser = ues.checkUser.call(this)
        const generateIconWidth = ues.generateIcon.call(this)

        const showSaveIcon = () => {
            if (this.state.spinner) {

                return (<Spinner />)


            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...generateIconWidth }} onClick={() => { this.saveEstimate() }}>{saveIcon()}</button>
                </div>)

            }
        }

        if (myuser) {

            const projectid = this.props.projectid;
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
                const proposalid = this.props.proposalid;
                const proposal = ues.getProposalByID.call(this, proposalid)
                if (proposal) {
                    return (
                        <div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>
                            <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                                    /Projects </Link>
                            </div>
                            <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                                    /{project.projectnumber} {project.title} </Link>
                            </div>

                            <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals`}>
                                    /Proposals </Link>
                            </div>
                            <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals/${proposalid}`}>
                                    /{formatDateReport(proposal.dateproposal)} </Link>
                            </div>
                            <div className={`noPrint`} style={{ ...styles.alignCenter, ...styles.bottomMargin15 }}>
                                <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/proposals/${proposalid}/costestimate`}>
                                    /costestimate </Link>
                            </div>

                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>


                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                                    <span style={{ ...regularFont }}>Cost Group</span>

                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalFont, ...styles.generalField }}
                                        value={this.getGroupName()}
                                        onChange={event => { this.handleGroupName(event.target.value) }}
                                    />
                                </div>


                                {this.showGroupIDs()}

                            </div>



                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>

                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>
                                    <span style={{ ...regularFont }}> Line Item</span>
                                </div>
                                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                        value={this.getLineItem()}
                                        onChange={event => { this.handleLineItem(event.target.value) }}
                                    />
                                </div>

                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>

                                        <div style={{ ...styles.generalContainer }}>
                                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                                value={this.getQuantity()}
                                                onChange={event => { this.handleQuantity(event.target.value) }} />
                                        </div>
                                        <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Quantity</span>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                        <div style={{ ...styles.generalContainer }}>
                                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                                value={this.getUnit()}
                                                onChange={event => { this.handleUnit(event.target.value) }}
                                            />
                                        </div>
                                        <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Unit</span>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                        <div style={{ ...styles.generalContainer }}>
                                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                                value={this.getUnitPrice()}
                                                onChange={event => { this.handleUnitPrice(event.target.value) }} />
                                        </div>
                                        <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Unit Price</span>
                                    </div>


                                </div>


                                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>

                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>

                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                            <div style={{ ...styles.generalContainer }}>
                                                <span style={{ ...styles.generalFont, ...regularFont }}>{this.getAmount()}</span>
                                            </div>
                                            <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Amount</span>
                                        </div>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                        <div style={{ ...styles.generalContainer }}>
                                            <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                                                value={this.getOverhead()}
                                                onChange={event => { this.handleOverhead(event.target.value) }}
                                            />
                                        </div>
                                        <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Overhead and Profit</span>
                                    </div>
                                    <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                        <div style={{ ...styles.flex1, ...styles.generalFont, ...styles.addMargin }}>
                                            <div style={{ ...styles.generalContainer }}>
                                                <span style={{ ...styles.generalFont, ...regularFont }}>{this.getFieldCost()}</span>
                                            </div>
                                            <span style={{ ...regularFont, ...styles.bottomMargin15 }}>Field Cost</span>
                                        </div>
                                    </div>


                                </div>


                                {this.showLineIDs()}

                            </div>


                            <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.generalFont }}>
                                <span style={{ ...regularFont }}>{this.state.message}</span>


                            </div>

                            {showSaveIcon()}

                            {this.showCostEstimate()}

                            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont, ...styles.alignRight}}>
                                <span style={{...regularFont}}>Total Estimate Amount{this.getEstimatTotal()}</span>
                            </div>





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

export default connect(mapStateToProps, actions)(CostEstimate)
