const placeCreateForm = document.querySelector('.place-create-form');

const placeCreateHttp = () => {
    if (!placeCreateForm) return;
    placeCreateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(placeCreateForm);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) throw new Error('HTTP error ' + response.status);

            const result = await response.json();
            console.log('Success:', result);
        } catch (err) {
            console.error('Request failed:', err);
        }
    })
}

export default placeCreateHttp;