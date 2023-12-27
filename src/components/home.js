
import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues';
class Home {

    showHome() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        return (
            <div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.alignCenter }}>
                        <a style={{ ...styles.generalFont, ...regularFont, ...styles.generalColor, ...styles.generalLink }} href="https://geotech.civilengineer.io">https://geotech.civilengineer.io</a>
                    </div>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Welcome!</span>
                    </div>
                    <div style={{ ...styles.flex5 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Thank You for Visiting!</span>
                    </div>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>About</span>
                    </div>
                    <div style={{ ...styles.flex5 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>The complete Geotechnical Engineer Design Program and Project Manager</span>
                    </div>

                </div>


                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Components </span>
                    </div>
                    <div style={{ ...styles.flex5 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>Reports, Borings, Samples, Letter, PTSlab, Compaction Curve, Sieve, Unconfined, Proposals, Pavement, Design, LogDraft, FieldReport, Cost Estimating, Seismic, Liquefaction, Time/Invoice, Projects, Client </span>

                    </div>

                </div>


            </div>
        )
    }




}

export default Home;