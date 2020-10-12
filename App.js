import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/store/reducers';

import Slider from './src/Slider';
import { loadData } from './src/actions';
import getData from './src/getData';
import config from './integration-config.json';

const store = createStore(rootReducer);

// Data configi
const data = getData(config);

store.dispatch(loadData(data))

const App = () => {
  return(
    <Provider store={store}>
        <Slider />
    </Provider>
  )
}

export default App;