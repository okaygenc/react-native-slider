import { SLIDER_LOAD_DATA } from "../actions";

export const sliderReducer = (state = [], action) => {
    switch (action.type) {
        case SLIDER_LOAD_DATA:
            return action.payload
        default:
            return state
    }
};
