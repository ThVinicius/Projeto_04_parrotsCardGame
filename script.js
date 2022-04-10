let quantidadeCartas
let meuIntervalo
let cartas = []
let clicks = 0
let index1
let index2
inicioJogo()
criarArray()

function inicioJogo() {
  do {
    quantidadeCartas = prompt(
      `Com quantas cartas quer jogar?\n\n*********************REGRAS DO JOGO*********************\n\n1. Cada click na carta é uma jogada.\n\n2. Caso o par de cartas viradas seja diferente, a próxima jogada só será possível depois de 1 segundo.\n\n3. O jogo termina quando todas as cartas estiverem viradas.`
    )
  } while (
    !(
      quantidadeCartas % 2 === 0 &&
      quantidadeCartas >= 4 &&
      quantidadeCartas <= 14
    )
  )
  document.querySelector('img').classList.add('escondido')
  let contador = 0
  function cronometro() {
    contador++
    document.querySelector('h2').innerHTML = `${contador}`
  }
  meuIntervalo = setInterval(cronometro, 1000)
}
function criarArray() {
  let imagens = [
    '/images/bobrossparrot.gif',
    '/images/explodyparrot.gif',
    '/images/fiestaparrot.gif',
    '/images/metalparrot.gif',
    '/images/revertitparrot.gif',
    '/images/tripletsparrot.gif',
    '/images/unicornparrot.gif'
  ]
  imagens.sort(comparador)
  let array = []
  for (let i = 0; i < quantidadeCartas / 2; i++) {
    array.push(imagens[i])
    array.push(imagens[i])
  }
  array.sort(comparador)
  for (let i = 0; i < array.length; i++) {
    document.querySelector('.container').innerHTML += `
  <div class="card${i}" onclick="virarCarta(this)">
    <div class="face">
      <img src="/images/front.png" />
    </div>
    <div class="back-face face">
      <img src=${array[i]} />
    </div>
  </div>
  `
  }
  for (let i = 0; i < array.length; i++) {
    let carta = [
      { classe: undefined, img: undefined, index: undefined, valor: undefined }
    ]
    let card = document.querySelector(`.card${i}`)
    carta.classe = card
    carta.img = card
      .querySelector('.back-face')
      .querySelector('img')
      .getAttribute('src')
    carta.index = i
    carta.valor = 0
    cartas.push(carta)
  }
}
function virarCarta(elemento) {
  clicks++
  if (clicks % 2 === 1) {
    for (let i = 0; i < cartas.length; i++) {
      if (elemento == cartas[i].classe) {
        index1 = cartas[i].index
      }
    }
    cartas[index1].classe.removeAttribute('onclick')
    cartas[index1].classe.classList.toggle('rotacionar180')
  } else if (clicks % 2 === 0) {
    for (let i = 0; i < cartas.length; i++) {
      if (elemento === cartas[i].classe) {
        index2 = cartas[i].index
      }
    }
    cartas[index2].classe.removeAttribute('onclick')
    cartas[index2].classe.classList.toggle('rotacionar180')
  }

  if (clicks % 2 === 0 && cartas[index1].img !== cartas[index2].img) {
    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].valor === 0) {
        cartas[i].classe.removeAttribute('onclick')
      }
    }
    setTimeout(delay, 1000)
  } else if (clicks % 2 === 0 && cartas[index1].img === cartas[index2].img) {
    cartas[index1].valor = 1
    cartas[index2].valor = 1
    verificarFim()
  }
}
function verificarFim() {
  let verificar = 0
  for (let i = 0; i < cartas.length; i++) {
    if (cartas[i].valor === 1) {
      verificar++
    }
  }
  if (verificar === cartas.length) {
    clearInterval(meuIntervalo)
    const tempo = document.querySelector('h2').innerHTML
    setTimeout(
      alert,
      250,
      `Você ganhou em ${clicks} jogadas\nVocê ganhou em ${tempo} segundos`
    )
    setTimeout(function () {
      let resposta = prompt('Quer jogar novamente?')
      if (resposta === 'sim') {
        console.log('oi')
        document.location.href = ''
      }
    }, 251)
  }
}
function delay() {
  cartas[index1].classe.classList.toggle('rotacionar180')
  cartas[index2].classe.classList.toggle('rotacionar180')
  for (let i = 0; i < cartas.length; i++) {
    if (cartas[i].valor === 0) {
      cartas[i].classe.setAttribute('onclick', 'virarCarta(this)')
    }
  }
}
function comparador() {
  return Math.random() - 0.5
}
