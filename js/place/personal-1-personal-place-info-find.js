    const placeInfoFind = async (placeId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/places/place/${placeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch places");
            }

            
            const place = await response.json();
            
            console.log(place);
            
            return place || null;

        } catch (err) {
            console.error(err);
            return null;
        }
    }

    export default placeInfoFind;
