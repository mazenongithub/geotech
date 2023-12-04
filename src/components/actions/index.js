import {MYUSER, CLIENTS, PROJECTS, REPORTS} from './types';

export const reduxUser = (myuser) => async dispatch => {

    dispatch({ type: MYUSER, payload: myuser })
}

export const reduxClients = (clients) => async dispatch => {

    dispatch({ type: CLIENTS, payload: clients })
}

export const reduxProjects = (projects) => async dispatch => {

    dispatch({ type: PROJECTS, payload: projects })
}

export const reduxReports = (reports) => async dispatch => {

    dispatch({ type: REPORTS, payload: reports })
}

