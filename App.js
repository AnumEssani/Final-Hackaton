/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import * as firebase from 'firebase';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStore, applyMiddleware, compose } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer from './store/reducer'

import AuthStack from './screens/authScreen/AuthScreen';
import LoadingScreen from './screens/LoadingScreen'
import HomeStack from './screens/HomeStack'


const firebaseConfig = {
  apiKey: "AIzaSyCDL32AsSyY623JO5OBk5hvMEyGDWYYdoc",
    authDomain: "final-hackaton.firebaseapp.com",
    databaseURL: "https://final-hackaton-default-rtdb.firebaseio.com",
    projectId: "final-hackaton",
    storageBucket: "final-hackaton.appspot.com",
    messagingSenderId: "652799270328",
    appId: "1:652799270328:web:21b9a152ac4a33c0da434d",
    measurementId: "G-Z6Q21PMLCQ"
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// For Middleware
const middleWare = [thunk];
// Initial State
const initialState = {
  name:'',
  email:'',
  userType:'',
  userProfile:[],
  companyProfiles:[],
  studentProfiles:[],
  companyVacancies:[]
}
// Compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store Created
const store = createStore(
  Reducer,  
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);


const LoadingProvider = ({navigation})=>{
  return(
    <Provider store={store}>
    <LoadingScreen navigation={navigation}/>
    </Provider>
  )
}

const AuthStackNavigator = ()=>{
  return(
    <Provider store={store}>
    <NavigationContainer>
      <AuthStack/>
    </NavigationContainer>
    </Provider>
  )
}



const HomeStackNavigator = ()=>{
  return(
    <Provider store={store}>
    <NavigationContainer >
      <HomeStack/>
    </NavigationContainer>
    </Provider>
  )
}


export default createAppContainer(createSwitchNavigator({
      Loading: LoadingProvider,
      Auth:AuthStackNavigator,
      App:HomeStackNavigator
    },
      {
        initalRouteName: "Loading"
      })
  )



