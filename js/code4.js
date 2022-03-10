const formWallet = document.getElementById("formWallet");
const formConcept = document.getElementById("formConcept");
const formCash = document.getElementById("formCash");
const addUp = document.getElementById("addUp");
const addDown = document.getElementById("addDown");
const walletTable = document.getElementById("walletTable");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
const conteinerForm = document.getElementById("conteinerForm");
let income = {};
let output = {};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('income')) {
        income = JSON.parse(localStorage.getItem('income'));
    }
    if (localStorage.getItem('output')) {
        output = JSON.parse(localStorage.getItem('output'));
    }
    addIncome();
    addOutput();
})
// document.addEventListener("DOMContentLoaded", () => {
//     if (localStorage.getItem('output')) {
//         output = JSON.parse(localStorage.getItem('output'));
//     }
//     addOutput();
// })
// document.addEventListener("DOMContentLoaded", () => {
//     if (localStorage.getItem('income')) {
//         income = JSON.parse(localStorage.getItem('income'));
//     }
//     addIncome();
//     if (localStorage.getItem('output')) {
//         output = JSON.parse(localStorage.getItem('output'));
//     }
//     setOutput();
// })
conteinerForm.addEventListener('click', (e) => {
  // console.log('click')
  // console.log(e.target)
  // console.log(e.target.classList.contains('btn-info'))
    e.preventDefault();
    if (e.target.classList.contains("addUp")) {
        setIncome(e);
        return
    }
    e.stopPropagation()
});
conteinerForm.addEventListener('click', (e) => {
  // console.log('click')
  // console.log(e.target)
  // console.log(e.target.classList.contains('btn-info'))
    e.preventDefault();
    if (e.target.classList.contains("addDown")) {
        setOutput(e);
        return
    }
    e.stopPropagation()
});


const setIncome = (e) => {
    if (formConcept.value.trim() === "" && formCash.value.trim() === "") {
        alert("Completa los campos");
        return
    }
    const entry = {
        id: Date.now(),
        texto: formConcept.value,
        money: formCash.value,
        estado: false
    }
    income[entry.id] = entry;
    formWallet.reset();
    formConcept.focus();
    addIncome();
    // e.stopPropagation()
};

const addIncome = () => {
    localStorage.setItem('income', JSON.stringify(income));
    if (Object.values(income).length === 0) {
        walletTable.innerHTML = ``;
        return
    }
    walletTable.innerHTML = "";
    Object.values(income).forEach(entry => {
        const clone = template.cloneNode(true)
        clone.querySelector('.walletConcept').textContent = entry.texto
        clone.querySelector('.walletCash').textContent = entry.money
        // if (task.estado) {
        //     clone.querySelector('.taskItems').classList.add('taskItemsConteiner');
        //     clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-undo-alt');
        //     clone.querySelector('p').style.textDecoration = 'line-through';
        // }
        // clone.querySelectorAll('.fa')[0].dataset.id = entry.id
        // clone.querySelectorAll('.fa')[1].dataset.id = entry.id
        fragment.appendChild(clone)
    });
    walletTable.appendChild(fragment);
};

const setOutput = (e) => {
    if (formConcept.value.trim() === "" && formCash.value.trim() === "") {
        alert("Completa los campos");
        return
    }
    const egress = {
        id: Date.now(),
        texto: formConcept.value,
        money: formCash.value,
        estado: false
    }
    output[egress.id] = egress;
    formConcept.focus();
    formWallet.reset();
    addOutput();
    // e.stopPropagation()
}

const addOutput = () => {
    localStorage.setItem('output', JSON.stringify(output));
    if (Object.values(output).length === 0) {
        walletTable.innerHTML = ``;
        return
    }
    walletTable.innerHTML = "";
    Object.values(output).forEach(egress => {
        const clone = template.cloneNode(true)
        clone.querySelector('.walletConcept').textContent = egress.texto
        clone.querySelector('.walletCash').textContent = egress.money
        fragment.appendChild(clone)
    });
    walletTable.appendChild(fragment);
}