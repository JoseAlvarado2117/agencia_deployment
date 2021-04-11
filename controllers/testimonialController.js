
import { Testimoniales } from '../Models/Testimoniales.js'

const guardarTestimonial = async (req, res) => {

    // Validar el formulario
    const { nombre, correo, mensaje } = req.body

    const errores = []

    if (nombre.length <= 3) {

        if(nombre.trim() === '') {
            errores.push({mensaje : 'El nombre esta vacío'})
        }  else {
            errores.push({mensaje : 'El nombre debe contener minimo 4 caracteres'})
        }
    }

    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!regex.test(correo.trim())) {
        errores.push({mensaje : 'El correo es inválido'})
    }
    if (mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'})
    }

    if(errores.length > 0) {

        // consultar testimoniales existentes
        const testimoniales = await Testimoniales.findAll()

        // Mostrar la vista con los errores
        res.render('testimoniales', {
            pagina : 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // almacenarlo en la base de datos

        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }

    }

    // console.log(req.body)
}


export {
    guardarTestimonial
}