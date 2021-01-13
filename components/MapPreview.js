import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ENV from '../env';


const MapPreview = (props) => {

    let imagePreviewUrl; /// google map api
    if (props.Location) {
        imagePreviewUrl = `....${props.Location.lat},${props.Location.lng} ...,key = ${ENV.googleApiKey}`
    }

    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={{...styles.mapPreview, ...props.style}}>
            {props.location ?
                (<Image style={styles.mapImage} source={{uri:imagePreviewUrl }}/>) :
                (props.children)}
        </TouchableOpacity >

    )
}


const styles = StyleSheet.create({
    mapPreview: {
        justifyContent:'center',
        alignItems:'center'
    },
    mapImage: {
        width:'100%',
        height:'100%'
    }
})

export default MapPreview;