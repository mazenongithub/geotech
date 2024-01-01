import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
import { removeIcon, arrowUp, arrowDown } from './svg';



class SubSections {



    handleSubSectionID(subsectionid) {
        if (this.state.activesubsectionid) {
            if(this.state.activesubsectionid === subsectionid) {
            this.setState({ activesubsectionid: false })

            } else {
                this.setState({activesubsectionid:subsectionid})
            }
        } else {
            this.setState({ activesubsectionid: subsectionid })
        }
    }

    showSubSectionID(section) {

        const sections = new SubSections();
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (sectionid) => {
            if (this.state.activesubsectionid === sectionid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont }} key={section.subsectionid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(section.subsectionid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { sections.handleSubSectionID.call(this, section.subsectionid) }}>{section.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveSubSectionUp(section.subsectionid)}}>{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveSubSectionDown(section.subsectionid)}} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeSubSection(section.subsectionid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)


    }


    showSubSections() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)


        if(this.state.activesectionid) {
        return (

            <div style={{ ...styles.generalContainer, ...styles.leftMargin80, ...styles.generalPadding, ...styles.showBorder }}>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...headerFont }}><u>SubSection</u></span>
                </div>
                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.mediumwidth }}
                        value={this.getSubSectionName()}
                        onChange={event => { this.handleSubSectionName(event.target.value) }} />
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}
                        value={this.getSubSectionContent()}
                        onChange={event => { this.handleSubSectionContent(event.target.value) }}> </textarea>
                </div>

              


                {this.showSubSectionIDs()}



            </div>)

        }


    }

}

export default SubSections;