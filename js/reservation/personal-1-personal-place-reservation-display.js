import placeInfoFind from "../place/personal-1-personal-place-info-find.js";

const travelsContainer = document.querySelector('.travels-container');

const displayReservations = async () => {
    travelsContainer.innerHTML = ""; 

    let reservations = [];

    try {
        const req = await fetch('http://127.0.0.1:8000/reservations');

        if (!req.ok) {
            travelsContainer.innerHTML = `
                <h3 class="travels-container-no-reservation">No Reservation</h3>
            `;
            return;
        }

        reservations = await req.json();
    } catch (err) {
        travelsContainer.innerHTML = `
            <h3 class="travels-container-no-reservation">Error loading reservations</h3>
        `;
        return;
    }

    if (reservations.length === 0) {
        travelsContainer.innerHTML = `
            <h3 class="travels-container-no-reservation">No Reservation</h3>
        `;
        return;
    }

    const places = await Promise.all(
        reservations.map(r => placeInfoFind(r.place_id))
    );
    let content = [];

    reservations.forEach((reservation, index) => {
        const place = places[index];

        content.push( `
            <div class="travel-container">
                <img src="${place.image}" alt="" draggable="false">

                <div class="travel-inner-container">
                    <a class="travel-inner-container-icon" href="">
                        <i class="fa-solid fa-arrow-left"></i>
                    </a>
                </div>

                <div class="travel-info-container">
                    <div class="travel-info-inner-container">
                        <a class="travel-info-inner-container-icon" href="">
                            <i class="fa-solid fa-arrow-down"></i>
                        </a>

                        <div class="travel-info-inner-details-container">
                            <h3>To: ${place.name}</h3>
                            <h3>How Many Days: ${reservation.days}</h3>
                            <h3>To Be Paid: ${reservation.to_be_paid}$</h3>
                            <h3>Starting Date: ${reservation.starting_month} ${reservation.starting_day}</h3>
                            <h3>Ending Date: ${reservation.ending_month} ${reservation.ending_day}</h3>
                        </div>

                        <div class="travel-info-inner-buttons-container">
                            <button>Update</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });

    travelsContainer.innerHTML = content.reverse();
};

export default displayReservations;
