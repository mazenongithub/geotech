import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues'
import { linkArrow } from './svg';
import { Link } from "react-router-dom";

class Profile {

    handlePhoneNumber(value) {
        const ues = new UES();
        let myuser = ues.checkUser.call(this)
        if (myuser) {
            myuser.phonenumber = value;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }

    getPhoneNumber() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        let phonenumber = ''
        if (myuser) {
            phonenumber = myuser.phonenumber;

        }
        return phonenumber;

    }

    handleEmailAddress(value) {
        const ues = new UES();
        let myuser = ues.checkUser.call(this)
        if (myuser) {
            myuser.emailaddress = value;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }

    getEmailAddress() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        let emailaddress = ''
        if (myuser) {
            emailaddress = myuser.emailaddress;

        }
        return emailaddress;

    }


    handleLastName(value) {
        const ues = new UES();
        let myuser = ues.checkUser.call(this)
        if (myuser) {
            myuser.lastname = value;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }

    getLastName() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        let lastname = ''
        if (myuser) {
            lastname = myuser.lastname;

        }
        return lastname;

    }


    handleFirstName(value) {
        const ues = new UES();
        let myuser = ues.checkUser.call(this)
        if (myuser) {
            myuser.firstname = value;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }

    getFirstName() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        let firstname = ''
        if (myuser) {
            firstname = myuser.firstname;

        }
        return firstname;

    }

    handleUserID(value) {
        const ues = new UES();
        let myuser = ues.checkUser.call(this)
        if (myuser) {
            myuser.userid = value;
            this.props.reduxUser(myuser)
            this.setState({ render: 'render' })
        }

    }

    getUserID() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        let userid = ''
        if (myuser) {
            userid = myuser.userid;

        }
        return userid;

    }

    showProfile() {
        const ues = new UES();
        const styles = MyStylesheet();
        const headerFont = ues.headerFont.call(this)
        const regularFont = ues.regularFont.call(this)
        const profile = new Profile();
        const myuser = ues.checkUser.call(this)
        const arrowWidth = ues.arrowWidth.call(this)
        if(myuser) {
        return (
            <div style={{ ...styles.generalContainer }}>
                <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <span style={{ ...headerFont }}>/</span>
                    <input type="text" style={{ ...styles.mediumwidth, ...styles.generalPadding, ...headerFont }}
                        onChange={event => { profile.handleUserID.call(this, event.target.value) }}
                        value={profile.getUserID.call(this)}

                    />
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                onChange={event => { profile.handleFirstName.call(this, event.target.value) }}
                                value={profile.getFirstName.call(this)}
                            />
                        </div>
                        <span style={{ ...regularFont }}>First Name</span>

                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                onChange={event => { profile.handleLastName.call(this, event.target.value) }}
                                value={profile.getLastName.call(this)} />
                        </div>
                        <span style={{ ...regularFont }}>Last Name</span>

                    </div>

                </div>


                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                onChange={event => { profile.handleEmailAddress.call(this, event.target.value) }}
                                value={profile.getEmailAddress.call(this)}
                            />
                        </div>
                        <span style={{ ...regularFont }}>Email Address</span>

                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                onChange={event => { profile.handlePhoneNumber.call(this, event.target.value) }}
                                value={profile.getPhoneNumber.call(this)} />
                        </div>
                        <span style={{ ...regularFont }}>Phone Number</span>

                    </div>

                </div>

                <div style={{...styles.generalContainer}}>
                    <Link style={{...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor}} to={`/${myuser.userid}/projects`}><button style={{...styles.generalButton, ...arrowWidth}}>{linkArrow()}</button> Go To Projects </Link>   
                </div>

                <div style={{...styles.generalContainer}}>
                    <Link style={{...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor}} to={`/${myuser.userid}/clients`}><button style={{...styles.generalButton, ...arrowWidth}}>{linkArrow()}</button> Clients </Link>   
                </div>


            </div>)

            }
    }
}

export default Profile;