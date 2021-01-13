import * as FileSystem from 'expo-file-system';
export const ADD_PLACE = 'ADD_PLACE';
export const SELECT_PLACES = 'SELECT_PLACES';
import ENV from  '../env';
import {insertPlace, fetchPlaces} from '../helpers/db'


export const addPlace = (title, image, location) => {
    return async dispatch => {

        // const response = await fetch(``) goecide reverse konumdan adres bulma

        //if(!response.ok){
        //    throw new Error('Something went wrong');
        //}

        // const resData = await response.json();
        // if(!resData.results){throw new Error('Something went wrong');}

        // const adress = resData.results[0].formatted_adress;

        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName;
        try{
           await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, 'Dummy Adress', location.lat, location.lng);
            console.log(dbResult);
            dispatch({
                type: ADD_PLACE, 
                placeData: {
                    id:dbResult.insertId, 
                    title: title,
                    image: newPath,
                    adress: 'Dummy Adress',
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
                 }})
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}


export const getPlaces = () => {
    return async dispatch => {
        try{
            const dbResult = await fetchPlaces();
            dispatch({type: SELECT_PLACES, places: dbResult.rows._array})
        }catch(err){
            console.log(err);
            throw err;
        }
    }
}