const { Router } = require('express')
const randomNum = require('../utils/functions')

const mainRouter = new Router()

mainRouter.get('/', (req, res, next) => {
    res.send(`Hola, los argumentos son otros`)
})

mainRouter.get('/random', (req, res, next) => {
    const cant = Number(req.query.cant)
    const numArray = []
    if(!cant) {
        console.log('No se ingreso parametro, calculando cantidad por defecto')
        randomNum(100000, numArray)
        return res.json({numArray})
    }
    console.log(`Parametro ingresado. Calculando ${cant} numeros`)
    randomNum(cant, numArray)
    return res.json({numArray})
})

module.exports = mainRouter

