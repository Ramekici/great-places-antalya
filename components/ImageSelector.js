import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors'

const ImageSelector = () => {

    const [pickedImg, setPickedImg] = useState();

    const verifyPermisssions = async () => {
       const result = Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
       if(result.status !== 'granted'){
           Alert.alert(
               'Camera İzni Yok',
               'Bu uygulama için kamera izni verilmesi gereklidir.',
               [{text: 'Okay'}]
           )
           return false;
       }
       return true;
    }
 
    const takeImageHandler = async () => {
        const haspermission = await verifyPermisssions();
        if(!haspermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImg(image.uri);
        props.onImageTaken(image.uri);
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImg ? <Text>
                    Herhangi bir resim yüklenmedi.
                </Text>
                :<Image style={styles.image} source= {{uri:pickedImg}}/>}
            </View>
            <Button
                title="Resim Yükle"
                color={Colors.primary}
                onPress={takeImageHandler}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        flex:1,
        alignItems:'center',
        marginBottom:1
    },
    imagePreview: {
        width:'100%',
        height: 200,
        marginBottom:10,
        justifyContent: 'center',
        alignItems:'center',
        borderColor:"#efefef",
        borderWidth: 1,

    },
    image: {
        width:'100%',
        height:'100%',
    }
})

export default ImageSelector;