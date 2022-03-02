const { Router } = require('express')
const randomNum = require('../utils/functions')
const serverData = require('../config/index')

const mainRouter = new Router()

mainRouter.get('/', (req, res, next) => {
    res.send(`Hola, esta es la raiz en el puerto: <b>${serverData.port}</b> - PID <b>${process.pid}</b>`)
})

mainRouter.get('/data', (req, res, next) => {
    console.log(`PID: ${process.pid}`)
    console.log(`ENV: ${process.env.watch}`)
    res.send(`Estas en DATA, usando el puerto: <b>${serverData.port}</b> - PID <b>${process.pid}</b>`)
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

