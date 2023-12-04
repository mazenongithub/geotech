import { REPORTS } from '../actions/types';

export default function reportsreducer(state = {}, action) {
    switch (action.type) {
        case REPORTS:
            return action.payload;
        default:
            return state;
    }
}