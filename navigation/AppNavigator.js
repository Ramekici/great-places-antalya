import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PlacesNavigator} from './PlacesNavigator';



const AppNavigator = () => {
    return (
        <NavigationContainer>
            <PlacesNavigator />
        </NavigationContainer>
           
    )
}


export default AppNavigator;