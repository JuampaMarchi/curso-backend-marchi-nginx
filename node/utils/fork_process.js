process.on('message', data => {
    console.log(`Mensaje '${data}' recibido`)
    setTimeout(()=>{
        process.send({res: 'Hola Viteh'})
    },10000)
})