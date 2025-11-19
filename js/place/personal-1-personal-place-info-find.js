    const placeInfoFind = async (placeId) => {
        try {
            const req = await fetch(`http://127.0.0.1:8000/places/place/${placeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!req.ok) {
                throw new Error("Failed to fetch places");
            }
   
            const place = await req.json();
            
            return place || null;

        } catch (err) {
            return null;
        }
    }

    export default placeInfoFind;
