const addToHistoryButton = document.querySelectorAll('.ingreso');

addToHistoryButton.forEach(addToHistory => {
    addToHistory.addEventListener('click', addToHistoryClicked);
})

const historyTransaccion = document.querySelector('.transaccion');

function addToHistoryClicked(event) {
    const button = event.target;
    const item = button.closest('.formi');

    const itemConcepto = item.querySelector('.concepto').textContent;
    const itemCantidad = item.querySelector('.cantidad').textContent;

    addItemToHistoryCard(itemConcepto, itemCantidad);
}

function addItemToHistoryCard(itemConcepto, itemCantidad) {
    const historyRow = document.createElement('div');
    const historyTransaccionContent = `
                        <div id="historialConcepto" class="historialConcepto">${itemConcepto}</div>
                        <div id="historialCantidad" class="historialCantidad">${itemCantidad}</div>
                        <button type="button" class="delete" id="delete">X</button>`;
    historyRow.innerHTML = historyTransaccionContent;
    historyTransaccion.append(historyRow);
}