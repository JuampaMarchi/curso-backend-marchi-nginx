const { Router } = require('express')
const randomNum = require('../utils/functions')
const serverData = require('../config/index')
const pino = require('../utils/logger.js')

const mainRouter = new Router()

mainRouter.get('/', (req, res, next) => {
    pino.info('Acceso a la ruta principal exitoso')
    return res.send(`Hola, esta es la raiz en el puerto: <b>${serverData.port}</b> - PID <b>${process.pid}</b>`)
})

mainRouter.get('/server-info', (req, res, next) => {
    // pino.info('Acceso a la ruta INFO exitoso')
    // pino.warn('Cuidado, algo no anda bien en INFO')
    // pino.error('Hubo un error en INFO')
    return res.send(`Estas en INFO, estos son los datos del servidor:
        <ul>
            <li>Argumentos del proceso: ${process.argv}</li>
            <li>Carpeta actual: ${process.cwd()}</li>
            <li>Ruta ejecutada: ${process.execPath}</li>
            <li>Sistema operativo: ${process.platform}</li>
            <li>Version de Node: ${process.version}</li>
            <li>Memoria reservada: ${process.memoryUsage().rss}</li>
            <li>PID del proceso:${process.pid}</li>
        </ul>
    `)
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

