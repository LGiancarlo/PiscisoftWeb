//Inicializar functions y admin(base de datos)
const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const firebaseApp = firebase.initializeApp()



//Prueba de HBS....aun en implementacion
const app = express();
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/FuncionPruebaHBS', (request, response) => {
    response.set('Cache-Control', 'public, max-age-300, s-maxage-600');
    response.render('prueba', { facts });
});
exports.FuncionPruebaHBS = functions.https.onRequest(app);

//Fin

//Función de autenticación //Función reemplazada por la autenticación en la creación de Cookies
/*
exports.Autenticacion = functions.https.onRequest((req,res) => {
    let store = firebase.firestore()
    store.collection('AdministradorUsuario').doc("AtyyZuBXX3ButSAB9OLH").get().then(doc  => {
        if (doc.data().usuario==req.query.usuario && doc.data().password==req.query.password) {
            res.redirect("https://piscisoft.firebaseapp.com/paginaPrincipal.html")

        }
        else {
            res.send("No se ingreso correctamente")
        }
    }).catch (err => {
        res.send('Hubo un error');
    })
});
*/

//Función actualizar
exports.FuncionGuardarEnBase = functions.https.onRequest((req, res) => {
    firebase.firestore().collection('colx').doc('docx').update(
        {
            textox: req.query.inf
        }).then(r => {
            res.redirect("https://piscisoft.firebaseapp.com/");
        }).catch(err => {
            res.send('Hubo un error');
        })
});
//FIN


//Para probar logica de firestore

exports.PruebarGuardarEnBase = functions.https.onRequest((req, res) => {
    firebase.firestore().collection('colx').doc(req.query.inf).set(
        {
            textox: req.query.inf
        }).then(r => {
            res.redirect("https://piscisoft.firebaseapp.com/");
        }).catch(err => {
            res.send('Hubo un error');
        })
});


exports.PruebarReferencia = functions.https.onRequest((req, res) => {
    firebase.firestore().collection('usuario').doc('20162554').get()
        .then(r => {
            res.send(r.ref.get());
        }).catch(err => {
            res.send('Hubo un error');
        })
});

exports.actualizarEstado = functions.firestore
    .document('usuario/{userId}')
    .onWrite((change, context) => {
        const data = change.after.data();
        if (data.inasistencias != 3) return null;
        return change.after.ref.update({
            estado: "Suspendido"
        });
    });


exports.ExportarData = functions.https.onRequest((req, res) => {
    let valAlumno = req.body.checkBoxAlumno
    let valTrabajador = req.body.checkBoxTrabajador
    let valEgresado = req.body.checkBoxEgresado
    let arreglo = []

    if (typeof valEgresado != "undefined") {
        arreglo.push(valEgresado)
    }
    if (typeof valAlumno != "undefined") {
        arreglo.push(valAlumno)
    }
    if (typeof valTrabajador != "undefined") {
        arreglo.push(valTrabajador)
    }
    if (arreglo.length==0){
        res.send("No ingreso nada")
    }
    let datos = "[";
    for (let i = 0; i < arreglo.length; i++) {
        firebase.firestore().collection('usuario').where("tipo", "==", arreglo[i]).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    datos += `{codigo:'${doc.data().codigo}',nombre:'${doc.data().nombre}',celular:'${doc.data().celular}',`
                    datos += `observaciones:'${doc.data().observaciones}',nivel:'${doc.data().nivel}',tipo:'${doc.data().tipo}'},`
                });
            })
            .catch(err => {
                res.send('Hubo un error');
            })
    }
    setTimeout(function () {
        datos = datos.slice(0, -1);
        datos = datos + "]"
        // for (let i = 0; i < arreglo.length; i++) {
        //     datos += arreglo[i]
        //     datos += arreglo.length
        // }
        res.json(datos)
    }, 8000)
    //res.send('<h1>'+ req.query.nombre +'</h1>' );


});
