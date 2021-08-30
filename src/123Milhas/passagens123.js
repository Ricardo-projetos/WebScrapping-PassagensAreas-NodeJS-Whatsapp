const passagens =  Array.from(document.querySelectorAll('.ordenation-card')).map((el) => {
    return {
      
      Classificado: el.querySelector('.theme-text--body-4').innerText,
      preco: el.querySelector('.theme-text--value-2').innerText,
      estimativa: el.querySelector('.theme-text--body-3').innerText
    }
  })