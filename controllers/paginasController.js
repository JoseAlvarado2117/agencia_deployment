
import { Viaje } from '../Models/Viaje.js'
import { Testimoniales } from '../Models/Testimoniales.js'


const paginaInicio = async (req, res) => {    // req-> lo que enviamos : res -> lo que express responde

    // Consultar 3 viajes del modelo Viaje

    // Realizando multiples consultas a la DB
    const promiseDB = []

    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimoniales.findAll({ limit: 3 }))

    try {
        
        const resultado = await Promise.all( promiseDB )

        res.render('inicio', {
            pagina : 'Inicio',
            clase : 'home',
            viajes : resultado[0],
            testimoniales : resultado[1]
        })

    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => {    // req-> lo que enviamos : res -> lo que express responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}

const paginaViajes = async (req, res) => {    // req-> lo que enviamos : res -> lo que express responde

    // Consultar DB
    const viajes = await Viaje.findAll();

    //console.log(viajes)

    for (let i = 1; i < viajes.length; i++) {
        console.log(viajes[i].disponibles)
    }

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes : viajes
    })
}

const paginaTestimoniales = async (req, res) => {    // req-> lo que enviamos : res -> lo que express responde
    try {

        const testimoniales = await Testimoniales.findAll()

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params

    try {
        const viaje = await Viaje.findOne({ where : { slug } })

        res.render('viaje', {
            pagina : 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}