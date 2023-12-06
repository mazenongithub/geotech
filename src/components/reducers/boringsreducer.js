import { BORINGS } from '../actions/types';

export default function boringsreducer(state = {}, action) {
    switch (action.type) {
        case BORINGS:
            return action.payload;
        default:
            return state;
    }
}