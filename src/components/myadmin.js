import React, { Component } from "react";
import UES from './ues';
import { connect } from 'react-redux';
import * as actions from './actions';
import { MyStylesheet } from './styles';
import { LoadMyAdmin, HandleMyAdmin, InviteEmail } from "./actions/api";
import { removeIcon, approveIcon, saveIcon, sendInvite } from "./svg";
import { inputUTCStringForLaborID, validateUserID } from './functions';
import { Link } from "react-router-dom";
import Spinner from "./spinner";

class MyAdmin extends Component {


    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, s: '', activeprojectid: '', activeuserid: '', activerequestid: '', invaliduserid: false, invalidrequestid: false, spinner: false, sendemail: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();

        const users = ues.getMyAdmin.call(this)
        if (!users) {
            this.loadMyAdmin()
        }



    }

    async loadMyAdmin() {
        try {
            let response = await LoadMyAdmin();

            if (response.hasOwnProperty("myadmin")) {
                this.props.reduxMyAdmin(response.myadmin)

            }

        } catch (err) {
            alert(err)
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    getUserID() {

        const ues = new UES();

        let userid = "";
        if (this.state.activeuserid) {
            userid = this.state.activeuserid;
            const user = ues.getMyAdminUserbyID.call(this, userid)

            if (user) {
                userid = user.userid;
            }
        }
        return userid;

    }

    handleUserID(value) {
        value = value.toLowerCase();
        const ues = new UES();

        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {

                if (this.state.activeuserid) {
                    const userid = this.state.activeuserid;
                    const user = ues.getMyAdminUserbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminUserKeybyID.call(this, userid)
                        myadmin.users[i].userid = value;
                        this.props.reduxMyAdmin(myadmin)
                        let errmsg = validateUserID(value)
                        let message = "";
                        if (errmsg.length > 0) {
                            message = errmsg;
                            this.setState({ activeuserid: value, invaliduserid: true, message })
                        } else {
                            this.setState({ activeuserid: value, invaliduserid: false, message })
                        }



                    }
                }

            }



        }


    }

    getRequestUserID() {

        const ues = new UES();

        let userid = "";
        if (this.state.activerequestid) {
            userid = this.state.activerequestid;
            const user = ues.getMyAdminRequestbyID.call(this, userid)

            if (user) {
                userid = user.userid;
            }
        }
        return userid;

    }

    handleRequestUserID(value) {
        value = value.toLowerCase();
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const requests = ues.getMyAdminRequests.call(this)

            if (requests) {

                if (this.state.activerequestid) {
                    const userid = this.state.activerequestid;
                    const user = ues.getMyAdminRequestbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                        myadmin.requests[i].userid = value;

                        this.props.reduxMyAdmin(myadmin)

                        let errmsg = validateUserID(value)
                        let message = "";
                        if (errmsg.length > 0) {
                            message = errmsg;
                            this.setState({ activerequestid: value, invalidrequestid: true, message })
                        } else {
                            this.setState({ activerequestid: value, invalidrequestid: false, message })
                        }


                    }
                }

            }


        }


    }

    getFirstName() {

        const ues = new UES();

        let firstname = "";
        if (this.state.activeuserid) {
            const userid = this.state.activeuserid;
            const user = ues.getMyAdminUserbyID.call(this, userid)

            if (user) {
                firstname = user.firstname;
            }
        }
        return firstname;

    }




    handleFirstName(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {

                if (this.state.activeuserid) {
                    const userid = this.state.activeuserid;
                    const user = ues.getMyAdminUserbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminUserKeybyID.call(this, userid)
                        myadmin.users[i].firstname = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getRequestFirstName() {

        const ues = new UES();

        let firstname = "";
        if (this.state.activerequestid) {
            const userid = this.state.activerequestid;
            const user = ues.getMyAdminRequestbyID.call(this, userid)

            if (user) {
                firstname = user.firstname;
            }
        }
        return firstname;

    }




    handleRequestFirstName(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminRequests.call(this)

            if (users) {

                if (this.state.activerequestid) {
                    const userid = this.state.activerequestid;
                    const user = ues.getMyAdminRequestbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                        myadmin.requests[i].firstname = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getLastName() {

        const ues = new UES();

        let lastname = "";
        if (this.state.activeuserid) {
            const userid = this.state.activeuserid;
            const user = ues.getMyAdminUserbyID.call(this, userid)

            if (user) {
                lastname = user.lastname;
            }
        }
        return lastname;

    }



    handleLastName(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {

                if (this.state.activeuserid) {
                    const userid = this.state.activeuserid;
                    const user = ues.getMyAdminUserbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminUserKeybyID.call(this, userid)
                        myadmin.users[i].lastname = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getRequestLastName() {

        const ues = new UES();

        let lastname = "";
        if (this.state.activerequestid) {
            const userid = this.state.activerequestid;
            const user = ues.getMyAdminRequestbyID.call(this, userid)

            if (user) {
                lastname = user.lastname;
            }
        }
        return lastname;

    }




    handleRequestLastName(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminRequests.call(this)

            if (users) {

                if (this.state.activerequestid) {
                    const userid = this.state.activerequestid;
                    const user = ues.getMyAdminRequestbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                        myadmin.requests[i].lastname = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }
    getEmailAddress() {

        const ues = new UES();

        let emailaddress = "";
        if (this.state.activeuserid) {
            const userid = this.state.activeuserid;
            const user = ues.getMyAdminUserbyID.call(this, userid)

            if (user) {
                emailaddress = user.emailaddress;
            }
        }
        return emailaddress;

    }



    handleEmailAddress(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {

                if (this.state.activeuserid) {
                    const userid = this.state.activeuserid;
                    const user = ues.getMyAdminUserbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminUserKeybyID.call(this, userid)
                        myadmin.users[i].emailaddress = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getRequestEmail() {

        const ues = new UES();

        let emailaddress = "";
        if (this.state.activerequestid) {
            const userid = this.state.activerequestid;
            const user = ues.getMyAdminRequestbyID.call(this, userid)

            if (user) {
                emailaddress = user.emailaddress;
            }
        }
        return emailaddress;

    }




    handleRequestEmail(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminRequests.call(this)

            if (users) {

                if (this.state.activerequestid) {
                    const userid = this.state.activerequestid;
                    const user = ues.getMyAdminRequestbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                        myadmin.requests[i].emailaddress = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getPhoneNumber() {

        const ues = new UES();

        let phonenumber = "";
        if (this.state.activeuserid) {
            const userid = this.state.activeuserid;
            const user = ues.getMyAdminUserbyID.call(this, userid)

            if (user) {
                phonenumber = user.phonenumber;
            }
        }
        return phonenumber;

    }



    handlePhoneNumber(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {

                if (this.state.activeuserid) {
                    const userid = this.state.activeuserid;
                    const user = ues.getMyAdminUserbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminUserKeybyID.call(this, userid)
                        myadmin.users[i].phonenumber = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    getRequestPhoneNumber() {

        const ues = new UES();

        let phonenumber = "";
        if (this.state.activerequestid) {
            const userid = this.state.activerequestid;
            const user = ues.getMyAdminRequestbyID.call(this, userid)

            if (user) {
                phonenumber = user.phonenumber;
            }
        }
        return phonenumber;

    }




    handleRequestPhoneNumber(value) {
        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminRequests.call(this)

            if (users) {

                if (this.state.activerequestid) {
                    const userid = this.state.activerequestid;
                    const user = ues.getMyAdminRequestbyID.call(this, userid)
                    if (user) {

                        const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                        myadmin.requests[i].phonenumber = value;
                        this.props.reduxMyAdmin(myadmin)
                        this.setState({ render: 'render' })
                    }
                }

            }


        }


    }

    removerequest(userid) {

        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminRequests.call(this)

            if (users) {


                const user = ues.getMyAdminRequestbyID.call(this, userid)
                if (user) {

                    const i = ues.getMyAdminRequestKeybyID.call(this, userid)
                    myadmin.requests.splice(i, 1)
                    this.props.reduxMyAdmin(myadmin)
                    this.setState({ activerequestid: false })
                }


            }


        }

    }
    handlerequestid(userid) {
        if (!this.state.activerequestid) {
            this.setState({ activerequestid: userid })
        } else {
            this.setState({ activerequestid: false })
        }
    }



    handleuserid(userid) {
        if (!this.state.activeuserid) {
            this.setState({ activeuserid: userid })
        } else {
            this.setState({ activeuserid: false })
        }
    }

    removeUser(userid) {

        const ues = new UES();
        let myadmin = ues.getMyAdmin.call(this)

        if (myadmin) {


            const users = ues.getMyAdminUsers.call(this)

            if (users) {



                const user = ues.getMyAdminUserbyID.call(this, userid)
                if (user) {

                    const i = ues.getMyAdminUserKeybyID.call(this, userid)
                    myadmin.users.splice(i, 1)
                    this.props.reduxMyAdmin(myadmin)
                    this.setState({ activeuserid: false })
                }
            }

        }




    }

    approveRequest(userid) {
        const newUser = (_id, userid, firstname, lastname, emailaddress, phonenumber) => {
            return ({ _id, userid, firstname, lastname, emailaddress, phonenumber })
        }
        const ues = new UES();


        const myadmin = ues.getMyAdmin.call(this)

        const request = ues.getMyAdminRequestbyID.call(this, userid)
        if (request) {

            const firstname = request.firstname;
            const lastname = request.lastname;
            const emailaddress = request.emailaddress;
            const phonenumber = request.phonenumber;
            const _id = request._id;

            const newuser = newUser(_id, userid, firstname, lastname, emailaddress, phonenumber)

            if (myadmin.hasOwnProperty("users")) {
                myadmin.users.push(newuser)
            } else {
                myadmin.users = [newuser]
            }

            this.removerequest(userid)

            this.props.reduxMyAdmin(myadmin)
            this.setState({ activeuserid: userid, activerequestid: false })

        }

    }

    showuser(user) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const highlight = (userid) => {
            if (this.state.activeuserid === userid) {
                return (styles.activeid)
            }
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont }} key={user._id}>
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex5 }}>
                        <span style={{ ...regularFont, ...highlight(user.userid) }} onClick={() => { this.handleuserid(user.userid) }}>/{user.userid} {user.firstname} {user.lastname} {user.emailaddress} {user.phonenumber}</span>
                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeUser(user.userid) }}>{removeIcon()}</button>

                    </div>

                </div>

            </div>)
    }

    showusers() {
        const ues = new UES();
        let getusers = [];
        const myadmin = ues.getMyAdmin.call(this)
        if (myadmin.hasOwnProperty("users")) {
            const users = myadmin.users;
            // eslint-disable-next-line
            users.map(user => {
                getusers.push(this.showuser(user))
            })
        }
        return getusers;
    }


    showrequest(user) {

        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const approveIconWidth = ues.approveIcon.call(this)
        const highlight = (userid) => {
            if (this.state.activerequestid === userid) {
                return (styles.activeid)
            }
        }


        const showApproveIcon = (userid) => {

            return (
                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...approveIconWidth, ...styles.generalButton }} onClick={() => { this.approveRequest(user.userid) }}>{approveIcon()}</button>
                    <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter }}>
                        <span style={{ ...regularFont }}>Approve</span>
                    </div>
                </div>
            )
        }

        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont }} key={user._id}>
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex5 }}>
                        <span style={{ ...regularFont, ...highlight(user.userid) }} onClick={() => { this.handlerequestid(user.userid) }}>/{user.userid} {user.firstname} {user.lastname} {user.emailaddress} {user.phonenumber}</span>
                    </div>

                    <div style={{ ...styles.flex1 }}>
                        {showApproveIcon(user.userid)}
                    </div>
                    <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                        <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removerequest(user.userid) }}>{removeIcon()}</button>

                    </div>



                </div>


            </div>)
    }

    showrequests() {
        const ues = new UES();
        let getrequests = [];
        const myadmin = ues.getMyAdmin.call(this)
        if (myadmin.hasOwnProperty("requests")) {
            const requests = myadmin.requests;
            // eslint-disable-next-line
            requests.map(user => {
                getrequests.push(this.showrequest(user))
            })
        }
        return getrequests;
    }

    async saveMyAdmin() {
        const ues = new UES();
        const myadmin = ues.getMyAdmin.call(this);
        if (!this.state.invaliduserid && !this.state.invalidrequestid) {
            try {
                this.setState({ spinner: true })
                const response = await HandleMyAdmin({ myadmin });
                let message = "";
                if (response.hasOwnProperty("myadmin")) {
                    this.props.reduxMyAdmin(response.myadmin)

                }
                if (response.hasOwnProperty("message")) {
                    message += response.message;

                }

                if (response.hasOwnProperty("lastupdated")) {
                    message += ` Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }

                this.setState({ message, spinner: false })

            } catch (err) {
                alert(err)
            }

        } else {
            alert(`Invalid user or request ID`)
        }
    }

    async sendEmail() {
        try {
            const emailaddress = this.state.sendemail;
            this.setState({spinner:true})
            let response = await InviteEmail({ emailaddress })
            console.log(response)
            let message = "";
            if (response.hasOwnProperty("message")) {
                message = response.message;
            }
            this.setState({ message, spinner:false })

        } catch (err) {
            alert(err)
        }

    }


    render() {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const headerFont = ues.headerFont.call(this)
        const buttonWidth = ues.generateIcon.call(this)
        const myuser = ues.checkUser.call(this)

        const getSendButton = () => {
            if(this.state.spinner) {
                return(<Spinner/>)
            } else {
                return(<button style={{ ...styles.generalButton, ...buttonWidth }}
                    onClick={() => { this.sendEmail() }}>{sendInvite()}</button>)
            }
        }

        const showSaveIcon = () => {
            if (this.state.spinner) {
                return (<Spinner />)

            } else {
                return (<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.saveMyAdmin.call(this) }}>{saveIcon()}</button>
                </div>
                )
            }
        }
        if (myuser) {
            if (myuser.admin === '1') {
                return (
                    <div style={{ ...styles.generalContainer, ...styles.marginTop100 }}>

                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/myadmin`}>
                                /MyAdmin </Link>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}><u>Users</u></span>
                        </div>




                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}>/</span>
                            <input type="text" style={{ ...styles.mediumwidth, ...styles.generalPadding, ...headerFont }}
                                onChange={event => { this.handleUserID(event.target.value) }}
                                value={this.getUserID()}

                            />
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer, ...styles.generalFont }}
                                        onChange={event => { this.handleFirstName(event.target.value) }}
                                        value={this.getFirstName()}
                                    />
                                </div>
                                <span style={{ ...regularFont }}>First Name</span>

                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handleLastName(event.target.value) }}
                                        value={this.getLastName()} />
                                </div>
                                <span style={{ ...regularFont }}>Last Name</span>

                            </div>

                        </div>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handleEmailAddress(event.target.value) }}
                                        value={this.getEmailAddress()}
                                    />
                                </div>
                                <span style={{ ...regularFont }}>Email Address</span>

                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handlePhoneNumber(event.target.value) }}
                                        value={this.getPhoneNumber()} />
                                </div>
                                <span style={{ ...regularFont }}>Phone Number</span>

                            </div>

                        </div>

                        {this.showusers()}


                        <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                        </div>

                        {showSaveIcon()}







                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}><u>Requests</u></span>
                        </div>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}>/</span>
                            <input type="text" style={{ ...styles.mediumwidth, ...styles.generalPadding, ...headerFont }}
                                onChange={event => { this.handleRequestUserID(event.target.value) }}
                                value={this.getRequestUserID()}

                            />
                        </div>

                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer, ...styles.generalFont }}
                                        onChange={event => { this.handleRequestFirstName(event.target.value) }}
                                        value={this.getRequestFirstName()}
                                    />
                                </div>
                                <span style={{ ...regularFont }}>First Name</span>

                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handleRequestLastName(event.target.value) }}
                                        value={this.getRequestLastName()} />
                                </div>
                                <span style={{ ...regularFont }}>Last Name</span>

                            </div>

                        </div>


                        <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                            <div style={{ ...styles.flex1 }}>
                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handleRequestEmail(event.target.value) }}
                                        value={this.getRequestEmail()}
                                    />
                                </div>
                                <span style={{ ...regularFont }}>Email Address</span>

                            </div>
                            <div style={{ ...styles.flex1 }}>

                                <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                                    <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                        onChange={event => { this.handleRequestPhoneNumber(event.target.value) }}
                                        value={this.getRequestPhoneNumber()} />
                                </div>
                                <span style={{ ...regularFont }}>Phone Number</span>

                            </div>

                        </div>

                        {this.showrequests()}

                        <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                            <span style={{ ...headerFont }}>Invite Email</span>
                        </div>

                        <div style={{ ...styles.generalContainer }}>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont }}
                                    value={this.state.sendemail}
                                    onChange={event => { this.setState({ sendemail: event.target.value }) }} />
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>
                                <span style={{ ...regularFont, ...styles.generalFont, ...styles.bottomMargin15 }}>Send Email</span>
                            </div>
                            <div style={{ ...styles.generalContainer }}>

                                {getSendButton()}
                            </div>
                        </div>

                    </div>)

            } else {

                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>You need to be an administrator to view this page</span>
                </div>)

            }

        } else {
            return (<div style={{ ...styles.generalContainer }}>

                <span style={{ ...styles.generalFont, ...regularFont }}>No User Found</span>
            </div>)
        }
    }








}


function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        myadmin: state.myadmin
    }
}

export default connect(mapStateToProps, actions)(MyAdmin);