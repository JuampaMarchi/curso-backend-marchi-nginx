const autocannon = require('autocannon')
const { PassThrough } = require('stream')

function run(url){
    const buf = []
    const outputStream = new PassThrough()
    const inst = autocannon({
        url,
        connections: 200,
        duration: 20
    });

    autocannon.track(inst, {outputStream});

    outputStream.on('data', data => buf.push(data))
    inst.on('done', function (){
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log('corriendo pruebas')

run('http://localhost:3000/random?cant=9000')