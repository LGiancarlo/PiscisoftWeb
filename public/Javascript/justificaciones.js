let db = firebase.firestore();
let tablaJustificacion = document.getElementById("tablaJustificacion")

function mostrarJustificaciones(){
    db.collection("justificacion").where("estado", "==", `Enviada`).onSnapshot(
        (querySnapshot) => {
            tablaJustificacion.innerHTML ="" //Revisar no olvidar el OnQuery
            querySnapshot.forEach(function (justificaciones) {
                db.collection("usuario").doc(`${justificaciones.data().codUsuario}`).get().then(
                    usuario => {
                        
                        tablaJustificacion.innerHTML += `<tr> 
                                <td style='vertical-align:middle'>${ justificaciones.data().fechaEnvio}</td>
                                <td style='vertical-align:middle'>  ${ usuario.data().nombre}<br> 
                                                                    Codigo: ${ usuario.id}<br>                                         
                                </td> 
                                <td style='vertical-align:middle'>${ usuario.data().inasistencias}</td>
                                <td><button class="btn btn-info botonNaranja" onclick="location.href='./justificacionesDetalle.html?reserva=${ justificaciones.data().codReserva}'"> Justificacion</button> </td>
                                
                                
                                </tr>`})
                
            });
        })



}
mostrarJustificaciones()