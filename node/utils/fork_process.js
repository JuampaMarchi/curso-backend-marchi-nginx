process.on('message', data => {
    console.log(`Mensaje '${data}' recibido`)
    process.send({res: 'Hola Viteh'})
})