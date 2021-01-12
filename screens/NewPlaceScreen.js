import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useDispatch} from 'react-redux'
import * as placesActions from '../store/places-actions'

import Colors from '../constants/Colors';

const NewPlacesScreen = (props) => {

    const [titleValue, setTitleValue] = useState('');
    const dispatch = useDispatch()

    const titleChange = text => {
        setTitleValue(text)
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue));
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}> Title </Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleChange}
                    value={titleValue} />
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