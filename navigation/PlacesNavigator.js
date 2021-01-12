import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import PlacesList, {screenOptions as PlacesListOpt } from '../screens/PlacesListScreen';
import PlaceDetail, {screenOptions as PlacesDetailOpt } from '../screens/PlaceDetailScreen';
import NewPlace, {screenOptions as NewPlaceOpt } from '../screens/NewPlaceScreen';
import MapScreen, {screenOptions as MapOpt } from '../screens/MapScreen';
import Colors from '../constants/Colors';



const defaultNavOptions = {
    headerStyle : {
        backgroundColor: Platform.OS=== 'android' ? Colors.primary :''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}
 
///// stack 
const GreatPlacesStack = createStackNavigator();

export const PlacesNavigator = () => {
  return (
    <GreatPlacesStack.Navigator
      screenOptions={defaultNavOptions}
    >
      <GreatPlacesStack.Screen  
        name="PlacesList"
        component={PlacesList}
        options={PlacesListOpt}
      />
      <GreatPlacesStack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={PlacesDetailOpt}
      />
      <GreatPlacesStack.Screen
        name="NewPlace"
        component={NewPlace}
        options={NewPlaceOpt}
      />
      <GreatPlacesStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={MapOpt}
      />
    </GreatPlacesStack.Navigator>
  );
}








