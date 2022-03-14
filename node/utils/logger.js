const pino = require("pino")({
    transport: {
        targets: [
            {
                target: 'pino/file',
                options: {
                    destination: './utils/logs/logs.log',
                    mkdir: true,
                }
            },
            {
                target: 'pino-pretty',
                options: {
                    translateTime: "SYS:dd-mm-yyyy HH:MM:ss",  
                }
            }
        ]
    }
})

module.exports = pino


