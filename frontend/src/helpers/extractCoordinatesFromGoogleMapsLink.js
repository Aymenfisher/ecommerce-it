const extractCoordinatesFromGoogleMapsLink = (link) => {
    /* get link (could be also short link) then extract coordinates from it */
    try{
            // Get the final URL from the response
            const regex = /@(-?\d+\.\d+),(-?\d+\.\d+),/;
            const match = link.match(regex);
            if (match && match.length >= 3) {
                const latitude = parseFloat(match[1]);
                const longitude = parseFloat(match[2]);
                return { latitude, longitude };
            }else{
                return {latitude:36.740690, longitude:3.096240}; //algiers
            }
        }catch(e){
        return {latitude:36.740690, longitude:3.096240}; //algiers
    }
}

export default extractCoordinatesFromGoogleMapsLink
