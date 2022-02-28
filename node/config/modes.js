import child_process from 'child_process'

export const fork_mode = (app, url) => {
    const fork_process = child_process.fork(`./utils/fork_process.js`)
    app.all('/inicio', (req, res, next) => {
        fork_process.send('Del padre al hijo')
        fork_process.on('message', data => {
            res.send(`Este mensaje vino del hijo: ${data.res}`)
        })
    })
}

