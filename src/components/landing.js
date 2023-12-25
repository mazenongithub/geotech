import React from 'react';
import { MyStylesheet } from './styles';
import { GoogleSign, AppleID, checkBox, emptyBox } from './svg'
import UES from './ues';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import { LoginUser } from './actions/api';
import Profile from './profile';
import { validateUserID } from './functions';
import Spinner from './spinner';

class Landing {

    async loginClient(values) {
        

        try {
            this.setState({spinner:true})
            let response = await LoginUser(values);
            let message = "";
            if (response.hasOwnProperty("message")) {
                message += response.message;
            }
            if (response.hasOwnProperty("errmsg")) {
                message += ` ${response.errmsg}`
            }
            if (response.hasOwnProperty("myuser")) {
                this.props.reduxUser(response.myuser)

            }

            this.setState({ message: message, spinner:false })



        } catch (err) {
            alert(err)
        }

    }

    async googleSignIn() {

        if(!this.state.invaliduserid) {
        const landing = new Landing();




        try {

            let google = "";
            let firstname = "";
            let lastname = "";
            let emailaddress = "";
            //let profileurl = "";
            let phonenumber = "";
            let user = {}
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            let result = await firebase.auth().signInWithPopup(provider)
            let userid = "";

            if (result.hasOwnProperty("user")) {

                user = result.user;
                userid = this.state.userid;
                google = user.providerData[0].uid;
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
                emailaddress = user.providerData[0].email
                //  profileurl = user.providerData[0].photoURL
                phonenumber = user.phoneNumber;
            }

            const values = { firstname, lastname, emailaddress, userid, phonenumber, google }
            landing.loginClient.call(this, values)



        } catch (error) {
            alert(error)
        }

    } else {
        alert(`Invalid User ID `)
    }


    }

    async appleSignIn() {
        if(!this.state.invaliduserid) {
        const landing = new Landing();
        const provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');

        try {
            let result = await firebase.auth().signInWithPopup(provider)
            // The signed-in user info.
            var user = result.user;

            let firstname = "";
            let lastname = "";
            if (user.providerData[0].displayName) {
                firstname = user.providerData[0].displayName.split(' ')[0]
                lastname = user.providerData[0].displayName.split(' ')[1]
            }
            let phonenumber = user.providerData[0].phoneNumber
            let apple = user.providerData[0].uid;
            let emailaddress = user.providerData[0].email;

            let userid = this.state.userid;
            const values = { userid, apple, firstname, lastname, phonenumber, emailaddress }
            landing.loginClient.call(this, values)

        } catch (err) {
            alert(err)
        }

    } else {
        alert(`Invalid UserID`)
    }

    }



    getCheckBox() {
        if (this.state.register) {
            return (checkBox())
        } else {
            return (emptyBox())
        }
    }

    handleCheckBox() {
        if (this.state.register) {
            this.setState({ register: false, userid:"", message:'', invaliduserid:false })

        } else {
            this.setState({ register: true })
        }
    }

    handleUserID(value) {
        value = value.toLowerCase();
        const errmsg = validateUserID(value)
        let message = "";
        if(errmsg.length === 0) {
            this.setState({ userid: value, invaliduserid:false, message })

        } else {
            message = errmsg;
            this.setState({ userid: value, invaliduserid:true, message })

        }

        

    }

    showRegisterMessage() {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        if (this.state.register) {
            return (<span style={{ ...styles.generalFont, ...regularFont }}>Only Click Register and Enter an ID when create an account for the first time.</span>)
        }
    }


    showLanding() {
        const styles = MyStylesheet();
        const ues = new UES();
        const buttonWidth = ues.getLoginButton.call(this)
        const checkboxwidth = ues.checkBox.call(this)
        const landing = new Landing();
        const regularFont = ues.regularFont.call(this)

        const showClientID = () => {
            if(this.state.spinner) {
                return (<Spinner/>)

            } else {
                return(<div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...buttonWidth }}
                            onClick={() => { landing.googleSignIn.call(this) }}>

                            {GoogleSign()}

                        </button>

                    </div>


                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <button style={{ ...styles.generalButton, ...styles.noBorder, ...buttonWidth }} onClick={() => landing.appleSignIn.call(this)}>
                            {AppleID()}
                        </button>

                    </div>


                </div>)
            }
        }

        const registerMessage = () => {
            if(this.state.register) {
                return(<span style={{...regularFont}}>Only Click Register and Enter a User ID when creating an account for the first time. </span>)
            }
        }

        const showuserid = () => {
            if (this.state.register) {
                return (<div style={{ ...styles.generalContainer }}>
                    <input type="text" style={{ ...styles.generalField, ...styles.generalFont, ...regularFont }}
                        value={this.state.userid}
                        onChange={event => {landing.handleUserID.call(this,event.target.value) }} />
                    <div style={{ ...styles.generalContainer }}>
                        <span style={{ ...regularFont, ...styles.generalFont }}>Create User ID</span>
                    </div>
                </div>)
            }
        }
        return (
            <div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <button style={{ ...styles.generalButton, ...checkboxwidth }} onClick={() => { landing.handleCheckBox.call(this) }}>{landing.getCheckBox.call(this)}</button>
                        <span style={{ ...regularFont, ...styles.generalFont }}>Register</span>
                    </div>
                    <div style={{ ...styles.flex5, ...styles.generalFont }}>
                        {registerMessage()}
                        &nbsp;
                    </div>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        &nbsp;
                    </div>
                    <div style={{ ...styles.flex5 }}>
                        {showuserid()}
                        &nbsp;
                    </div>

                </div>





                {showClientID()}
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <span style={{ ...regularFont }}>{this.state.message}</span>
                </div>
            </div>)
    }

    handleLanding() {
        const ues = new UES();
        const profile = new Profile();
        const landing = new Landing();
        const myuser = ues.checkUser.call(this)
        if (myuser) {
            return (profile.showProfile.call(this))
        } else {
            return (landing.showLanding.call(this))
        }

    }
}



export default Landing;