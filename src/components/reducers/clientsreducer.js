import { CLIENTS } from '../actions/types';

export default function clientsreducer(state = {}, action) {
    switch (action.type) {
        case CLIENTS:
            return action.payload;
        default:
            return state;
    }
}