import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Colors from '../constants/Colors';


export default function ImageCamera() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    const cameraHandler =  useCallback(
        async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        },
        []
    ) 

    useEffect(() => {
        cameraHandler();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <Text style={styles.text}> Kamera Değiştir </Text>
                </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}


const styles = StyleSheet.create({ 
    container:{
        flex:1,
        borderColor: Colors.accent,
        borderWidth: 1,
    },
    camera:{
        width:'100%',
        height:200,
    },
    buttonContainer:{
        backgroundColor:Colors.primary,
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        width:"100%",
    },
    text:{
        width:'100%',
        color: 'white',
        fontSize: 12,
        marginTop: 10,
    }
}); 