import {MYUSER, CLIENTS, PROJECTS, REPORTS, PAVEMENT, BORINGS, MYADMIN} from './types';

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

export const reduxPavement = (pavement ) => async dispatch => {

    dispatch({ type: PAVEMENT, payload: pavement })
}

export const reduxBorings = (borings ) => async dispatch => {

    dispatch({ type: BORINGS, payload: borings  })
}

export const reduxMyAdmin = (myadmin) => async dispatch => {

    dispatch({ type: MYADMIN, payload: myadmin  })
}


