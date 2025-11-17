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

const reservePlace = () => {
    placeMonthDays.addEventListener('click', (e) => {
        if (!e.target.classList.contains('place-info-calendar-month-days-div'))
            return;

        const day = parseInt(e.target.textContent);
        const currentMonth = placeMonth.textContent.toLowerCase();

        if (selectingStart) {
            DTO.starting_day = day;
            DTO.starting_month = currentMonth;

            selectedMonths.push(currentMonth);
            DTO.months = [...selectedMonths];

            clearSelections();
            e.target.classList.add('selected');

            selectingStart = false;
            hasSelectedStart = true;

            return;
        }

        if (!selectingStart && hasSelectedStart) {
            DTO.ending_day = day;
            DTO.ending_month = currentMonth;
            if (DTO.starting_month === currentMonth) {
                if (day <= DTO.starting_day) {
                    alert('Ending day must be after starting day.');
                    return;
                }

                DTO.days = day - DTO.starting_day;
            }
            else {
                if (!selectedMonths.includes(currentMonth)) {
                    selectedMonths.push(currentMonth);
                }

                DTO.months = [...selectedMonths];

                DTO.days =
                    (31 - DTO.starting_day) + 
                    DTO.ending_day;           
            }

            const price = parseInt(placePrice.textContent);
            DTO.to_be_paid = DTO.days * price;

            e.target.classList.add('selected');

            placeHowManyDays.textContent = 'days: ' + DTO.days;
            placeHowMuch.textContent = 'To be paid: ' + DTO.to_be_paid;

            selectingStart = true;

            return;
        }
    });

    // Assumindo que 'placeBtn' e 'DTO' já foram definidos no seu código
// Exemplo de como eles poderiam ser:
// const placeBtn = document.getElementById('seu-botao-id');
// const DTO = { nome: "Exemplo", valor: 123 };

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
