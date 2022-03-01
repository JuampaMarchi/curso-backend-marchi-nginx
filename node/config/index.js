const yargs = require('yargs')
const cpus = require('os').cpus()
require('dotenv').config()

const args = yargs(process.argv.slice(2)).argv

const serverData = {
    port: args.port ? args.port : process.env.PORT,
    mode: args.mode ? args.mode : process.env.MODE,
    args: args,
    cpu: cpus.length
}

module.exports = serverData