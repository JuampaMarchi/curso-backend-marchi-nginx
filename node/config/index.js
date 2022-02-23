import yargs from 'yargs'
import { config } from "dotenv";
import { cpus } from 'os'
config()
const args = yargs(process.argv.slice(2)).argv

export const serverData = {
    port: process.env.PORT,
    args: args,
    cpu: cpus().length
}