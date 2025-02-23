import placesJSON from "./placesJSON.js";

const renderingPlaces = () => {
    const places = document.querySelector('.places');
    const searchbar = document.querySelector('.searchbar');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentPage = 1;
    let pageSize = 8;

    const displayPlaces = (search = "", page = 1) => {

        places.innerHTML = '';
        const searched = search.toLowerCase();
        let results = [];

        // Filling results arr. Goal: O(n) -> O(k)
        results = placesJSON.filter(place => place.name.toLowerCase().includes(searched));
        /* 
            for (i = 0; i < placesJSON.length; i++) {
                const place = placesJSON[i].name.toLowerCase();
        
                if (place.includes(search)) {
                    results.push(placesJSON[i]);
                }
            }
        */
        // Pagination

        let totalPages = Math.ceil(results.length / pageSize);
        let start = (page - 1) * pageSize;
        let end = start + pageSize;

        prevBtn.disabled = page <= 1 || results.length === 0;
        nextBtn.disabled = page >= totalPages || results.length === 0;

        if (results.length === 0) {
            places.innerHTML = `
            <div class="no-results">
                <h3>No Results Found</h3>
            </div>
            `;
            return;
        }

        places.innerHTML = results.slice(start, end).map(place => 
            `
                <div class="place">
                    <div class="place-inner">
                        <img src="${place.image}" alt="" draggable="false">
                    </div>
                    <div class="place-knowledge">
                        <h3>${place.name}</h3>
                        <p>${place.description}</p>
                        <div class="place-knowledge-price">
                            <h3>${place.price}</h3>
                            <a href="" class="place-icon-link" data-place-id="${place.id}"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            `
        ).join('');

        /* 
            for (i = start; i < end && i < results.length; i++) {
                places.innerHTML += 
            }
        */
        /* 
            prevBtn.addEventListener("click", () => {
                
            });
        */

        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPlaces(search, currentPage);
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPlaces(search, currentPage);
            }
        };

        /*
            nextBtn.addEventListener("click", () => {
            
            });
        */

    }

    displayPlaces();

    searchbar.addEventListener('input', () => {
        currentPage = 1;
        displayPlaces(searchbar.value);
    });
}

export default renderingPlaces;

