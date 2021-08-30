const puppeteer = require('puppeteer')
const fs = require("fs");
const config = require("./123Milhas/config.json");



const milhas123 = async function (whatsapp) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const link = `https://123milhas.com/v2/busca?de=${config.origem}&para=${config.destino}&ida=${config.ida}&volta=${config.volta}&adultos=1&criancas=0&bebes=0`

    await page.goto(link);
    await page.waitForTimeout(40000) // 40 segundos, a pagina demora para processar
    await page.addScriptTag({ path: "./src/123Milhas/passagens123.js" })

    const passagens = await page.evaluate(() => {
        return passagens
    })

    await page.close();
    await browser.close();

    fs.writeFileSync("./src/123Milhas/responses/passagens.json", JSON.stringify(passagens, null, 2))

    for (let index = 0; index < passagens.length; index++) {
        const element = passagens[index];

        if (element.preco <= config.valor) {
            whatsapp.sendText(
                `${config.telefone}@c.us`,
                `Promoção encontrada!!\n123Milhas: ${link}\nPassagem: ${element.preco}\nEstimativa: ${element.estimativa}`)
        }

    }

}

module.exports = {
    milhas123: milhas123,

}



