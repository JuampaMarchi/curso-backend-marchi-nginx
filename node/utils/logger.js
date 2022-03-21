const pino = require("pino")({
    transport: {
        targets: [
            {   
                level: 'warn',
                target: 'pino/file',
                options: { destination: './utils/logs/warn.log', mkdir: true }
            },
            {
                level: 'error',
                target: 'pino/file',
                options: { destination: './utils/logs/error.log', mkdir: true }
            },
            {
                target: 'pino-pretty',
                options: { translateTime: "SYS:dd-mm-yyyy HH:MM:ss" }
            }
        ]
    }
})

module.exports = pino


