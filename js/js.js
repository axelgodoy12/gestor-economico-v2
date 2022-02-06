const formu = document.getElementById("formi");

formu.addEventListener('submit', (event) => {
        event.preventDefault();

        let transaccionFormData = new FormData(formu);
        let transaccionObj = convertirFormDataToObj(transaccionFormData);
        // console.log(transaccionObj);
        if (isValidTransaccionForm(transaccionObj)) {
            saveTransaccionObj(transaccionObj);
            insertRowInTransaccionTable(transaccionObj);
            formu.reset();
        } else {
            //mostrar error
        }
    }
)

document.addEventListener("DOMContentLoaded", function(event){
    // draw_category();
    let transaccionObjArray = JSON.parse(localStorage.getItem("transaccionData"))
    transaccionObjArray.forEach(
        function(transaccionArray) {
            insertRowInTransaccionTable(transaccionArray)
        })
})

// function draw_category() {
//     let allCategories = [
//         "Comida", "Alquiler", "Hobby", "Joda", "Salario"
//     ]
//     for (let index = 0; index < allCategories.length; index++) {
//         insertCategory(allCategories[index]);
//     }
// }

// function insertCategory(category) {
//     const selectElement = document.getElementById("categoria");
//     let htmlToInsert = `<option> ${category} </option>`;
//     selectElement.insertAdjacentHTML("beforeend", htmlToInsert);
// }

function isValidTransaccionForm(transaccionObj) {
    let = isValidForm = true;
    if (!transaccionObj["historialConcepto"]){
        alert("Debes elegir un concepto");
        isValidForm = false;
    }
    if (!transaccionObj["historialCantidad"]) {
        alert("Te falto la cantidad");
        isValidForm = false;
    }
    return isValidForm;
}

function getNewTransaccionId() {
    let lastTransaccionId = localStorage.getItem("lastTransaccionId") || "-1";
    let NewTransaccionId = JSON.parse(lastTransaccionId) + 1;
    localStorage.setItem("lastTransaccionId", JSON.stringify(NewTransaccionId))
    return NewTransaccionId;
}

function convertirFormDataToObj(transaccionFormData){
    let historialConcepto = transaccionFormData.get("historialConcepto");
    let historialCantidad = transaccionFormData.get("historialCantidad");
    let transaccionId = getNewTransaccionId();
    return {
        "historialConcepto": historialConcepto,
        "historialCantidad": historialCantidad,
        "transaccionId": transaccionId,
    }
}

function insertRowInTransaccionTable (transaccionObj){
    let transaccionTableRef = document.getElementById("transaccionTable");
    
    let newTransaccionRowRef = transaccionTableRef.insertRow(-1);
    
    newTransaccionRowRef.setAttribute("data-transaccion-Id", transaccionObj["transaccionId"]);
    
    let newTransaccionCellref = newTransaccionRowRef.insertCell(0);
    newTransaccionCellref.textContent = transaccionObj["historialConcepto"];
    
    newTransaccionCellref = newTransaccionRowRef.insertCell(1);
    newTransaccionCellref.textContent = transaccionObj["historialCantidad"];
    
    let deleteButton = document.getElementById("delete");
    // newDeleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        let transaccionRow = event.target.parentNode.parentNode;
        let transaccionId2 = transaccionRow.getAttribute("data-transaccion-Id");
        transaccionRow.remove();
        DeleteTransaccionObj(transaccionId2);

    })
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

function saveTransaccionObj(transaccionObj){
    let myTransaccionArray = JSON.parse(localStorage.getItem("transaccionData")) || [];
    myTransaccionArray.push(transaccionObj);
    // CONVIERTO MY ARRAY A JS
    let TransaccionArrayJSON = JSON.stringify(myTransaccionArray);
    // GUARDO MI ARRAY EN LOCALSTORAGE
    localStorage.setItem("transaccionData", TransaccionArrayJSON); 
} 