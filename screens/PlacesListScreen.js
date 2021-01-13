import React, {useEffect} from 'react';
import { StyleSheet, Platform, FlatList } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = (props) => {
    const places = useSelector(state => state.places.places);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(placesActions.getPlaces())
    },[dispatch])


    const onSelectHandler = (title, id) => {
        props.navigation.navigate('PlaceDetail', { placeTitle: title, placeId: id })
    }
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <PlaceItem
                    onSelect={() => onSelectHandler(itemData.item.title, itemData.item.id)}
                    image={itemData.item.imageUri}
                    title={itemData.item.title}
                    adress={itemData.item.adress}/>
            }
        />
    )
}



export const screenOptions = navData => {
    return {
        headerTitle: "Gezilecek Yerler",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Yer Ekle"
                    iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
                    onPress={() => navData.navigation.navigate('NewPlace')}
                />
            </HeaderButtons>)

    }
}

const styles = StyleSheet.create({

})
export default PlacesListScreen;