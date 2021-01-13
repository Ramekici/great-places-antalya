import React, { useState, useCallback, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import Colors from '../constants/Colors';

const MapScreen = (props) => {

  const initialLoc = props.route.params ? props.route.params.initialLocation : null;
  const readonly = props.route.params ? props.route.params.readonly : false;

  const [imageMark, setImageMarker] = useState(initialLoc);

  const mapRegion = {
    latitude: initialLoc ? initialLoc.lat : 39.1667,
    longitude: initialLoc ? initialLoc.lng : 35.6667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  let markerCoordinates;
  if (imageMark) {
    markerCoordinates = {
      latitude: imageMark.lat,
      longitude: imageMark.lng
    }
  }

  const onSelectHandler = event => {
    if (readonly) {
      return;
    }
    setImageMarker({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!imageMark) {
      return;
    }
    console.log(imageMark);
    props.navigation.navigate('NewPlace', { pickedLocation: imageMark });
  }, [imageMark])

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler })
  }, [savePickedLocationHandler])

  return (
    <View style={styles.container}>
      <MapView
        region={mapRegion}
        style={styles.map}
        onPress={onSelectHandler}>
        {markerCoordinates ? <Marker coordinate={markerCoordinates} title="Konum Seç">
        </Marker> : null}
      </MapView>
    </View>
  );
}

export const screenOptions = navData => {
  const saveFn = navData.route.params ? navData.route.params.saveLocation : {};
  const readonly = navData.route.params ? navData.route.params.readonly : null;
  if (readonly) {
    return {
      headerTitle: 'Harita'
    }
  }

  return {
    headerTitle: 'Harita',
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => saveFn()}>
        <Text style={styles.headerButtonText}> Kaydet </Text>
      </TouchableOpacity>),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? "white" : Colors.primary
  }
});


export default MapScreen;