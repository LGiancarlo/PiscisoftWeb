let db = firebase.firestore();
let identificacionFecha = obtenerParametros()
let hoy = new Date()



let fecha = new Fecha(hoy, identificacionFecha.dia)
let cap = document.getElementById("capacidad")
let datosTurno = document.getElementById("datosTurno")
let tablaUsuarios = document.getElementById("tablaUsuarios")

function mostrarTurno() {
    db.collection("turno").where(firebase.firestore.FieldPath.documentId(), "==", `${fecha.generarFormatoFechaBD()}.${identificacionFecha.hora}`).onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("a")
            cap.innerHTML = `${doc.data().capacidadCubierta}/${doc.data().capacidadTotal}`
            datosTurno.innerHTML = `Dia: ${doc.data().dia}-${fecha.generarFormatoFechaOriginal()} — Turno: ${doc.data().horaInicio}-${doc.data().horaFin}`
        })
    })
}

function mostrarUsuarios() {
    db.collection("reserva").where("codTurno", "==", `${fecha.generarFormatoFechaBD()}.${identificacionFecha.hora}`).onSnapshot((querySnapshot) => {
        tablaUsuarios.innerHTML = ""
        querySnapshot.forEach((reserva) => {
            db.collection("usuario").doc(`${reserva.data().codUsuario}`).get().then(
                usuario => {
                    if (reserva.data().estado != "Cancelada") {
                        tablaUsuarios.innerHTML += `<tr> 
                            <td valign="middle" style='vertical-align:middle' ><img src='${ usuario.data().foto}' width=109 height=123></td> 
                            <td style='vertical-align:middle'>Codigo: ${ usuario.id}<br> 
                                                                      ${ usuario.data().nombre}<br> 
                                                              Modalidad: ${ reserva.data().modalidad}<br> 
                            </td> 
                            <td style='vertical-align:middle'>${ reserva.data().estado}</td>
                            
                            </tr>`}
                })

        });
    });
}


mostrarTurno()
mostrarUsuarios()
