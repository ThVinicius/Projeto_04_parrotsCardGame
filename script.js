function comparador() {
  return Math.random() - 0.5
}
let contador = 0
let verifica = []
function virarCarta(elemento) {
  elemento.removeAttribute('onclick')
  elemento.classList.toggle('rotacionar180')
  contador++
  if (contador === 1) {
    verifica[0] = elemento
  } else if (contador === 2) {
    verifica[1] = elemento
    contador = 0
    setTimeout(delay, 1000)
  }
}
function delay() {
  if (
    verifica[0]
      .querySelector('.back-face')
      .querySelector('img')
      .getAttribute('src') !=
    verifica[1]
      .querySelector('.back-face')
      .querySelector('img')
      .getAttribute('src')
  ) {
    console.log('oi')
    for (let i = 0; i < verifica.length; i++) {
      verifica[i].classList.toggle('rotacionar180')
      verifica[i].setAttribute('onclick', 'virarCarta(this)')
    }
    verifica = []
  }
}

/*
let index = 0
let contador = 0
let verifica = []
function virarCarta(elemento) {
  contador++
  verifica.push(elemento)
  verifica[index].removeAttribute('onclick')
  verifica[index].classList.toggle('rotacionar180')
  if (contador === 2) {
    contador = 0
  }
}
*/
quantidadeCartas = prompt('Com quantas cartas quer jogar?')
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
  <div class="card" onclick="virarCarta(this)">
    <div class="face">
      <img src="/images/front.png" />
    </div>
    <div class="back-face face">
      <img src=${array[i]} />
    </div>
  </div>
  `
}
