import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues'
import { Link } from "react-router-dom";
import { LogOut } from './actions/api';

class Header {

    async logoutUser() {
        try {
            const response = await LogOut();
            if (response.hasOwnProperty("message")) {
                this.props.reduxUser(response)
                this.setState({ message: response.message })
            }

        } catch (err) {
            alert(err)
        }

    }

    showSubheader() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        const styles = MyStylesheet();
        const headerFont = ues.headerFont.call(this)

        const showAdmin = (myuser) => {
            if (myuser.admin === '1') {
                return (
                    <div style={{ ...styles.generalContainer }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/myadmin`}> MyAdmin </Link>
                    </div>
                )
            }
        }
        if (myuser) {
            return (<div style={{ ...styles.generalFlex, ...styles.bottomMargin15, ...styles.marginTop25 }}>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>  Projects </Link>
                    </div>
                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin }}>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/clients`}> Clients </Link>
                    </div>

                </div>
                <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.alignCenter }}>
                    {showAdmin(myuser)}
                </div>
            </div>)
        }
    }

    handleUser() {
        const ues = new UES();
        const styles = MyStylesheet();
        const headerFont = ues.headerFont.call(this)
        const myuser = ues.checkUser.call(this)
        if (myuser) {

            return (
                <div style={{ ...styles.flex1, ...styles.alignCenter }}>
                    <Link to={`/${myuser.userid}/profile`} style={{ ...styles.whiteFont, ...styles.headerFont, ...headerFont, ...styles.headerWeight, ...styles.generalLink }}>/{myuser.userid}</Link>
                </div>)

        }
    }

    showHeader() {
        const styles = MyStylesheet();
        const ues = new UES();
        const hugeFont = ues.hugeFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const header = new Header();

        const handleLogin = () => {
            const myuser = ues.checkUser.call(this)
            if (myuser) {
                return (<span style={{ ...styles.whiteFont, ...styles.headerFont, ...headerFont, ...styles.headerWeight, ...styles.generalLink, ...styles.pointer }} onClick={() => { header.logoutUser.call(this) }}>Logout</span>)

            } else {
                return (<Link to="/login" style={{ ...styles.whiteFont, ...styles.headerFont, ...headerFont, ...styles.headerWeight, ...styles.generalLink }}>Login</Link>)
            }

        }

        return (
            <div className={`noPrint`} style={{ ...styles.drawheader, ...styles.bottomMargin15 }}>
                <div style={{ ...styles.generalFlex, ...styles.marginTop15, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <Link to="/" style={{ ...styles.whiteFont, ...styles.headerFont, ...hugeFont, ...styles.headerWeight, ...styles.generalLink }}>GeoTech</Link>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <Link to="/" style={{ ...styles.whiteFont, ...styles.headerFont, ...headerFont, ...styles.headerWeight, ...styles.generalLink }}>Home</Link>

                    </div>
                    {header.handleUser.call(this)}
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        {handleLogin()}

                    </div>


                </div>
                {header.showSubheader.call(this)}

            </div>)
    }

}

export default Header;