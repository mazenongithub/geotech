import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, linkArrow, saveIcon } from './svg';
import { newProject, inputUTCStringForLaborID } from './functions';
import MakeID from './makeids';
import { SaveProjects } from './actions/api';

class Projects extends Component {

    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activeprojectid: '', projectnumber: '', title: '', address: '', city: '', description: '', clientid: '', projectstate: ''

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const clients = ues.getClients.call(this)
        if (!projects) {
            ues.loadProjects.call(this);
        }

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

    async saveProjects() {
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        if (projects) {
            try {

                let response = await SaveProjects({ projects })
                console.log(response)
                if (response.hasOwnProperty("projects")) {
                    this.props.reduxProjects(response.projects)
                }
                let message = "";
                if (response.hasOwnProperty("message")) {
                    message = response.message;
                }

                if (response.hasOwnProperty("lastupdated")) {
                    message += `Last Saved ${inputUTCStringForLaborID(response.lastupdated)} `
                }

                this.setState({ message })

            } catch (err) {
                alert(err)
            }
        }

    }

    removeProject(projectid) {
        const ues = new UES();
        let projects = ues.getProjects.call(this)
        if (projects) {
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects.splice(i, 1)
                this.props.reduxProjects(projects)
                this.setState({ activeprojectid: false })

            }

        }

    }

    getProjectNumber() {
        const ues = new UES();
        let projectnumber = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            projectnumber = project.projectnumber;

        }
        return projectnumber;

    }

    handleProjectNumber(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].projectnumber = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const title = this.state.title;
            const address = this.state.address;
            const city = this.state.city;
            const projectstate = this.state.projectstate;
            const description = this.state.description;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, value, title, address, city, projectstate, description, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }

    getTitle() {
        const ues = new UES();
        let title = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            title = project.title;

        }
        return title;

    }

    handleTitle(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].title = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const address = this.state.address;
            const city = this.state.city;
            const projectstate = this.state.projectstate;
            const description = this.state.description;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, projectnumber, value, address, city, projectstate, description, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }


    getAddress() {
        const ues = new UES();
        let address = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            address = project.address;

        }
        return address;

    }

    handleAddress(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].address = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const title = this.state.title;
            const city = this.state.city;
            const projectstate = this.state.projectstate;
            const description = this.state.description;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, projectnumber, title, value, city, projectstate, description, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }

    getCity() {
        const ues = new UES();
        let city = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            city = project.city;

        }
        return city;

    }

    handleCity(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].city = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const title = this.state.title;
            const address = this.state.address;
            const projectstate = this.state.projectstate;
            const description = this.state.description;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, projectnumber, title, address, value, projectstate, description, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }

    getProjectState() {
        const ues = new UES();
        let projectstate = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            projectstate = project.projectstate;

        }
        return projectstate;

    }

    handleProjectState(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].projectstate = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const title = this.state.title;
            const address = this.state.address;
            const city = this.state.city;
            const description = this.state.description;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, projectnumber, title, address, city, value, description, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }

    getDescription() {
        const ues = new UES();
        let description = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            description = project.description;

        }
        return description;

    }

    handleDescription(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].description = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const title = this.state.title;
            const address = this.state.address;
            const city = this.state.city;
            const projectstate = this.state.projectstate;
            const clientid = this.state.clientid;
            const newproject = newProject(projectid, projectnumber, title, address, city, projectstate, value, clientid)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }


    getClientID() {
        const ues = new UES();
        let clientid = "";
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid)
            clientid = project.clientid;

        }
        return clientid;

    }

    handleClientID(value) {

        const ues = new UES();
        const makeid = new MakeID();
        let projects = ues.getProjects.call(this)
        if (this.state.activeprojectid) {
            const projectid = this.state.activeprojectid;
            const project = ues.getProjectbyID.call(this, projectid);
            if (project) {
                const i = ues.getProjectKeybyID.call(this, projectid)
                projects[i].clientid = value;
                this.props.reduxProjects(projects);
                this.setState({ 'render': 'render' })
            }

        } else {
            // new Project

            const projectid = makeid.projectid.call(this);
            const projectnumber = this.state.projectnumber;
            const title = this.state.title;
            const address = this.state.address;
            const city = this.state.city;
            const projectstate = this.state.projectstate;
            const description = this.state.description;
            const newproject = newProject(projectid, projectnumber, title, address, city, projectstate, description, value)

            if (projects) {

                projects.push(newproject)


            } else {

                projects = [newproject]

            }

            this.props.reduxProjects(projects)
            this.setState({ activeprojectid: projectid })


        }

    }




    handleProjectID(projectid) {

        if (this.state.activeprojectid) {
            this.setState({ activeprojectid: false })
        } else {
            this.setState({ activeprojectid: projectid })
        }

    }

    showProject(project) {
        const ues = new UES();
        const regularFont = ues.regularFont.call(this)
        const styles = MyStylesheet();
        const iconWidth = ues.removeIcon.call(this)
        const headerFont = ues.headerFont.call(this)
        const arrowWidth = ues.arrowWidth.call(this);
        const myuser = ues.checkUser.call(this)
        const highlight = (projectid) => {
            if (this.state.activeprojectid === projectid) {
                return (styles.activeid)
            }
        }

        const showClient = (clientid) => {
            if (clientid) {
                const client = ues.getClient.call(this, clientid)
                if (client) {
                    return (
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <span style={{ ...regularFont }}>{client.firstname} {client.lastname} {client.title} {client.company}</span>

                        </div>
                    )
                }
            }

        }
        return (
            <div style={{ ...styles.generalContainer, ...styles.generalFont, ...styles.bottomMargin15 }} key={project.projectid}>

                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex5, ...styles.generalFont, ...highlight(project.projectid) }} onClick={() => { this.handleProjectID(project.projectid) }}>

                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...regularFont }}>
                                {project.projectnumber} {project.title}
                            </span>
                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <span style={{ ...regularFont }}>
                                {project.address} {project.city} {project.projectstate}
                            </span>
                        </div>
                        {showClient(project.clientid)}

                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeProject(project.projectid) }}>{removeIcon()}</button>

                    </div>
                </div>

                <div style={{ ...styles.generalContainer }}>
                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}><button style={{ ...styles.generalButton, ...arrowWidth }}>{linkArrow()}</button> Go To Project </Link>
                </div>

            </div>
        )

    }




    showProjects() {

        const ues = new UES();
        const projects = ues.getProjects.call(this)
        let getprojects = [];
        if (projects) {
            // eslint-disable-next-line
            projects.map(project => {
                getprojects.push(this.showProject(project))
            })

        }
        return getprojects;

    }

    showclients() {
        const ues = new UES();
        const clients = ues.getClients.call(this);
        let options = [];
        if (clients) {
            // eslint-disable-next-line
            clients.map(client => {
                options.push(<option key={client.clientid} value={client.clientid}>{client.firstname} {client.lastname} {client.title}</option>)
            })

        }
        return options;
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
                    <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects`}>
                        /Projects </Link>
                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getProjectNumber()}
                                onChange={event => { this.handleProjectNumber(event.target.value) }}


                            />
                        </div>
                        <span style={{ ...regularFont }}>Project Number</span>

                    </div>

                </div>

                <div style={{ ...styles.flex1 }}>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalContainer, ...styles.generalField }}
                            value={this.getTitle()}
                            onChange={event => { this.handleTitle(event.target.value) }}

                        />
                    </div>
                    <span style={{ ...regularFont }}>Title</span>

                </div>


                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }}>

                    <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                        <input type="text" style={{ ...regularFont, ...styles.generalField }}
                            value={this.getAddress()}
                            onChange={event => { this.handleAddress(event.target.value) }}

                        />
                    </div>
                    <span style={{ ...regularFont }}>Address</span>

                </div>

                <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                    <div style={{ ...styles.flex1 }}>
                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getCity()}
                                onChange={event => { this.handleCity(event.target.value) }}


                            />
                        </div>
                        <span style={{ ...regularFont }}>City</span>

                    </div>
                    <div style={{ ...styles.flex1 }}>

                        <div style={{ ...styles.generalContainer, ...styles.generalFont }}>
                            <input type="text" style={{ ...regularFont, ...styles.generalContainer }}
                                value={this.getProjectState()}
                                onChange={event => { this.handleProjectState(event.target.value) }}

                            />
                        </div>
                        <span style={{ ...regularFont }}>State</span>

                    </div>

                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.generalFont }}>

                    <span style={{ ...regularFont }}>Description</span>

                    <textarea style={{ ...styles.generalField, ...regularFont, ...styles.areatext, ...styles.generalFont }}
                        value={this.getDescription()}
                        onChange={event => { this.handleDescription(event.target.value) }}></textarea>

                </div>

                <div style={{ ...styles.generalContainer, ...styles.bottomMargin15, ...styles.alignCenter }}>
                    <select style={{ ...styles.mediumwidth, ...styles.generalFont, ...regularFont }}
                        value={this.getClientID()}
                        onChange={event => { this.handleClientID(event.target.value) }}>
                        <option value="">Select A Client</option>
                        {this.showclients()}
                    </select>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                </div>

                <div style={{ ...styles.generalContainer, ...styles.alignCenter }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.saveProjects() }}>{saveIcon()}</button>
                </div>

                {this.showProjects()}

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
        clients: state.clients,
        projects: state.projects
    }
}

export default connect(mapStateToProps, actions)(Projects);