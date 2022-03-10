const formu = document.getElementById("formi");
const formu2 = document.getElementById("formi");
const gastoBtn = document.getElementById("gasto");
const ingresoBtn = document.getElementById("ingreso");

// formu.addEventListener('submit', (event) => {
//     event.preventDefault();

//     let transaccionFormData = new FormData(formu);
//     let transaccionObj = convertirFormDataToObj(transaccionFormData);
//     if (isValidTransaccionForm(transaccionObj)) {
//         saveTransaccionObj(transaccionObj);
//         insertRowInHistoryTableIngreso(transaccionObj);
//         formu.reset();
//     } else {
//         // mostrar error
//     }
// })

formu.addEventListener('submit', (event) => {
    event.preventDefault();

    let transaccionFormData = new FormData(formu);
    let transaccionObj = convertirFormDataToObj(transaccionFormData);
    if (isValidTransaccionForm(transaccionObj)) {
        saveTransaccionObj(transaccionObj);
        insertRowInHistoryTableIngreso(transaccionObj);
        formu.reset();
    } else {
        // mostrar error
    }
})

formu2.addEventListener('submit', (event) => {
    let transaccionFormDataGasto = new FormData(formu);
    let transaccionObjGasto = convertirFormDataToObjGasto(transaccionFormDataGasto);
    if (isValidTransaccionForm(transaccionObjGasto)) {
        saveTransaccionObjGasto(transaccionObjGasto);
        insertRowInHistoryTableGasto(transaccionObjGasto);
        formu.reset();
    } else {
        // mostrar error
    }
})

document.addEventListener("DOMContentLoaded", function (event) {
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    transaccionObjArray.forEach(
        function (transaccionArray) {
            insertRowInHistoryTableIngreso(transaccionArray)
        }
    )
})

document.addEventListener("DOMContentLoaded", function (event) {
    let transaccionObjArrayGasto = JSON.parse(localStorage.getItem("transaccionData"))
    transaccionObjArrayGasto.forEach(
        function (transaccionArrayGasto) {
            insertRowInHistoryTableGasto(transaccionArrayGasto)
        }
    )
})

function getNewTransaccionId() {
    let lastTransaccionId = localStorage.getItem("lastTransaccionId") || "-1";
    let NewTransaccionId = JSON.parse(lastTransaccionId) + 1;
    localStorage.setItem("lastTransaccionId", JSON.stringify(NewTransaccionId))
    return NewTransaccionId;
}

function getNewTransaccionIdGasto() {
    let lastTransaccionIdGasto = localStorage.getItem("lastTransaccionIdGasto") || "-1";
    let getNewTransaccionIdGasto = JSON.parse(lastTransaccionIdGasto) + 1;
    localStorage.setItem("lastTransaccionIdGasto", JSON.stringify(getNewTransaccionIdGasto))
    return getNewTransaccionIdGasto;
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

function convertirFormDataToObjGasto(transaccionFormDataGasto) {
    let conceptoGasto = transaccionFormDataGasto.get("concepto");
    let cantidadGasto = transaccionFormDataGasto.get("cantidad");
    let transaccionIdGasto = getNewTransaccionIdGasto();
    return {
        "concepto": conceptoGasto,
        "cantidad": cantidadGasto,
        "transaccionId": transaccionIdGasto,
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

// function isValidTransaccionFormGasto(transaccionObjGasto) {
//     let = isValidForm = true;
//     if (!transaccionObjGasto["concepto"]) {
//         alert("Por favor escribe un concepto de ingreso o gasto");
//         isValidForm = false;
//     }
//     if (!transaccionObjGasto["cantidad"]) {
//         alert("Por favor escribe una cantidad");
//         isValidForm = false;
//     } else if (transaccionObjGasto["cantidad"] < 0) {
//         alert("Por favor no puede ingresar numeros negativos");
//         isValidForm = false;
//     }
//     return isValidForm;
// }

function insertRowInHistoryTableIngreso(transaccionObj) {
    let historyTableRef = document.getElementById("historyTable");

    let newHistoryRowRef = historyTableRef.insertRow(-1);

    newHistoryRowRef.setAttribute("data-transaccion-Id", transaccionObj["transaccionId"]);

    let newHistoryCellRef = newHistoryRowRef.insertCell(0);
    newHistoryCellRef.textContent = transaccionObj["concepto"];

    newHistoryCellRef = newHistoryRowRef.insertCell(1);
    newHistoryCellRef.textContent = transaccionObj["cantidad"];
    let historialIngreso = newHistoryCellRef;
    historialIngreso.classList.add("historialIngreso");

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

function insertRowInHistoryTableGasto(transaccionObjGasto) {
    let historyTableRefGasto = document.getElementById("historyTable");

    let newHistoryRowRefGasto = historyTableRefGasto.insertRow(-1);

    newHistoryRowRefGasto.setAttribute("data-transaccion-Id-gasto", transaccionObjGasto["transaccionId"]);

    let newHistoryCellRefGasto = newHistoryRowRefGasto.insertCell(0);
    newHistoryCellRefGasto.textContent = transaccionObjGasto["concepto"];

    newHistoryCellRefGasto = newHistoryRowRefGasto.insertCell(1);
    newHistoryCellRefGasto.textContent = transaccionObjGasto["cantidad"];
    let historialGasto = newHistoryCellRefGasto;
    historialGasto.classList.add("historialGasto");

    let newDeleteCell = newHistoryRowRefGasto.insertCell(2);
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "X";
    newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        let transaccionRow = event.target.parentNode.parentNode;
        let transaccinoId2 = transaccionRow.getAttribute("data-transaccion-Id-gasto");
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

function saveTransaccionObjGasto(transaccionObjGasto) {
    let myTransaccionArrayGasto = JSON.parse(localStorage.getItem("transaccionData")) || [];
    myTransaccionArrayGasto.push(transaccionObjGasto);
    let TransaccionArrayGastoJSON = JSON.stringify(myTransaccionArrayGasto);
    localStorage.setItem("transaccionData", TransaccionArrayGastoJSON);
}

// Le paso como parametro el transaccionId de la transaccion
// que quiero eliminar
function DeleteTransaccionObj(transaccionId){
    // Obtengo las transaccion de mi "base de datos"
    // DESCONVIERTO DE JSON A OBJETO
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    // Busco el indice o posicion de la transaccion que 
    // quiero eliminar
    let transaccionIndexArray = transaccionObjArray.findIndex(element => element.transaccionId == transaccionId);
    // Elimino la transaccion o el elemento de esa posicion
    transaccionObjArray.splice(transaccionIndexArray, 1);
    // convierto de objeto a JSON
    let TransaccionArrayJSON = JSON.stringify(transaccionObjArray);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayJSON); 

}

// Le paso como parametro el transaccionId de la transaccion
// que quiero eliminar
function DeleteTransaccionObjGasto(transaccionIdGasto){
    // Obtengo las transaccion de mi "base de datos"
    // DESCONVIERTO DE JSON A OBJETO
    let transaccionObjArrayGasto = JSON.parse(localStorage.getItem("transaccionData"))
    // Busco el indice o posicion de la transaccion que 
    // quiero eliminar
    let transaccionIndexArrayGasto = transaccionObjArrayGasto.findIndex(element => element.transaccionId == transaccionId);
    // Elimino la transaccion o el elemento de esa posicion
    transaccionObjArrayGasto.splice(transaccionIndexArrayGasto, 1);
    // convierto de objeto a JSON
    let TransaccionArrayGastoJSON = JSON.stringify(transaccionObjArrayGasto);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayGastoJSON); 

}
