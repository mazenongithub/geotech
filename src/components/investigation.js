import React from 'react';
import { MyStylesheet } from './styles';
import { emptyBox, generateIcon } from './svg';
import UES from './ues';

class Investigation {

    showInvestigation() {
        const ues = new UES();
        const checkboxwidth = ues.checkBox.call(this)
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const generateIconWidth = ues.generateIcon.call(this)
        return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.showBorder, ...styles.generalPadding }}>
            <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <span style={{ ...headerFont, ...styles.boldFont }}><u>Investigation</u></span>
                <button style={{ ...styles.generalButton, ...generateIconWidth }}>{generateIcon()}</button>
            </div>
           

          

            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }} />
                    <span style={{ ...regularFont, ...styles.generalFont }}>Number of Borings</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <div style={{ ...styles.generalContainer }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }}>{emptyBox()}</button>
                    </div>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Hand-Auger</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <div style={{ ...styles.generalContainer }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }}>{emptyBox()}</button>
                    </div>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Solid-Flight</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <div style={{ ...styles.generalContainer }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }}>{emptyBox()}</button>
                    </div>
                    <span style={{ ...styles.generalFont, ...regularFont }}>Hollow-Stem</span>
                </div>
            </div>

            <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.flex1 }}>
                    <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }} />
                    <span style={{ ...regularFont, ...styles.generalFont }}>Maximum Depth</span>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <div style={{ ...styles.generalContainer }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }} />
                        <span style={{ ...regularFont, ...styles.generalFont }}>Sampling Interval</span>
                    </div>
                </div>
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <div style={{ ...styles.generalContainer }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }}>{emptyBox()}</button>
                    </div>
                    <span style={{ ...styles.generalFont, ...regularFont }}>U.S.A Site?</span>
                </div>
                <div style={{ ...styles.flex1 }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }}>{emptyBox()}</button>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Drill Permit</span>
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        <input type="text" style={{ ...styles.generalField, ...regularFont, ...styles.generalFont }} />
                        <span style={{ ...styles.generalFont, ...regularFont }}>Jurisdiction</span>
                    </div>
                </div>
            </div>

       


        </div>)
    }

}

export default Investigation;