import placesjson from './json.js';

const renderingPlaces = () => {
    const places = document.querySelector('.places');
    const searchbar = document.querySelector('.searchbar');
    const pagination = document.querySelector('.pagination');
    
    let currentPage = 1;
    let pageSize = 8;
    
    const displayPlaces = (search = "a", page = 1) => {
    
        places.innerHTML = '';
        pagination.innerHTML = '';
        search = search.toLowerCase();
        let results = [], i = 0;
    
        for (i; i < placesjson.length; i++) 
        {
            const place = placesjson[i].name.toLowerCase();
    
            if (place.includes(search)) {
                results.push(placesjson[i]);
            }
        }
    
        if (results.length === 0) 
        {
            places.innerHTML = `
            <div class="no-results">
                <h3>No Results Found</h3>
            </div>
            `;
        }
    
        let start = (page - 1) * pageSize;
        let end = start + pageSize;
    
        for (i = start; i < end && i < results.length; i++) 
        {
            places.innerHTML += `
                   <div class="place" place-id="${results[i].id}">
                    <div class="place-inner">
                        <img src="${results[i].image}" alt="" draggable="false">
                    </div>
                    <div class="place-knowledge">
                        <h3>${results[i].name}</h3>
                        <p>${results[i].description}</p>
                        <div class="place-knowledge-price">
                            <h3>${results[i].price}</h3>
                            <a href="#" class="place-icon-link"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
                `;
        }
    
    
        if (results.length > pageSize) 
        {
            if (page > 1) {
                pagination.innerHTML += `<a id="prev"><i class="fa-solid fa-left-long"></i></a>`;
            }
            if (end < results.length) {
                pagination.innerHTML += `<a id="next"><i class="fa-solid fa-right-long"></i></a>`;
            }
        }
    
        document.getElementById("prev")?.addEventListener("click", () => {
            currentPage--;
            displayPlaces(search, currentPage);
        });
    
        document.getElementById("next")?.addEventListener("click", () => {
            currentPage++;
            displayPlaces(search, currentPage);
        });
    
    }
    
    displayPlaces();
    
    searchbar.addEventListener('input', () => {
        currentPage = 1;
        displayPlaces(searchbar.value);
    });
}

export default renderingPlaces;

