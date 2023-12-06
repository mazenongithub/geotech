import { PAVEMENT } from '../actions/types';

export default function pavementreducer(state = {}, action) {
    switch (action.type) {
        case PAVEMENT:
            return action.payload;
        default:
            return state;
    }
}