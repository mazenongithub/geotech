import { MYADMIN } from '../actions/types';

export default function myadminreducer(state = {}, action) {
    switch (action.type) {
        case MYADMIN:
            return action.payload;
        default:
            return state;
    }
}