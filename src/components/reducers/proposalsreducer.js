import { PROPOSALS } from '../actions/types';

export default function proposalsreducer(state = {}, action) {
    switch (action.type) {
        case PROPOSALS:
            return action.payload;
        default:
            return state;
    }
}