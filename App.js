import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './navigation/AppNavigator';

import placesReducer from './store/places-reducers';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}


const rootReducer = combineReducers({
  places: placesReducer
})

const store =  createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  const [fetchFontLoad, setFetchFontLoad ] = useState(false);

  if(!fetchFontLoad) {
    return <AppLoading 
            startAsync={fetchFonts}
            onFinish={()=> setFetchFontLoad(true)}
            onError={console.warn} />
  }

  return (
    <Provider store = {store}>
      <AppNavigator/>
    </Provider>
  );
}


