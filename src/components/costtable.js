import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
import { calcAmount, calcFieldAmount } from './functions';
class CostTable {

    getGroupTotal(group) {

        let amount = 0;
        if (group.hasOwnProperty("lineitems")) {
            // eslint-disable-next-line
            group.lineitems.map(item => {

                amount += Number(calcFieldAmount(item.quantity, item.unitprice, item.overhead))

            })
        }
        return Number(Math.ceil(amount))

    }

    showTableLabel() {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)

        return (<div style={{ ...styles.generalFlex, ...styles.generalFont }}>
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

    getEstimateTotal() {
        const proposal = this.getProposal();
        let amount = 0;
        if (proposal.hasOwnProperty("costestimate")) {
            // eslint-disable-next-line
            proposal.costestimate.map(group => {

                if (group.hasOwnProperty("lineitems")) {
                    // eslint-disable-next-line
                    group.lineitems.map(item => {
                        amount += Number(calcFieldAmount(item.quantity, item.unitprice, item.overhead))
                    })

                }
            })

        }
        return Number(amount);
    }

    showLineItem(item) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this);
        const costtable = new CostTable();

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

    showLineItems(group) {
        const costtable = new CostTable();
        let items = [];
        if (group.hasOwnProperty("lineitems")) {
            // eslint-disable-next-line
            group.lineitems.map(item => {
                items.push(costtable.showLineItem.call(this, item))

            })
        }
        return items;

    }


    showGroup(group) {
        const costtable = new CostTable();
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={group.groupid}>
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.showBorder, ...styles.generalPadding }}>
                <span style={{ ...regularFont }}>{group.groupname}</span>
            </div>
            {costtable.showTableLabel.call(this)}
            {costtable.showLineItems.call(this, group)}

            <div style={{...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignRight, ...styles.generalFont}}>
                <span style={{...regularFont}}>Group Total ${costtable.getGroupTotal.call(this,group)}</span>
            </div>


        </div>)

    }

    showCostEstimate(proposalid) {
        const styles = MyStylesheet();
        const costtable = new CostTable();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const proposal = ues.getProposalByID.call(this, proposalid)
        let estimate = [];
        if (proposal) {
            if (proposal.hasOwnProperty("costestimate")) {
                // eslint-disable-next-line
                proposal.costestimate.map(group => {
                    estimate.push(costtable.showGroup.call(this, group))

                })
            }
        }
        return (<div style={{ ...styles.generalContainer }}>
            {estimate}

            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignRight, ...styles.generalFont }}>
                <span style={{ ...regularFont }}>Total Cost ${costtable.getEstimateTotal.call(this, proposalid)}</span>
            </div>
        </div>
        )

    }
}

export default CostTable;