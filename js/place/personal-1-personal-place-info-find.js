import placesJSON from "../placesJSON.js";

const placesMap = placesJSON.reduce((acc, place) => {
    acc[place.id] = place;
    return acc;
}, {})

const placeInfoFind = (placeId) => {
   // return placesJSON.find(place => place.id == placeId);

   return placesMap[placeId] || null;
}

export default placeInfoFind;