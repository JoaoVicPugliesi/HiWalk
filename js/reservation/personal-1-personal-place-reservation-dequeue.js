const travelDequeueBtn = document.querySelector('.travel-dequeue-btn');

const dequeueReservation = () => {
    travelDequeueBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const req = await fetch('http://127.0.0.1:7000/reservation/dequeue', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            await req.json();
        } catch(err) {
            console.error(err);
        }
    });
}

export default dequeueReservation;
