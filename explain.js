import peopleArr from "./peopleDATA.js";

const showPeople = () => {
    const people = document.querySelector('.people');
    const searchbar = document.querySelector('.searchbar');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentPage = 1;
    let pageSize = 5;

    const renderPeople = (search = '', page = 1) => {
        people.innerHTML = '';
        const searched = search.toLowerCase();
        let results = [];
        
        // O(n). Goal: O(k);

        results = peopleArr.filter(person => person.name.toLowerCase().includes(searched));

        /* 
            for(i = 0; i < peopleArr.length; i++) {
            let name = peopleArr[i].name.toLowerCase();
                if(name.includes(searched)) {
                    results.push(peopleArr[i]);
                }
            }
        */

        console.log(results);
        
        // Verificação e Paginação

        let totalPages = Math.ceil(results.length / pageSize); // 3
        let start = (page - 1) * pageSize; // 0
        let end = start + pageSize; // 5

        prevBtn.disabled = page <= 1 || results.length === 0;
        nextBtn.disabled = page >= totalPages || results.length === 0;

        if(results.length === 0) {
            people.innerHTML = `<h3>No Results Found</h3>`;
            return;
        }
        
        // O(n). Goal: o(m)

        people.innerHTML += results.slice(start, end).map(person => 
            `<h3>${person.name}</h3>`
        ).join('');

        /* for(i = start; i < end && i < results.length; i++) {
            
        }
        */

        /* prevBtn.addEventListener('click', () => {
            
        });
        */  

        prevBtn.onclick = () => {
            if(currentPage > 1) {
                currentPage--;
                renderPeople(search, currentPage);
            }
        }
        nextBtn.onclick = () => {
            if(currentPage < totalPages) {
                currentPage++;
                renderPeople(search, currentPage);
            }
        }

        /*
        nextBtn.addEventListener('click', () => {
            
        });
        */
    };

    renderPeople();

    searchbar.addEventListener('input', () => {
        currentPage = 1;
        renderPeople(searchbar.value, currentPage);
    });
}

showPeople();