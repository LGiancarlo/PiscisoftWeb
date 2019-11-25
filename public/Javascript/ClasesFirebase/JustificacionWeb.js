var JustificacionWeb = function (numeroReserva) {

    this.NReserva = numeroReserva
    let codJustificacion;
    let codUsuario;
    let cantInasistencia;

    this.mostrarDetalleJustificacion = function (objetosWeb) {
        db.collection("reserva").doc(`${this.NReserva}`).get().then(
            reserva => {
                db.collection("usuario").doc(`${reserva.data().codUsuario}`).get().then(
                    usuario => {
                        objetosWeb.nombre.innerHTML += `${usuario.data().nombre}`
                        objetosWeb.codigo.innerHTML += `${usuario.data().codigo}`
                        codUsuario = usuario.id
                        cantInasistencia = usuario.data().inasistencias
                        db.collection("turno").doc(`${reserva.data().codTurno}`).get().then(
                            turno => {
                                objetosWeb.turno.innerHTML += `${turno.data().fecha} ${turno.data().horaInicio}- ${turno.data().horaFin}`
                            })
                        db.collection("justificacion").where("codReserva", "==", reserva.id).get().then(
                            function (querySnapshot) {
                                querySnapshot.forEach(function (justi) {
                                    objetosWeb.comJusti.innerHTML += `${justi.data().motivo}`
                                    objetosWeb.urlJusti.setAttribute("target", "_blank")
                                    objetosWeb.urlJusti.setAttribute("href", justi.data().fotoDocumento)
                                    codJustificacion = justi.id
                                })

                            })
                    })

            });
    }

    this.responderJustificacion = function (decision, objetosWeb) {
        let nuevoEstadoReserva;
        let nuevaInasistencia;
        if (decision == "Validada") {
            nuevoEstadoReserva = "Cancelada"
            nuevaInasistencia = cantInasistencia
        } else {
            nuevoEstadoReserva = "Inasistida"
            nuevaInasistencia = cantInasistencia + 1
        }

        db.collection("justificacion").doc(codJustificacion).update({
            observaciones: objetosWeb.observacion.value,
            estado: decision
        }).then(function () {
            db.collection("reserva").doc(numeroReserva).update({
                estado: nuevoEstadoReserva
            }).then(function () {
                db.collection("usuario").doc(codUsuario).update({
                    inasistencias: parseInt(nuevaInasistencia)
                }).then(function () {
                    $("#ventanaGuardadoExitoso").modal("show");
                    objetosWeb.boton.disabled=true
                }).catch(function (error) {
                    $(document).ready(function () {
                        $("#ventanaGuardadoFallido").modal("show");
                    });
                });
            }).catch(function (error) {
                $(document).ready(function () {
                    $("#ventanaGuardadoFallido").modal("show");
                });
            });
        })
            .catch(function (error) {
                $(document).ready(function () {
                    $("#ventanaGuardadoFallido").modal("show");
                });
            });
    }

}
