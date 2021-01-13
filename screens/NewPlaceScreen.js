import React, { useState, useCallback} from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/places-actions'

import Colors from '../constants/Colors';
import ImagePicker from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';


const NewPlacesScreen = (props) => {

    const [titleValue, setTitleValue] = useState('');
    const [selectedImg, setSelectedImg] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const dispatch = useDispatch()

    const titleChange = text => {
        setTitleValue(text)
    }



    const savePlaceHandler = () => {
        
        dispatch(placesActions.addPlace(titleValue, selectedImg, selectedLocation));
        props.navigation.goBack();
    }

    const setImage = (img) => {
        setSelectedImg(img)
    }

    const locationPickedHandler = useCallback(
        (location) => {
            setSelectedLocation(location);
        },[],
    )

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}> Başlık </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChange}
                    value={titleValue} />
                <ImagePicker 
                    onImageTaken={setImage}/>
                <LocationPicker 
                    route={props.route}
                    navigation = {props.navigation}
                    onLocationPicked={locationPickedHandler}/>
                <Button 
                    title="Kaydet" 
                    color={Colors.primary} 
                    onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
}



export const screenOptions = navData => {
    return {
        headerTitle:"Yer Ekle",
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2

    }

})

export default NewPlacesScreen;