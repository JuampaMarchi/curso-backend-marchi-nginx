const express = require('express')
const serverData = require('../config/index')
const mainRouter = require('../routes/main')
const modes = require('../config/modes')

class Server {
    constructor(){
        this.app = express()
        this.port = serverData.port
        this.cpus = serverData.cpu
        this.mainPath = '/'
        this.mode = serverData.mode
        this.middlewares()
        this.router()
        this.initialize()
    }
    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }
    router(){
        this.app.use(this.mainPath, mainRouter)
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on: http://localhost:${this.port} - PID: ${process.pid} with ${this.cpus} CPUs`)
        })
    }
    initialize(){
        if(this.mode == 'FORK'){
            modes.fork_mode(this.app)
            this.listen()
        }
        if(this.mode == 'CLUSTER'){
            modes.cluster_mode(this.app, this.cpus, this.port)
        }
    }
}

module.exports = Server