import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import AppNavigator from './AppNavigator'
import rootReducer from './reducers/index'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, middleware)

export default class App extends React.Component {  
    render() {
      console.log(store.getState())
      return(
      <Provider store = {store}>
        <AppNavigator/>
      </Provider>
      );
    }
}
