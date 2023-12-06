import { combineReducers } from 'redux';
import myuser from './myuserreducer';
import clients from './clientsreducer'
import projects from './projectsreducer';
import reports from './reportsreducer';
import pavement from './pavementreducer'
import borings from './boringsreducer';

export default combineReducers({
    myuser,
    clients,
    projects,
    reports,
    pavement,
    borings
})