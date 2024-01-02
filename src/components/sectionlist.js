import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
import { removeIcon, arrowUp, arrowDown } from './svg';



class SectionList {



    handleSectionListID(sectionlistid) {
        if (this.state.activesectionlistid) {
            if(this.state.activesectionlistid === sectionlistid) {
            this.setState({ activesectionlistid: false })

            } else {
                this.setState({activesectionlistid:sectionlistid})
            }
        } else {
            this.setState({ activesectionlistid: sectionlistid })
        }
    }

    showListID(list) {

        const sections = new SectionList();
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (listid) => {
            if (this.state.activesectionlistid === listid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} key={list.listid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(list.listid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { sections.handleSectionListID.call(this, list.listid) }}>{list.list}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveSectionListUp(list.listid)}}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveSectionListDown(list.listid)}} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeSectionList(list.listid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)


    }


    showSectionList() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)


        if(this.state.activesectionid) {
        return (

            <div style={{ ...styles.generalContainer, ...styles.leftMargin80, ...styles.generalPadding, ...styles.showBorder, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...headerFont }}><u>Section List</u></span>
                </div>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                        value={this.getSectionList()}
                        onChange={event => { this.handleSectionList(event.target.value) }} />
                </div>


                {this.showSectionListIDs()}



            </div>)

        }


    }

}

export default SectionList;