import { combineReducers } from 'redux';
import { sliderReducer } from '../reducers';

export default combineReducers({
  sliders: sliderReducer,
});
