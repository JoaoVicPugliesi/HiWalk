const placeCreateForm = document.querySelector('.place-create-form');

const placeCreateHttp = () => {
    if (!placeCreateForm) return;
    placeCreateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(placeCreateForm);
        const data = Object.fromEntries(formData.entries());
        const dataStringfied = JSON.stringify(data);
        try {
            const req = await fetch('http://127.0.0.1:7000/place/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dataStringfied
            })
            if (!req.ok) throw new Error('HTTP error ' + req.status);

            await req.json();
        } catch (err) {
            console.error(err);
        }
    })
}

export default placeCreateHttp;
