var db = firebase.firestore();
var tabla = document.getElementById("tablaUsuarios")
var mensajeA = document.getElementById("mensajeActualizar")

function generarPaginacion() {
    let cab_filtrado = document.getElementById('cab_filtrado');
    cab_filtrado.innerHTML = ''
    var p = new Paginador(
        document.getElementById('paginador'),
        document.getElementById('tablaUsuarios'),
        5
    );
    p.Mostrar()
}

//Tabla de usuarios actualizando en tiempo real 
function buscarTiempoReal() {
    var texto = document.getElementById("texto").value;
    if (texto == "") {
        TablaUsuario(false, "")
    } else {
        tabla.innerHTML = "";
        TablaUsuario(true, texto)
    }
    console.log(texto)
}

//Se realiza cada Enero y Junio
function actualizarAsistencia() {
    db.collection("usuario").get().then(
        function (querySnapshot) {
            querySnapshot.forEach(function (usuario) {
                db.collection("usuario").doc(usuario.id).update({
                    inasistencias: parseInt(0),
                    estado : "Habilitado"
                }).then(function() {
                    mensajeActualizar.innerHTML = "Datos actualizados correctamente"
                    
                })
                .catch(function(error) {
                    mensajeActualizar.innerHTML = "No se actualizaron todos los datos, intente nuevamente"
                });
                
            });
        })
        $(document).ready(function () {
            $("#ventanaActualizado").modal("show");
        });

}


TablaUsuario()