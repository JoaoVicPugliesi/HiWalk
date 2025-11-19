const travelDequeueBtn = document.querySelector('.travel-dequeue-btn');

const dequeueReservation = () => {
    travelDequeueBtn.addEventListener('click', async (e) => {
        console.log('clicked');
        e.preventDefault();
        try {
            const req = await fetch('http://127.0.0.1:8000/reservation/dequeue', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await req.json();
            console.log(response);
        } catch(err) {
            console.error(err);
        }
    });
}

export default dequeueReservation;