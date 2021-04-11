import express from 'express'   // use esm para poder tener esta sintaxis
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales, 
    paginaDetalleViaje 
} from '../controllers/paginasController.js'

import { guardarTestimonial } from '../controllers/testimonialController.js'
 
const router = express.Router()

router.get('/', paginaInicio)

router.get('/nosotros', paginaNosotros)

router.get('/viajes', paginaViajes)

router.get('/viajes/:slug', paginaDetalleViaje)

router.get('/testimoniales', paginaTestimoniales)
router.post('/testimoniales', guardarTestimonial)


router.get('/contacto', (req, res) => {    // req-> lo que enviamos : res -> lo que express responde
    res.send('Contacto')
})


export default router