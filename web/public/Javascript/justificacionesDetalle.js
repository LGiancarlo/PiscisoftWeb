let db = firebase.firestore();
let identificacionReserva = obtenerParametros()
let nombre = document.getElementById("nombreUsuarioJusti")
let codigo = document.getElementById("codigoUsuarioJusti")
let turno = document.getElementById("turnoReserva")
let comJusti = document.getElementById("comentarioJustificacion")
let urlJusti = document.getElementById("urlJusti")
let observacion = document.getElementById("comentarioObservacion")
let mensajeFaltaObservacion = document.getElementById("mensajeFaltaObs")
let botonEnviar = document.getElementById("envJust")

let objetosWeb = {
    "nombre": nombre,
    "codigo": codigo,
    "turno": turno,
    "comJusti": comJusti,
    "urlJusti": urlJusti,
    "observacion": observacion,
    "boton" :botonEnviar
}


let justificacion = new JustificacionWeb(identificacionReserva.reserva)

justificacion.mostrarDetalleJustificacion(objetosWeb)



document.getElementById("envJust").onclick = function () {
    let decisionAlternativas = document.getElementsByName('radioDecision');
    let decision = ""
    for (i = 0; i < decisionAlternativas.length; i++) {
        if (decisionAlternativas[i].checked) {
            decision = decisionAlternativas[i].value
        }
    }
    if (observacion.value == "")
        mensajeFaltaObservacion.innerHTML = "*Coloque una observación"
    else
        justificacion.responderJustificacion(decision, objetosWeb)
        
};





//Evitar que entre a uno ya validado
db.collection("justificacion").where("codReserva", "==", identificacionReserva.reserva).get().then(
    function (querySnapshot) {
        querySnapshot.forEach(function (jus) {
            if (jus.data().estado != "Enviada")
                window.location='./justificaciones.html';
        });

    })


