const api = "https://api.exchangeratesapi.io/";

const el_currency_one = document.getElementById('currency_one');
const el_currency_two = document.getElementById('currency_two');
const el_amount = document.getElementById('amount');
const el_result = document.getElementById('result');
const el_btn_calculate = document.getElementById('btn_calculate');

fetch('./currencies.json').then(res => res.json()).then(data => {
    const keys = Object.keys(data);
    const values = Object.values(data);

    let options;

    for (let i = 0; i < keys.length; i++) {
        options += `
            <option value="${keys[i]}">${values[i]}</option>
        `
    }

    el_currency_one.innerHTML += options
    el_currency_two.innerHTML += options
});

el_btn_calculate.addEventListener('click', () => {
    const base_currency = el_currency_one.value;
    const to = el_currency_two.value;
    const amount = el_amount.value;

    fetch(`${api}latest?base=${base_currency}`).then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            el_result.innerHTML = `${amount} ${base_currency} = ${amount*rate} ${to}`;
        })

});