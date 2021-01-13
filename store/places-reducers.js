import { ADD_PLACE, SELECT_PLACES } from './places-actions';
import Place from '../models/Place';

const intialState = {
    places: []
}

export default placesReducer = (state = intialState, action) => {

    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.adress,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
            )
            return {
                places: state.places.concat(newPlace)
            }
        case SELECT_PLACES:
            return {
                places: action.places.map(item =>
                    new Place(item.id.toString(),
                        item.title,
                        item.imageUri,
                        item.adress,
                        item.lat,
                        item.lng))
            }
        default:
            return state;
    }

}