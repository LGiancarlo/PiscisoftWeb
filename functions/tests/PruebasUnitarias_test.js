const Fecha = require('../../public/Javascript/Formatos/fecha.js');
const URLGetter = require('../../public/Javascript/ClasesFirebase/PruebaURL.js');

describe("Fecha a BD correcta", () => {
    beforeEach (() => {
        console.log("Iniciando Test de Fecha...")
    });

    it('Caso de prueba : Conversion correcta', () => {
        let valorEsperado = "2019-12-22"
        let fecha_prueba = new Date("2019/12/20")
        let ClaseFecha = new Fecha(fecha_prueba, "Domingo")
        let valorObtenido = ClaseFecha.generarFormatoFechaBD()

        //Assert
        expect(valorObtenido).toBe(valorEsperado)
    })

    afterEach (() => {
        console.log("Finalizando Test de fecha...")
    });
})

describe("Extractor URL correcto", () => {
    beforeEach (() => {
        console.log("Iniciando Test de extraccion URL ...")
    });

    it('Caso prueba : URL id correcto', () => {
        let valorEsperado = '20162130';
        let url = "https://piscisoft.firebaseapp.com/usuariosDetalle.html?id=20162130";
        let invocacionGet = new URLGetter(url)
        let extraccion = invocacionGet.obtenerParametros(url)
        let valorObtenido = extraccion.id

        //Assert
        expect(valorObtenido).toBe(valorEsperado)

    })

    afterEach (() => {
        console.log("Finalizando Test de extraccion URL...")
    });
})

describe("Fecha original correcta", () => {
    beforeEach (() => {
        console.log("Iniciando Test de Fecha original ...")
    });

    it('Caso de prueba : Conversion correcta', () => {
        let valorEsperado = "22/12"
        let fecha_prueba = new Date("2019-12-22")
        let ClaseFecha = new Fecha(fecha_prueba, "Domingo")
        let valorObtenido = ClaseFecha.generarFormatoFechaOriginal()

        //Assert
        expect(valorObtenido).toBe(valorEsperado)
    })

    afterEach (() => {
        console.log("Finalizando Test de fecha original ...")
    });
})

console.log("Hola Mundo")