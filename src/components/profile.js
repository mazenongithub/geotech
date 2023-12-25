import React from 'react';
import { MyStylesheet } from './styles';
import UES from './ues'
import { SaveUser } from './actions/api';
import { saveIcon } from './svg';
import { inputUTCStringForLaborID, validateUserID } from './functions'
import Spinner from './spinner'

class Profile {

    async saveuser() {
        const ues = new UES();
        const myuser = ues.checkUser.call(this)
        if (myuser) {
            if (!myuser.hasOwnProperty("errmsg")) {
                const userid = myuser.userid;
                const firstname = myuser.firstname;
                const lastname = myuser.lastname;
                const emailaddress = myuser.emailaddress;
                const phonenumber = myuser.phonenumber
                const _id = myuser._id;
                try {
                    const values = { _id, userid, firstname, lastname, emailaddress, phonenumber }
                    this.setState({spinner:true})
                    const response = await SaveUser(values)
                    console.log(response)
                    if (response.hasOwnProperty("myuser")) {
                        this.props.reduxUser(response.myuser)
                    }
                    let message = "";
                    if (response.hasOwnProperty("message")) {
                        message = response.message;
                    }

                    if (response.hasOwnProperty("lastupdated")) {
                        message += `Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                    }

                    this.setState({ message, spinner:false })

                } catch (err) {

                }

            } else {
                alert(`Invalid User ID Cannot Save Profile`)
            }

        }

    }

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
    value = value.toLowerCase();
    const ues = new UES();
    let myuser = ues.checkUser.call(this)
    if (myuser) {
        myuser.userid = value;
        const errmsg = validateUserID(value);
        if (errmsg.length > 0) {
            myuser.errmsg = errmsg;
        } else {
            delete myuser.errmsg;
        }
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
    const buttonWidth = ues.generateIcon.call(this)

    const showSaveIcon = () => {
        if(this.state.spinner) {
            return(<Spinner/>)

        } else {
            return(<div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { profile.saveuser.call(this) }}>{saveIcon()}</button>
            </div>
)
        }
    }
    if (myuser) {
        return (
            <div style={{ ...styles.generalContainer, ...styles.marginTop100 }}>
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

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                    <span style={{ ...styles.generalFont, ...regularFont }}>{myuser.errmsg}</span>
                </div>

                {showSaveIcon()}






            </div>)

    }
}
}

export default Profile;