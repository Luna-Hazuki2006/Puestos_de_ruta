// fs = require('fs');
// var name = 'puestos.json';
// var m = JSON.parse(fs.readFileSync(name).toString());
// console.log(m);
// m.forEach(function(p){
//     p.name = m.name;
// });
// fs.writeFileSync(name, JSON.stringify(m));
const compras = [];
const tabla = document.getElementById("boletos");
const cedula = document.getElementById("tcedula");
const nombres = document.getElementById("tnombres");
const apellidos = document.getElementById("tapellidos");
const boletos = [];
function añadir(numero) {
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
    localStorage.setItem("boletos", JSON.stringify(boletos));
    llenar();
}
function sacar(numero) {
    for (let i = 0; i < boletos.length; i++) {
        if (boletos[i].numero == numero) {
            boletos = boletos.splice(i, 1);
            localStorage.setItem("boletos", JSON.stringify(boletos));
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
    for (let i = 0; i < boletos.length; i++) {
        const numero = boletos[i].numero;
        const cuadro = document.getElementById(numero);
        cuadro.classList.add('rosa');
        cuadro.onclick = alert("Este puesto ya está ocupado");
    }
}
function comprar() {
    if (cedula.value.length > 0 && 
        nombres.value.length > 0 && 
        apellidos.value.length > 0) {
        const total = 0;
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
        compras.push(compra);
        sellar();
        boletos = [];
        llenar();
    } else {
        alert("Todos los campos deben estar llenos para comprar asientos");
    }
}