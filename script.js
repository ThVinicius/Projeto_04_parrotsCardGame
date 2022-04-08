function comparador() {
  return Math.random() - 0.5
}
quantidadeCartas = prompt(
  `Com quantas cartas quer jogar?\n*****REGRAS DO JOGO*****\n1. Cada click na carta é uma jogada.\n2. Caso o par de cartas viradas seja diferente, a próxima jogada só será possível depois de 1 segundo.`
)
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

let cartas = []
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

let clicks = 0
let index1
let index2
function virarCarta(elemento) {
  clicks++
  if (clicks % 2 === 1) {
    for (let i = 0; i < cartas.length; i++) {
      console.log('ola')
      if (elemento == cartas[i].classe) {
        console.log('primeiro for')
        index1 = cartas[i].index
      }
    }
    console.log('click impar')
    cartas[index1].classe.removeAttribute('onclick')
    cartas[index1].classe.classList.toggle('rotacionar180')
  } else if (clicks % 2 === 0) {
    for (let i = 0; i < cartas.length; i++) {
      if (elemento === cartas[i].classe) {
        console.log('primeiro for')
        index2 = cartas[i].index
      }
    }
    console.log('click par')
    cartas[index2].classe.removeAttribute('onclick')
    cartas[index2].classe.classList.toggle('rotacionar180')
  }

  if (clicks % 2 === 0 && cartas[index1].img !== cartas[index2].img) {
    for (let i = 0; i < cartas.length; i++) {
      if (cartas[i].valor === 0) {
        cartas[i].classe.removeAttribute('onclick')
      }
    }
    console.log('cartas diferentes')
    setTimeout(delay, 1000)
  } else if (clicks % 2 === 0 && cartas[index1].img === cartas[index2].img) {
    cartas[index1].valor = 1
    cartas[index2].valor = 1
    verificarFim()
  }
}

function delay() {
  console.log('oi')
  cartas[index1].classe.classList.toggle('rotacionar180')
  cartas[index2].classe.classList.toggle('rotacionar180')
  for (let i = 0; i < cartas.length; i++) {
    if (cartas[i].valor === 0) {
      console.log('adicionou o click')
      cartas[i].classe.setAttribute('onclick', 'virarCarta(this)')
    }
  }
}
function verificarFim() {
  for (let i = 0; i < cartas.length; i++) {
    if (cartas[i].valor === 0) {
      break
    } else {
      setTimeout(alert, 250, 'Fim de jogo')
      break
    }
  }
}
