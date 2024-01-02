import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
import { removeIcon, arrowUp, arrowDown } from './svg';



class Chapters {

    handleChapterID(chapterid) {
        if (this.state.activechapterid) {
            if(this.state.activechapterid === chapterid) {
            this.setState({ activechapterid: false, activesectionid:false, activesubsectionid:false, activesectionlistid:false })
            } else {
            this.setState({ activechapterid: chapterid, activesectionid:false, activesubsectionid:false, activesectionlistid:false })
            }
        } else {
            this.setState({ activechapterid: chapterid,  activesectionid:false, activesubsectionid:false, activesectionlistid:false })
        }
    }

    showChapterID(chapter) {

        const chapters = new Chapters();
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowUp.call(this)


        const highlight = (chapterid) => {
            if (this.state.activechapterid === chapterid) {
                return (styles.activeid)
            }

        }



        return (<div style={{ ...styles.generalContainer, ...styles.generalFont }} key={chapter.chapterid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(chapter.chapterid) }}>
                    <span style={{ ...regularFont }}
                        onClick={() => { chapters.handleChapterID.call(this, chapter.chapterid) }}>{chapter.chaptername}</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveChapterUp(chapter.chapterid)}} >{arrowUp()}</button>
                    <button style={{ ...styles.generalButton, ...arrowWidth }} onClick={()=>{this.moveChapterDown(chapter.chapterid)}} >{arrowDown()}</button>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeChapter(chapter.chapterid) }}>{removeIcon()}</button>
                </div>

            </div>

        </div>)


    }


    showChapters() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)

        if(this.state.activereportid) {

        return (

            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.generalPadding }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <span style={{ ...headerFont }}><u>Chapter</u></span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.mediumwidth }}
                        value={this.getChapterName()}
                        onChange={event => { this.handleChapterName(event.target.value) }} />
                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                    <textarea style={{ ...styles.generalFont, ...regularFont, ...styles.generalField, ...styles.areatext }}
                        value={this.getChapterContent()}
                        onChange={event => { this.handleChapterContent(event.target.value) }}> </textarea>
                </div>

           


                {this.showChapterIDs()}



            </div>)


        }


    }

}

export default Chapters;