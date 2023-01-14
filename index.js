// fs = require('fs');
// var name = 'puestos.json';
// var m = JSON.parse(fs.readFileSync(name).toString());
// console.log(m);
// m.forEach(function(p){
//     p.name = m.name;
// });
// fs.writeFileSync(name, JSON.stringify(m));
// const compras = [];
localStorage.setItem('compras', JSON.stringify([]));
const tabla = document.getElementById("boletos");
const cedula = document.getElementById("tcedula");
const nombres = document.getElementById("tnombres");
const apellidos = document.getElementById("tapellidos");
// const boletos = [];
localStorage.setItem('boletos', JSON.stringify([]));
function darBoletos() {
    return JSON.parse(localStorage.getItem('boletos'));
}
function guardarBoletos(boletos) {
    localStorage.setItem('boletos', JSON.stringify(boletos));
}
function darCompras() {
    return JSON.parse(localStorage.getItem('compras'));
}
function guardarCompras(compras) {
    localStorage.setItem('compras', JSON.stringify(compras));
}
function añadir(numero) {
    const boletos = darBoletos();
    if (boletos.length > 0) {
        for (let i = 0; i < boletos.length; i++) {
            if (boletos[i].numero == numero) {
                alert("Este puesto ya está en tu lista");
                return;
            }
        } 
    }
    const boleto = {
        numero: numero, 
        precio: 20
    };
    boletos.push(boleto);
    guardarBoletos(boletos);
    llenar();
}
function sacar(numero) {
    const boletos = darBoletos();
    for (let i = 0; i < boletos.length; i++) {
        if (boletos[i].numero == numero) {
            boletos.splice(i, 1);
            guardarBoletos(boletos);
            break;
        }
    }
    llenar();
}
function llenar() {
    tabla.innerHTML = "";
    tabla.innerHTML = `
    <tr>
        <th>Número</th>
        <th>Monto</th>
    </tr>
    `;
    const boletos = darBoletos();
    let total = 0;
    for (let i = 0; i < boletos.length; i++) {
        total += boletos[i].precio;
        tabla.innerHTML += `
        <tr onclick="sacar(${boletos[i].numero});">
            <td class="blanco">${boletos[i].numero}</td>
            <td class="blanco">${boletos[i].precio}$</td>
        </tr>
        `;
    }
    tabla.innerHTML += `
    <tr>
        <td class="negro">Total:</td>
        <td class="negro">${total}$</td>
    </tr>
    `;
}
function sellar() {
    const boletos = darBoletos();
    for (let i = 0; i < boletos.length; i++) {
        let numero = boletos[i].numero;
        let cuadro = document.getElementById(numero);
        cuadro.classList.add('rosa');
        cuadro.removeAttribute("onclick");
    }
}
function comprar() {
    if (cedula.value.length > 0 && 
        nombres.value.length > 0 && 
        apellidos.value.length > 0) {
        const boletos = darBoletos();
        let total = 0;
        alert(boletos.length);
        for (let i = 0; i < boletos.length; i++) {
            total += boletos[i].precio;
        }
        const compra = {
            cedula: cedula.value, 
            nombres: nombres.value, 
            apellidos: apellidos.value, 
            boletos: boletos, 
            total: total
        }
        const compras = darCompras();
        compras.push(compra);
        sellar();
        guardarBoletos([]);
        llenar();
    } else {
        alert("Todos los campos deben estar llenos para comprar asientos");
    }
}