import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import { MyStylesheet } from './components/styles';
import logo from './logo.svg';
import { LoadUser } from './components/actions/api'
import { connect } from 'react-redux';
import * as actions from './components/actions';
import Landing from './components/landing';
import Header from './components/header'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Profile from './components/profile'
import UES from './components/ues';
import Projects from './components/projects';
import Clients from './components/clients';
import Project from './components/project'
import Proposals from './components/proposals'
import Report from './components/report';


const ShowReport = () => {
  const { projectid, userid } = useParams();
  return(<Report userid={userid} projectid={projectid} />)
}

const ShowProject = () => {
  const { projectid, userid } = useParams();
  return (<Project userid={userid} projectid={projectid} />)
}

const ShowProposals = () => {
  const { projectid, userid } = useParams();
  return(<Proposals userid={userid} projectid={projectid} />)
}


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {

      render: '', width: 0, height: 0, register: false, userid: '', message: ''

    }

     this.updateWindowDimensions = this.updateWindowDimensions.bind(this)

  }
  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
    this.updateWindowDimensions();
    this.getUser()


    const config = () => {
      return ({
        apiKey: "AIzaSyDO-cDb5lRjsaD4ft0It270li1_uNa42BA",
        authDomain: "appbaseddriver.firebaseapp.com",
        databaseURL: "https://appbaseddriver.firebaseio.com",
        projectId: "appbaseddriver",
        storageBucket: "appbaseddriver.appspot.com",
        messagingSenderId: "903768173811",
        appId: "1:903768173811:web:93d4a7bf982bbc0a1fdb86",
        measurementId: "G-GNQ5QDP478"
      })
    }
    firebase.initializeApp(config());

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  async getUser() {
    try {

      const myuser = await LoadUser();
      // console.log(myuser)
      if (myuser.hasOwnProperty("myuser")) {
        this.props.reduxUser(myuser.myuser)
        this.setState({ render: 'render' })
      }


    } catch (err) {
      alert(err)
    }

  }


  render() {
    const ues = new UES();
    const styles = MyStylesheet();
    const landing = new Landing();
    const header = new Header();
    const profile = new Profile()
    const myuser = ues.checkUser.call(this)


    const defaultLogo = (myuser) => {
      if (myuser) {

        return (profile.showProfile.call(this))

      } else {

        return (<div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Hello <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>)

      }

    }

   
   

    return (
      <div style={{ ...styles.generalContainer }}>

        <BrowserRouter>
          <div style={{ ...styles.generalContainer, ...styles.addMargin }}>
            {header.showHeader.call(this)}
            <Routes>
              <Route exact path="/" element={defaultLogo(myuser)} />
              <Route exact path="/login" element={landing.handleLanding.call(this)} />
              <Route exact path="/:userid/profile" element={profile.showProfile.call(this)} />
              <Route exact path="/:userid/clients" element={<Clients />} />
              <Route exact path="/:userid/projects" element={<Projects />} />
              <Route exact path="/:userid/projects/:projectid" element={<ShowProject />} />
              <Route exact path="/:userid/projects/:projectid/proposals" element={<ShowProposals />} />
              <Route exact path="/:userid/projects/:projectid/report" element={<ShowReport />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>


    );
  }
}

function mapStateToProps(state) {
  return {
    myuser: state.myuser
  }
}

export default connect(mapStateToProps, actions)(App);
