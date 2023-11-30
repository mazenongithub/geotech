import { combineReducers } from 'redux';
import myuser from './myuserreducer';
import clients from './clientsreducer'
import projects from './projectsreducer'

export default combineReducers({
    myuser,
    clients,
    projects
})