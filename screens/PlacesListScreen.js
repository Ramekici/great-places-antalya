import React from 'react';
import { StyleSheet, Platform, FlatList } from 'react-native'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';


const PlacesListScreen = (props) => {
    const places = useSelector(state => state.places.places);
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
                    image={null}
                    title={itemData.item.title}
                    adress={null} />
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