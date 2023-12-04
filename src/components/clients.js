import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, saveIcon } from './svg';
import { newClient, inputUTCStringForLaborID } from './functions';
import MakeID from './makeids';
import { SaveClients } from './actions/api';

class Clients extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activeclientid: false, firstname: '', lastname: '', title: '', company: '', city: '', address: '', contactstate: '', zipcode: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const clients = ues.getClients.call(this)
        if (!clients) {
            ues.loadClients.call(this)
        }

    }

  

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async saveClients() {
        const ues = new UES();
        const clients = ues.getClients.call(this);
        if(clients) {
            try {
                const response = await SaveClients({clients})
                if (response.hasOwnProperty("clients")) {
                    this.props.reduxClients(response.clients);
                    
                }
                let message = "";
                if(response.hasOwnProperty("message")) {
                    message = response.message;
                }
    
                if (response.hasOwnProperty("lastupdated")) {
                    message += `Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }
    
                this.setState({message})

            } catch(err) {
                alert(err)
            }
        }
      
    }

    showClients() {
        const ues = new UES();
        const clients = ues.getClients.call(this)
        let getclients = [];
        if (clients) {
            // eslint-disable-next-line
            clients.map(client => {


                getclients.push(this.showClient(client))
            })
        }

        return getclients;

    }

    removeClient(clientid) {
        const ues = new UES();
        const client = ues.getClient.call(this, clientid)
        const clients = ues.getClients.call(this)
        if (client) {
            const i = ues.getClientKey.call(this, clientid)
            clients.splice(i, 1)
            this.props.reduxClients(clients);
            this.setState({ activeclientid: false })

        }
    }

    handleclientid(clientid) {
        if (this.state.activeclientid === clientid) {
            this.setState({ activeclientid: false })
        } else {
            this.setState({ activeclientid: clientid })
        }
    }

    showClient(client) {
        const styles = MyStylesheet();
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)

        const title = (title) => {
            if (title) {
                return (`, ${title}`)
            }

        }

        const company = (getcompany) => {
            if (getcompany) {
                return (<div style={{ ...styles.generalContainer }}>
                    <span>{getcompany}</span>
                </div>)
            }

        }

        const highlight = (clientid) => {
            if (this.state.activeclientid === clientid) {
                return (styles.activeid)
            }
        }
        return (<div style={{ ...styles.generalContainer, ...styles.generalFont, ...regularFont, ...styles.bottomMargin15 }} key={client.clientid}>
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex5, ...highlight(client.clientid) }} onClick={() => { this.handleclientid(client.clientid) }}>
                    <div style={{ ...styles.generalContainer }}>
                        <span>{client.firstname} {client.lastname}{title(client.title)}</span>
                    </div>
                    {company(client.company)}
                    <div style={{ ...styles.generalContainer }}>
                        <span>{client.address}</span>
                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        <span>{client.city}, {client.contactstate} {client.zipcode}</span>
                    </div>



                </div>
                <div style={{ ...styles.flex1 }}>

                    <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeClient(client.clientid) }}>{removeIcon()}</button>

                </div>
            </div>

        </div>)

    }

    getFirstName() {
        const ues = new UES();
        let firstname = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                firstname = client.firstname;
            }

        }
        return firstname;

    }

    handleFirstName(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].firstname = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const lastname = this.state.lastname;
            const title = this.state.title;
            const company = this.state.company;
            const address = this.state.address;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, value, lastname, title, company, address, city, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getLastName() {
        const ues = new UES();
        let lastname = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                lastname = client.lastname;
            }

        }
        return lastname;

    }

    handleLastName(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].lastname = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const title = this.state.title;
            const company = this.state.company;
            const address = this.state.address;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, value, title, company, address, city, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getTitle() {
        const ues = new UES();
        let title = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                title = client.title;
            }

        }
        return title;

    }

    handleTitle(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].title = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const company = this.state.company;
            const address = this.state.address;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, lastname, value, company, address, city, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getCompany() {
        const ues = new UES();
        let company = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                company = client.company;
            }

        }
        return company;

    }

    handleCompany(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].company = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const title = this.state.title
            const address = this.state.address;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, lastname, title, value, address, city, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getAddress() {
        const ues = new UES();
        let address = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                address = client.address;
            }

        }
        return address;

    }

    handleAddress(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].address = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const title = this.state.title
            const company = this.state.company;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, lastname, title, company, value, city, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getCity() {
        const ues = new UES();
        let city = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                city = client.city;
            }

        }
        return city;

    }

    handleCity(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].city = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const title = this.state.title
            const company = this.state.company;
            const address = this.state.address;
            const contactstate = this.state.contactstate;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, lastname, title, company, address, value, contactstate, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }


    getContactState() {
        const ues = new UES();
        let contactstate = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                contactstate = client.contactstate;
            }

        }
        return contactstate;

    }

    handleContactState(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].contactstate = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const title = this.state.title
            const company = this.state.company;
            const address = this.state.address;
            const city = this.state.city;
            const zipcode = this.state.zipcode;
            const newclient = newClient(clientid, firstname, lastname, title, company, address, city, value, zipcode)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }

    getZipcode() {
        const ues = new UES();
        let zipcode = "";
        if (this.state.activeclientid) {
            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid);
            if (client) {
                zipcode = client.zipcode;
            }

        }
        return zipcode;

    }

    handleZipcode(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let clients = ues.getClients.call(this)
        if (this.state.activeclientid) {

            const clientid = this.state.activeclientid;
            const client = ues.getClient.call(this, clientid)
            if (client) {
                const i = ues.getClientKey.call(this, clientid)
                clients[i].zipcode = value;
                this.props.reduxClients(clients)
                this.setState({ render: 'render' })
            }

        } else {
            // new client
            const clientid = makeid.clientid.call(this)
            const firstname = this.state.firstname;
            const lastname = this.state.lastname;
            const title = this.state.title
            const company = this.state.company;
            const address = this.state.address;
            const city = this.state.city;
            const contactstate = this.state.contactstate;
            const newclient = newClient(clientid, firstname, lastname, title, company, address, city, contactstate, value)
            if (clients) {
                clients.push(newclient)

            } else {
                clients = [newClient]
            }
            this.props.reduxClients(clients)
            this.setState({ activeclientid: clientid })
        }

    }




    render() {
        const ues = new UES();
        const styles = MyStylesheet();
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const regularFont = ues.regularFont.call(this)
        const buttonWidth = ues.generateIcon.call(this)
        if (myuser) {
            return (<div style={{ ...styles.generalContainer }}>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/clients`}>
                        /Clients </Link>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getFirstName()}
                                onChange={event => { this.handleFirstName(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>First Name</span>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getLastName()}
                                onChange={event => { this.handleLastName(event.target.value) }}

                            />
                        </div>
                        <span style={{ ...regularFont }}>Last Name</span>

                    </div>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getTitle()}
                                onChange={event => { this.handleTitle(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>Title</span>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getCompany()}
                                onChange={event => { this.handleCompany(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>Company</span>

                    </div>

                </div>


                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getAddress()}
                                onChange={event => { this.handleAddress(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>Address</span>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getCity()}
                                onChange={event => { this.handleCity(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>City</span>

                    </div>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getContactState()}
                                onChange={event => { this.handleContactState(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>State</span>

                    </div>
                    <div style={{ ...styles.flex1, ...styles.addMargin  }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getZipcode()}
                                onChange={event => { this.handleZipcode(event.target.value) }}
                            />
                        </div>
                        <span style={{ ...regularFont }}>Zipcode</span>

                    </div>

                </div>

                <div style={{...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15}}>
                    <span style={{...styles.generalFont, ...regularFont}}>{this.state.message}</span>
                </div>

                <div style={{...styles.generalContainer, ...styles.alignCenter}}>
                    <button style={{...styles.generalButton, ...buttonWidth}} onClick={()=>{this.saveClients()}}>{saveIcon()}</button>
                </div>

                {this.showClients()}

            </div>)

        } else {
            return (<div style={{ ...styles.generalContainer }}>

                <span style={{ ...styles.generalFont, ...regularFont }}>No User Logged in</span>
            </div>)
        }
    }

}

function mapStateToProps(state) {
    return {
        myuser: state.myuser,
        clients: state.clients
    }
}

export default connect(mapStateToProps, actions)(Clients);