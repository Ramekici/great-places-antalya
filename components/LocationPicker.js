import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isFetched, setIsFetched] = useState(false);

    const mapPickedLocation = props.route.params ? props.route.params.pickedLocation : null;

    const {onLocationPicked} = props;

    useEffect(() => {
        if(mapPickedLocation){
            setLocation(mapPickedLocation);
            onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const getLocations = async () => {
        setIsFetched(true);
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        try {
            let location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }); 
            onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })

        } catch (err) {
            Alert.alert(
                'Konum İzni Yok',
                'Bu uygulama için konum izni verilmesi gereklidir.',
                [{ text: 'Okay' }]
            )
        }
        setIsFetched(false);
    }

    const onPickMapHandler = () => {
        props.navigation.navigate('MapScreen')
    }


    return (
        <View style={styles.locationPicker}>
            <MapPreview 
                style={styles.mapPreview} 
                location={location}
                onPress={onPickMapHandler} >
                {isFetched ?
                    <ActivityIndicator size="large" color={Colors.primary} /> :
                    <Text> Herhangi bir konum yok!</Text>}
            </MapPreview>
            <View style={styles.action}>
                <Button
                    title="Lokasyonu"
                    color={Colors.primary}
                    onPress={getLocations}
                />
                <Button
                    title="Harita"
                    color={Colors.accent}
                    onPress={onPickMapHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    action:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-around",
        width:"100%"
    }
})

export default LocationPicker;