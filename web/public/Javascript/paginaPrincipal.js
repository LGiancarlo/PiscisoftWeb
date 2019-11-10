let semanaEnMilisegundos = 1000 * 60 * 60 * 24

let hoy = new Date()


let suma = hoy.getTime() + semanaEnMilisegundos *2; 
let fecha = new Date(suma); //CAMBIARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

let semanaActual = document.getElementById("fechaSemana")
let fechaInicio = new Fecha(fecha, "Lunes")
let fechaFin = new Fecha(fecha, "Sabado")
semanaActual.innerHTML = `Semana: ${fechaInicio.generarFormatoFechaOriginal()} hasta el ${fechaFin.generarFormatoFechaOriginal()}`;

