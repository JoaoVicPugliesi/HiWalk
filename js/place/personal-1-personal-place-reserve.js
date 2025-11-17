const placePrice = document.querySelector('.place-info-price');
const placeMonth = document.querySelector('.place-info-calendar-month');
const placeMonthDays = document.querySelector('.place-info-calendar-month-days');
const placeHowManyDays = document.querySelector('.place-info-calendar-how-may-days');
const placeHowMuch = document.querySelector('.place-info-calendar-how-much');
const placeBtn = document.querySelector('.place-info-confirm-calendar-btn');

const placeId = localStorage.getItem('current-place-id');
let DTO = {
    place_id: Number(placeId),
    starting_month: '',
    ending_month: '',
    starting_day: 0,
    ending_day: 0,
    days: 0,
    months: [],
    to_be_paid: 0
};

let selectingStart = true;
let hasSelectedStart = false;
let selectedMonths = [];

const clearSelections = () => {
    document.querySelectorAll('.place-info-calendar-month-days-div')
        .forEach(div => div.classList.remove('selected'));
};

const reservePlace = async () => {
    e.preventDefault();

   
 const reservePlace = ( ) => {
    const placeBtn = document.getElementById('place-btn-id'); 
    placeBtn.addEventListener('click', async (e) => {
        e.preventDefault();

      
        const response = await fetch('http://127.0.0.1:5000/place/reserve', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(DTO )
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Reserva feita com sucesso!", data);
        } else {
            console.error("Falha ao fazer a reserva.");
        }
    });
};


placeBtn.addEventListener('click', async (e) => {

    e.preventDefault();

    const endpoint = 'http://127.0.0.1:8000'; 

    try {
        console.log('Enviando os seguintes dados (DTO ):', DTO);

   
        const resposta = await fetch(endpoint, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
         
            body: JSON.stringify(DTO)
        });

       
        if (!resposta.ok) {
            // S
            const erroTexto = await resposta.text();
            throw new Error(`Erro do servidor: ${resposta.status} - ${erroTexto}`);
        }

      
        const dadosDaResposta = await resposta.json();

        console.log('Sucesso! Resposta recebida:', dadosDaResposta);
        alert('Operação concluída com sucesso!');
        


    } catch (erro) {

        console.error('Falha na operação:', erro);
        alert('Houve um problema ao realizar a operação. Verifique o console para mais detalhes.');
    }
});

};

export default reservePlace;
