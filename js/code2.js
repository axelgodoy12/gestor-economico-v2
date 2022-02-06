const formu = document.getElementById("formi")

formu.addEventListener('submit', (event) => {
    event.preventDefault();

    let transaccionFormData = new FormData(formu);
    let transaccionObj = convertirFormDataToObj(transaccionFormData);
    if (isValidTransaccionForm(transaccionObj)) {
        saveTransaccionObj(transaccionObj);
        insertRowInHistoryTable(transaccionObj);
        formu.reset();
    } else {
        // mostrar error
    }
})

document.addEventListener("DOMContentLoaded", function (event) {
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    transaccionObjArray.forEach(
        function (transaccionArray) {
            insertRowInHistoryTable(transaccionArray)
        }
    )
})

function getNewTransaccionId() {
    let lastTransaccionId = localStorage.getItem("lastTransaccionId") || "-1";
    let NewTransaccionId = JSON.parse(lastTransaccionId) + 1;
    localStorage.setItem("lastTransaccionId", JSON.stringify(NewTransaccionId))
    return NewTransaccionId;
}

function convertirFormDataToObj(transaccionFormData) {
    let concepto = transaccionFormData.get("concepto");
    let cantidad = transaccionFormData.get("cantidad");
    let transaccionId = getNewTransaccionId();
    return {
        "concepto": concepto,
        "cantidad": cantidad,
        "transaccionId": transaccionId,
    }
}

function isValidTransaccionForm(transaccionObj) {
    let = isValidForm = true;
    if (!transaccionObj["concepto"]) {
        alert("Por favor escribe un concepto de ingreso o gasto");
        isValidForm = false;
    }
    if (!transaccionObj["cantidad"]) {
        alert("Por favor escribe una cantidad");
        isValidForm = false;
    } else if (transaccionObj["cantidad"] < 0) {
        alert("Por favor no puede ingresar numeros negativos");
        isValidForm = false;
    }
    return isValidForm;
}

function insertRowInHistoryTable(transaccionObj) {
    let historyTableRef = document.getElementById("historyTable");

    let newHistoryRowRef = historyTableRef.insertRow(-1);

    newHistoryRowRef.setAttribute("data-transaccion-Id", transaccionObj["transaccionId"]);

    let newHistoryCellRef = newHistoryRowRef.insertCell(0);
    newHistoryCellRef.textContent = transaccionObj["concepto"];

    newHistoryCellRef = newHistoryRowRef.insertCell(1);
    newHistoryCellRef.textContent = transaccionObj["cantidad"];

    let newDeleteCell = newHistoryRowRef.insertCell(2);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "X";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        let transaccionRow = event.target.parentNode.parentNode;
        let transaccinoId2 = transaccionRow.getAttribute("data-transaccion-Id");
        transaccionRow.remove();
        DeleteTransaccionObj(transaccinoId2);
    })
}

function saveTransaccionObj(transaccionObj) {
    let myTransaccionArray = JSON.parse(localStorage.getItem("transaccionData")) || [];
    myTransaccionArray.push(transaccionObj);
    let TransaccionArrayJSON = JSON.stringify(myTransaccionArray);
    localStorage.setItem("transaccionData", TransaccionArrayJSON);
}

// Le paso como parametro el transaccionId de la transaccion
// que quiero eliminar
function DeleteTransaccionObj(transaccionId){
    // Obtengo las transaccion de mi "base de datos"
    // DESCONVIERTO DE JSON A OBJETO
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    // Busco el indice o posicion de la transaccio que 
    // quiero eliminar
    let transaccionIndexArray = transaccionObjArray.findIndex(element => element.transaccionId == transaccionId);7
    // Elimino la transaccion o el elemento de esa posicion
    transaccionObjArray.splice(transaccionIndexArray, 1);
    // convierto de objeto a JSON
    let TransaccionArrayJSON = JSON.stringify(transaccionObjArray);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayJSON); 

}