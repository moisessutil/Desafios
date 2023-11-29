function somatoria(numero) {
    let listaSoma = []
  
    for (let i = 1; i < numero; i++) {
      if (i % 3 === 0 || i % 5 === 0) {
        listaSoma.push(i)
      }
    }
    
    let soma = 0
    for (let i = 0; i < listaSoma.length; i++) {
      soma += listaSoma[i]
    }
  
    return `O resultado é ${soma}`
}
  
console.log(somatoria(10))
console.log()
console.log(somatoria(11))
console.log()
console.log(somatoria(29))
console.log()