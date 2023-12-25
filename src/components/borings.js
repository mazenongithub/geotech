import React, { Component } from 'react';
import { MyStylesheet } from './styles';
import { connect } from 'react-redux';
import * as actions from './actions';
import UES from './ues';
import { Link } from "react-router-dom";
import { removeIcon, linkArrow, saveIcon, calculateIcon } from './svg';
import { currentDate, newBoring,convertDegree } from './functions';
import MakeID from './makeids';
import Spinner from './spinner'



class Borings extends Component {
    constructor(props) {
        super(props);

        this.state = {

            render: '', width: 0, height: 0, message: '', activeboringid: false, boringnumber: '', datedrilled: currentDate(), diameter: '', gwdepth: '', elevation: '', drillrig: '', loggedby: '', latitude: '', longitude: '', remarks:'', drillmethod:'',contractor:'',samplingmethod:'',drivingmethod:'',checkedby:"",figure:"",backfill:""

        }

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

    }

    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
        const ues = new UES();
        const projects = ues.getProjects.call(this)
        const projectid = this.props.projectid;

        if (!projects) {
            ues.loadProjects.call(this);
        }

        const borings = ues.getBoringsbyProjectID.call(this, projectid)
        console.log(borings)
        if (!borings) {
            ues.loadBorings.call(this, projectid)

        }




    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    removeBoring(boringid) {
        const ues = new UES();
        const borings = ues.getBorings.call(this)
        if (borings) {
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings.splice(i, 1)
                this.props.reduxBorings(borings)
                this.setState({ activeboringid: false })
            }
        }

    }

    handleBoringID(boringid) {
        if (this.state.activeboringid) {

            this.setState({ activeboringid: false })
        } else {
            this.setState({ activeboringid: boringid })
        }

    }

    showBorings() {
        const ues = new UES();
        const projectid = this.props.projectid;
        let getborings = [];
        const borings = ues.getBoringsbyProjectID.call(this, projectid)
        if (borings) {
            // eslint-disable-next-line
            borings.map(boring => {
                getborings.push(this.showBoring(boring))
            })

        }
        return getborings;

    }

    showBoring(boring) {
        const ues = new UES();
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const iconWidth = ues.removeIcon.call(this)
        const arrowWidth = ues.arrowWidth.call(this)
        const projectid = this.props.projectid;
        const highlight = (boringid) => {
            if (boringid === this.state.activeboringid) {
                return (styles.activeid)
            }
        }
        const myuser = ues.checkUser.call(this)
        if (myuser) {
            const project = ues.getProjectbyID.call(this, projectid)
            if (project) {
                return (<div style={{ ...styles.generalContainer, ...styles.bottomMargin15 }} key={boring.boringid}>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex5, ...highlight(boring.boringid) }} onClick={() => { this.handleBoringID(boring.boringid) }}>

                            <span style={{ ...regularFont }}> Boring Number:{boring.boringnumber} DateDrilled:{boring.datedrilled} Diameter:{boring.diameter} Elevation: {boring.elevation} GWDepth: {boring.gwdepth} Drill Rig:{boring.drillrig} LoggedBy: {boring.loggedby} Latitude: {boring.latitude} Longitude: {boring.longitude} Remarks: {boring.remarks} Sampling Method: {boring.samplingmethod} Drill Method: {boring.drillmethod} Contractor: {boring.contractor} Backfill: {boring.backfill} DrivingMethod: {boring.drivingmethod} CheckedBy:{boring.checkedby} Figure: {boring.figure}</span>

                        </div>
                        <div style={{ ...styles.flex1 }}>
                            <button style={{ ...styles.generalButton, ...iconWidth }} onClick={() => { this.removeBoring(boring.boringid) }}>{removeIcon()}</button>

                        </div>

                    </div>
                    <div style={{ ...styles.generalContainer }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...regularFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${projectid}/borings/${boring.boringid}/samples`}><button style={{ ...styles.generalButton, ...arrowWidth }}>{linkArrow()}</button> Go To Samples </Link>
                    </div>
                </div>)

            }

        }

    }

    getBackfill() {
        const ues = new UES();
        let backfill = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                backfill = boring.backfill;
            }
        }
    
        return backfill;
    
    }
    
    handleBackfill(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].backfill = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const drillmethod = this.state.drillmethod;
            const remarks = this.state.remarks;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const contractor = this.state.contractor;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,value)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }

    getDrillMethod() {
        const ues = new UES();
        let drillmethod = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                drillmethod = boring.drillmethod;
            }
        }
    
        return drillmethod;
    
    }
    
    handleDrillMethod(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].drillmethod = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const contractor = this.state.contractor;
            const remarks = this.state.remarks;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, value,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }

    getCheckedBy() {
        const ues = new UES();
        let checkedby = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                checkedby = boring.checkedby;
            }
        }
    
        return checkedby;
    
    }
    
    handleCheckedBy(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].checkedby = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const drillmethod = this.state.drillmethod;
            const remarks = this.state.remarks;
            const backfill = this.state.backfill;
            const drivingmethod = this.state.drivingmethod;
            const figure = this.state.figure;
            const contractor = this.state.contractor;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,value,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }

    getContractor() {
        const ues = new UES();
        let contractor = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                contractor = boring.contractor;
            }
        }
    
        return contractor;
    
    }
    
    handleContractor(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].contractor = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const drillmethod = this.state.drillmethod;
            const remarks = this.state.remarks;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,value,samplingmethod,drivingmethod,checkedby,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }

    getDateDrilled() {
        const ues = new UES();
        let datedrilled = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                datedrilled = boring.datedrilled;
            }
        } else {
            datedrilled = currentDate()
        }

        return datedrilled;

    }

    handleDateDrilled(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].datedrilled = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const boringnumber = this.state.boringnumber;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const diameter = this.state.diameter;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, value, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter,remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getBoringNumber() {
        const ues = new UES();
        let boringnumber = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                boringnumber = boring.boringnumber;
            }
        }

        return boringnumber;

    }

    handleBoringNumber(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].boringnumber = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const diameter = this.state.diameter;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, value, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter,remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }


    getDiameter() {
        const ues = new UES();
        let diameter = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                diameter = boring.diameter;
            }
        }

        return diameter;

    }

    handleDiameter(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].diameter = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, value,remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }


    getGWDepth() {
        const ues = new UES();
        let gwdepth = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                gwdepth = boring.gwdepth;
            }
        }

        return gwdepth;

    }

    handleGWDepth(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].gwdepth = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, value, elevation, drillrig, loggedby, latitude, longitude, diameter,remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getElevation() {
        const ues = new UES();
        let elevation = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                elevation = boring.elevation;
            }
        }

        return elevation;

    }

    handleElevation(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].elevation = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, value, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getDrillRig() {
        const ues = new UES();
        let drillrig = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                drillrig = boring.drillrig;
            }
        }

        return drillrig;

    }

    handleDrillRig(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].drillrig = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, value, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getLoggedBy() {
        const ues = new UES();
        let loggedby = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                loggedby = boring.loggedby;
            }
        }

        return loggedby;

    }

    handleLoggedBy(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].loggedby = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const latitude = this.state.latitude;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, value, latitude, longitude, diameter,remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getLatitude() {
        const ues = new UES();
        let latitude = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                latitude = boring.latitude;
            }
        }

        return latitude;

    }

    handleLatitude(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].latitude = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const longitude = this.state.longitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, value, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }


    getLongitude() {
        const ues = new UES();
        let longitude = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                longitude = boring.longitude;
            }
        }

        return longitude;

    }

    handleLongitude(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].longitude = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }

        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const remarks = this.state.remarks;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, value, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)

            if (borings) {
                borings.push(newboring)

            } else {
                borings = [newBoring]

            }
            this.setState({ activeboringid: newboringid })
        }

    }

    getRemarks() {
        const ues = new UES();
        let remarks = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                remarks = boring.remarks;
            }
        }
    
        return remarks;
    
    }
    
    handleRemarks(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].remarks = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const samplingmethod = this.state.samplingmethod;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, value, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }

    getPosition() {


        const displayGeoData = (position) => {

            let latitude = position.coords.latitude;
            latitude = convertDegree(latitude)
            let longitude = position.coords.longitude
            longitude = convertDegree(longitude)

            this.handleLatitude(latitude);
            this.handleLongitude(longitude)

        };

        const displayError = (err) => {
            alert(err.message);
        };

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(displayGeoData, displayError);


        }


    }

    getSamplingMethod() {
        const ues = new UES();
        let samplingmethod = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                samplingmethod = boring.samplingmethod;
            }
        }
    
        return samplingmethod;
    
    }
    
    handleSamplingMethod(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].samplingmethod = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const drillmethod = this.state.drillmethod;
            const contractor = this.state.contractor;
            const remarks = this.state.remarks;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const backfill = this.state.backfill;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,value,drivingmethod,checkedby,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }


    getDrivingMethod() {
        const ues = new UES();
        let drivingmethod = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                drivingmethod = boring.drivingmethod;
            }
        }
    
        return drivingmethod;
    
    }
    
    handleDrivingMethod(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].drivingmethod = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const drillmethod = this.state.drillmethod;
            const remarks = this.state.remarks;
            const backfill = this.state.backfill;
            const checkedby = this.state.checkedby;
            const figure = this.state.figure;
            const contractor = this.state.contractor;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,value,checkedby,figure,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }


    getFigure() {
        const ues = new UES();
        let figure = "";
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                figure = boring.figure;
            }
        }
    
        return figure;
    
    }
    
    handleFigure(value) {
        const ues = new UES();
        const makeid = new MakeID();
        let borings = ues.getBorings.call(this)
        if (this.state.activeboringid) {
            const boringid = this.state.activeboringid;
            const boring = ues.getBoringbyID.call(this, boringid)
            if (boring) {
                const i = ues.getBoringKeybyID.call(this, boringid)
                borings[i].figure = value;
                this.props.reduxBorings(borings)
                this.setState({ render: 'render' })
            }
    
        } else {
            const newboringid = makeid.boringID.call(this)
            const projectid = this.props.projectid;
            const datedrilled = this.state.datedrilled;
            const diameter = this.state.diameter;
            const gwdepth = this.state.gwdepth;
            const elevation = this.state.elevation;
            const drillrig = this.state.drillrig;
            const loggedby = this.state.loggedby;
            const latitude = this.state.latitude;
            const boringnumber = this.state.boringnumber;
            const longitude = this.state.longitude;
            const samplingmethod = this.state.samplingmethod;
            const drillmethod = this.state.drillmethod;
            const remarks = this.state.remarks;
            const backfill = this.state.backfill;
            const drivingmethod = this.state.drivingmethod;
            const checkedby = this.state.checkedby;
            const contractor = this.state.contractor;
            const newboring = newBoring(newboringid, projectid, boringnumber, datedrilled, gwdepth, elevation, drillrig, loggedby, latitude, longitude, diameter, remarks, drillmethod,contractor,samplingmethod,drivingmethod,checkedby,value,backfill)
    
            if (borings) {
                borings.push(newboring)
    
            } else {
                borings = [newBoring]
    
            }
            this.setState({ activeboringid: newboringid })
        }
    
    }





    render() {
        const ues = new UES();
        const projectid = this.props.projectid;
        const project = ues.getProjectbyID.call(this, projectid);
        const styles = MyStylesheet();
        const regularFont = ues.regularFont.call(this)
        const myuser = ues.checkUser.call(this)
        const headerFont = ues.headerFont.call(this)
        const buttonWidth = ues.generateIcon.call(this)

        const showSaveIcon =() => {
            if(this.state.spinner) {
                return (<Spinner/>)

            } else {
                return(<div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                    <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { ues.saveBorings.call(this) }}>{saveIcon()}</button>
                </div>)
            }
        }
        if (myuser) {
            if (project) {
                return (<div style={{ ...styles.generalContainer, ...styles.marginTop75 }}>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}`}>
                            /{project.projectnumber} {project.title} </Link>
                    </div>
                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <Link style={{ ...styles.generalLink, ...styles.generalFont, ...headerFont, ...styles.boldFont, ...styles.generalColor }} to={`/${myuser.userid}/projects/${project.projectid}/borings`}>
                            /borings</Link>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="date" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getDateDrilled()}
                                onChange={event => { this.handleDateDrilled(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Date Drilled</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getBoringNumber()}
                                onChange={event => { this.handleBoringNumber(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}
                            >Boring Number</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getDiameter()}
                                onChange={event => { this.handleDiameter(event.target.value) }}
                            />
                            <span style={{ ...styles.generalFont, ...regularFont }}
                            >Boring Diameter</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getGWDepth()}
                                onChange={event => { this.handleGWDepth(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>GW Depth</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getElevation()}
                                onChange={event => { this.handleElevation(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Surface Elevation</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getDrillRig()}
                                onChange={event => { this.handleDrillRig(event.target.value) }}
                            />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Drill Rig</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getLoggedBy()}
                                onChange={event => { this.handleLoggedBy(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Logged By</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalContainer }}>
                        <button style={{ ...styles.generalButton, ...buttonWidth }} onClick={() => { this.getPosition() }}>{calculateIcon()}</button>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getLatitude()}
                                onChange={event => { this.handleLatitude(event.target.value) }}
                            />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Latitude</span>
                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin }}>
                            <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getLongitude()}
                                onChange={event => { this.handleLongitude(event.target.value) }} />
                            <span style={{ ...styles.generalFont, ...regularFont }}>Longitude</span>
                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} 
                                    value={this.getRemarks()}
                                    onChange={event=>{this.handleRemarks(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Remarks</span>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getSamplingMethod()}
                                onChange={event=>{this.handleSamplingMethod(event.target.value)}} />
                            </div>
                            <span style={{ ...regularFont }}>Sampling Method</span>

                        </div>

                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getDrillMethod()} 
                                    onChange={event=>{this.handleDrillMethod(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Drill Method</span>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} 
                                    value={this.getContractor()}
                                    onChange={event=>{this.handleContractor(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Contractor</span>

                        </div>

                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }}
                                value={this.getBackfill()}
                                onChange={event=>{this.handleBackfill(event.target.value)}} />
                            </div>
                            <span style={{ ...regularFont }}>Backfill</span>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} 
                                    value={this.getDrivingMethod()}
                                    onChange={event=>{this.handleDrivingMethod(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Driving Method</span>

                        </div>


                    </div>
                    <div style={{ ...styles.generalFlex, ...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} 
                                    value={this.getCheckedBy()}
                                    onChange={event=>{this.handleCheckedBy(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Check By</span>

                        </div>
                        <div style={{ ...styles.flex1, ...styles.addMargin, ...styles.generalFont }}>

                            <div style={{ ...styles.generalContainer }}>
                                <input type="text" style={{ ...styles.generalFont, ...regularFont, ...styles.generalField }} 
                                    value={this.getFigure()}
                                    onChange={event=>{this.handleFigure(event.target.value)}}
                                />
                            </div>
                            <span style={{ ...regularFont }}>Figure</span>

                        </div>


                    </div>

                    <div style={{ ...styles.generalContainer, ...styles.alignCenter, ...styles.bottomMargin15 }}>
                        <span style={{ ...styles.generalFont, ...regularFont }}>{this.state.message}</span>
                    </div>

                    {showSaveIcon()}


                    {this.showBorings()}
                </div>)

            } else {
                return (<div style={{ ...styles.generalContainer }}>

                    <span style={{ ...styles.generalFont, ...regularFont }}>Project Not Found </span>
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
        projects: state.projects,
        borings: state.borings
    }
}

export default connect(mapStateToProps, actions)(Borings);