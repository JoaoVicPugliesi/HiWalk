const placeCreateForm = document.querySelector('.place-create-form');

const placeCreateHttp = () => {
    if (!placeCreateForm) return;
    const baseEndpoint = 'http://127.0.0.1:8000'
    placeCreateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(placeCreateForm);
        const data = Object.fromEntries(formData.entries());
        const dataStringfied = JSON.stringify(data);
        try {
            const response = await fetch(`${baseEndpoint}/create_place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: dataStringfied
            })
            if (!response.ok) throw new Error('HTTP error ' + response.status);

            const result = await response.json();
            console.log('Success:', result);
        } catch (err) {
            console.log(err);
        }
    })
}

export default placeCreateHttp;