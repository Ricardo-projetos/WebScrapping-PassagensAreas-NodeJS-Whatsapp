const app = require('./src/fluxo.js')
const venom = require('venom-bot');
const schedule = require('node-schedule');



(async () => {
    const whatsapp = await venom.create()

    const jbob = schedule.scheduleJob('*/3 * * * *', () => { 
        app.milhas123(whatsapp)
    })

})()
