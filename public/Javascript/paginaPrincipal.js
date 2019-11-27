var db = firebase.firestore();
let hoy = new Date()


let semanaActual = document.getElementById("fechaSemana")
let fechaInicio = new Fecha(hoy, "Lunes")
let fechaFin = new Fecha(hoy, "Domingo")

semanaActual.innerHTML = `Semana: ${fechaInicio.generarFormatoFechaOriginal()} hasta el ${fechaFin.generarFormatoFechaOriginal()}`;


db.collection("turno").where(firebase.firestore.FieldPath.documentId(), ">=", fechaInicio.generarFormatoFechaBD()).where(firebase.firestore.FieldPath.documentId(), "<=", fechaFin.generarFormatoFechaBD()).onSnapshot((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
        let casilla = document.getElementById(`${doc.data().dia}-${doc.data().horaInicio}`)
        if(doc.data().estado == "Caducado"){
            console.log("aaaaaaaaaaaaaaaaaa")
            casilla.setAttribute("bgcolor", "#919393")
        }
        else if(doc.data().capacidadCubierta == doc.data().capacidadTotal){
            casilla.setAttribute("bgcolor", "#D2A0F5")
        }
        else if(doc.data().estado == "Cerrado"){
            casilla.setAttribute("bgcolor", "#FF0000")
            casilla.setAttribute("onclick", "")
            casilla.style.cursor = "auto";
        }
        else if(doc.data().estado == "Abierto"){
            casilla.setAttribute("bgcolor", "#FFFFFF")
            casilla.setAttribute("onclick", "")
            casilla.style.cursor = "auto";
        }
    });
});


//Cambiooooooooooooooooooooooooooooo