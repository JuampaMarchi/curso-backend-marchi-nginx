const { fork } = require('child_process')
const cluster = require('cluster')

const fork_mode = (app) => {
    const child_process = fork(`./utils/fork_process.js`)
    app.all('/inicio', (req, res, next) => {
        child_process.send('Del padre al hijo')
        child_process.on('message', data => {
            res.send(`Este mensaje vino del hijo: ${data.res}`)
        })
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

