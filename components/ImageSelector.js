import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors'

const ImageSelector = (props) => {

    const [pickedImg, setPickedImg] = useState();
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Camera İzni Yok',
                    'Bu uygulama için kamera izni verilmesi gereklidir.',
                    [{text: 'Okay'}]
                )
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
          props.onImageTaken(result.uri);
        }
      };

    //const verifyPermisssions = async () => {
    //const result = Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    //   if(result.status !== 'granted'){
    //       Alert.alert(
    //           'Camera İzni Yok',
    //           'Bu uygulama için kamera izni verilmesi gereklidir.',
    //           [{text: 'Okay'}]
    //       )
    //       return false;
    //   }
    //   return true;
    //}
 
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
                {!image ? <Text>
                    Herhangi bir resim yüklenmedi.
                </Text>
                :<Image style={styles.image} source= {{uri:image}}/>}
            </View>
            <Button
                title="Resim Yükle"
                color={Colors.primary}
                onPress={pickImage}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        flex:1,
        alignItems:'center',
        marginBottom:10
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