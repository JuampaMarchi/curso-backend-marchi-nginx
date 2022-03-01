import yargs from 'yargs'
import { cpus } from 'os'
import { config } from "dotenv";
config()

const args = yargs(process.argv.slice(2)).argv
console.log(args)
export const serverData = {
    port: args.port ? args.port : process.env.PORT,
    mode: args.mode ? args.mode : process.env.MODE,
    args: args,
    cpu: cpus().length
}