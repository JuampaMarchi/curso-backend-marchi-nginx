import express from 'express'
import { Server as HttpServer} from 'http'
import { serverData } from '../config/index.js'
import { mainRouter } from '../routes/main.js'

export class Server {
    constructor(){
        this.app = express()
        this.port = serverData.port
        this.cpus = serverData.cpu
        this.mainPath = '/'
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
        const http = new HttpServer(this.app)
        http.listen(this.port, () => {
            console.log(`Server running on: http://localhost:${this.port} with ${this.cpus} CPUs`)
        })
    }
}