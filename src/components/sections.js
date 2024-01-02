import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
import { removeIcon, arrowUp, arrowDown } from './svg';



class Sections {



    handleSectionID(sectionid) {
        if (this.state.activesectionid) {

            if (sectionid === this.state.activesectionid) {
                this.setState({ activesectionid: false, activesubsectionid: false, activesectionlistid:false })

            } else {

                this.setState({ activesectionid: sectionid, activesubsectionid: false,activesectionlistid:false })

            }

        } else {
            this.setState({ activesectionid: sectionid, activesubsectionid: false,activesectionlistid:false })
        }
    }

    showSectionID(section) {

        const sections = new Sections();
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (sectionid) => {
            if (this.state.activesectionid === sectionid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont }} key={section.sectionid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(section.sectionid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { sections.handleSectionID.call(this, section.sectionid) }}>{section.sectionname}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveSectionUp(section.sectionid) }} >{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={() => { this.moveSectionDown(section.sectionid) }} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeSection(section.sectionid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)


    }


    showSections() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)


        if (this.state.activechapterid) {

            return (

                <div style={{ ...styles.generalContainer, ...styles.leftMargin40, ...styles.marginTop25, ...styles.generalPadding }}>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                        <span style={{ ...headerFont }}><u>Section</u></span>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.mediumwidth }}
                            value={this.getSectionName()}
                            onChange={event => { this.handleSectionName(event.target.value) }} />
                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                        <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}
                            value={this.getSectionContent()}
                            onChange={event => { this.handleSectionContent(event.target.value) }}> </textarea>
                    </div>



                    {this.showSectionIDs()}



                </div>)

        }


    }

}

export default Sections;