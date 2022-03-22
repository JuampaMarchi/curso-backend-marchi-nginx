const { fork } = require('child_process')
const cluster = require('cluster')

const fork_mode = (app) => {
    let child_process = fork(`./utils/fork_process.js`)
    child_process.on('message', data => {
        console.log(`Del hijo llego: '${data.res}'`)
    })
    
    app.all('/info', (req, res, next) => {
        try {
                child_process.send('Del padre al hijo')
                return res.send(`hola`)
        } catch (error) {
            console.log(error)   
        }
    })
}

const cluster_mode = (app, cpus, port) => {
    if(cluster.isMaster) {
        console.log(`Running Master Process - PID: ${process.pid}`)

        for (let i = 0; i < cpus; i++) {
            cluster.fork()
        }

        cluster.on('exit', (worker, node, signal) => {
            console.log(`Worker ${worker.process.pid} died`)
        })
    } else {
        app.listen(port, err => {
            console.log(`Process running on http://localhost:${port} - Worker: ${process.pid}`)
        })
    }
}

module.exports = { fork_mode, cluster_mode }

