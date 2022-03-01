import express from 'express'
import { serverData } from 'file:///C:/Users/juampa/Desktop/Curso%20Backend%20con%20Nginx/node/config/index.js'
import { mainRouter } from 'file:///C:/Users/juampa/Desktop/Curso%20Backend%20con%20Nginx/node/routes/main.js'
import { fork_mode, cluster_mode } from 'file:///C:/Users/juampa/Desktop/Curso%20Backend%20con%20Nginx/node/config/modes.js'

export class Server {
    constructor(){
        this.app = express()
        this.port = serverData.port
        this.cpus = serverData.cpu
        this.mainPath = '/'
        this.mode = serverData.mode
        this.middlewares()
        this.router()
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
    // initialize(){
    //     if(this.mode == 'FORK'){
    //         fork_mode(this.app)
    //         this.listen()
    //     }
    //     if(this.mode == 'CLUSTER'){
    //         cluster_mode(this.app, this.cpus, this.port)
    //     }
    // }
}