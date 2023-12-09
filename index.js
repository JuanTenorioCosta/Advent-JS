//Advent day 4 - Lo hicé distinto, copia de Goncy, mucho más elegante.
function decode(message) {
  const match = message.match(/\(([^()]+)\)/)

  console.log("Match: ", match)

  if (!match) return message

  const sanitized = match[0].slice(1, -1).split("").reverse().join('')
  console.log("Sanitized: ", sanitized)

  const result = message.replaceAll(match[0], sanitized)
  console.log("Result: ", result)

  const toret = decode(result)

  return toret
}

//Advent day 5 - Fácil, el de code wars mucho más interesante.
function cyberReindeer(road, time) {
  const result = []
  result.push(road)

  let originalRoad = road.replace('S', '.')
  let currentRoad = road

  for (let i = 1; i < time; i++) {
    if (i == 5) {
      originalRoad = originalRoad.replaceAll('|', '*')
    }
    const santaPosition = currentRoad.indexOf('S')

    if (santaPosition + 1 == originalRoad.length || santaPosition == -1) {
      currentRoad = originalRoad
    }
    else if (originalRoad[santaPosition + 1] != '|') {
      currentRoad = originalRoad.slice(0, santaPosition + 1) + 'S' + originalRoad.slice(santaPosition + 2)
    }

    result.push(currentRoad)
  }

  return result
}

//Advent day 6 - Muuuuuy fácil, igual hay alguna forma más elegante
function maxDistance(movements) {
  let direction = 0
  let undeterminedChars = 0
  const movementsArr = Array.from(movements)

  movementsArr.forEach(movement => {
    switch (movement) {
      case '>':
        direction++
        break;
      case '<':
        direction--
        break;
      default:
        undeterminedChars++
    }
  })

  return Math.abs(direction) + undeterminedChars
}

//Advent day 7 - La solución es bastante espantosa pero juró que no me entró en la cabeza el dibujo, que bobo soy
function drawGift(size, symbol) {
  if (size < 2)
    return '#\n'

  const length = size * 2 - 1

  let result = []

  //Inicializar array
  for (let row = 0; row < length; row++) {
    result[row] = []
    for (let col = 0; col < length; col++) {
      result[row][col] = 'a'
    }
  }

  //Pintar líneas horizontales
  for (let col = 0; col < length; col++) {
    if (col < size - 1) {
      result[size - 1][col] = '#'
      result[length - 1][col] = '#'
    } else if (col == size - 1) {
      result[size - 1][col] = '#'
      result[length - 1][col] = '#'
      result[0][col] = '#'
    } else {
      result[0][col] = '#'
    }
  }

  //Pintar líneas verticales
  for (let row = 0; row < length; row++) {
    if (row < size) {
      result[row][length - 1] = '#'
    } else if (row == size - 1) {
      result[row][0] = '#'
      result[row][size - 1] = '#'
      result[row][length - 1] = '#'
    } else {
      result[row][0] = '#'
      result[row][size - 1] = '#'
    }
  }

  //Dibujar primeras dos diagonales
  for (let row = 1; row < size; row++) {
    const lastIndex = length - 1 - row
    const firstIndex = size - 1 - row

    result[row][lastIndex] = '#'
    result[row][firstIndex] = '#'
  }

  //Dibujar última diagonal
  for (let row = size; row < length; row++) {
    const index = length - 1 - (row - size + 1)

    result[row][index] = '#'
  }

  //Dibujar espacios entre los huecos al principio
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size - row - 1; col++) {
      result[row][col] = ' '
    }
  }

  //Borrar espacios entre los huecos al final
  for (let row = size; row < length; row++) {
    for (let col = length; col > length - (row - size + 2); col--) {
      result[row][col] = ''
    }
  }

  return result.map(result => result.join('')).join('\n').replaceAll('a', symbol) + '\n'
}


//AdventJS day 8 - Bastante fácil, lo saqué rápido. Quizá hay mejores formas, pero creo que está bien.
/**
 * 
 * @param {String} gifts: String formatted as 'Amount''Symbol''Amount''Symbol'. Example: 63a22b => 63 a items, 22 b items
 * @returns {String}: Formatted as: For each 50 elements: [Symbol]. For each 10 elements not into []: {Symbol}. Every remaining element is
 * put with the others remaining elements inside (). Example: 63a22b => [a]{a}(aaa){b}{b}(bb)
 * 
 * Parse the string into an object key:Symbol => value: Amount.
 * For each key, value pair determine the amount of [], then {} and then put the rest inside ().
 */
function organizeGifts(gifts) {
  const giftsObject = {}
  let tempBuilder = ''
  let result = ''

  Array.from(gifts).forEach(gift => {
    if (gift >= '0' && gift <= '9') {
      tempBuilder += gift
    } else {
      giftsObject[gift] = parseInt(tempBuilder)
      tempBuilder = ''
    }
  })

  for (const [giftSymbol, giftValue] of Object.entries(giftsObject)) {
    let giftResult = ''
    let repeats = 0
    let tempValue = giftValue

    repeats = parseInt(tempValue / 50)
    for (let i = 0; i < repeats; i++) {
      giftResult += `[${giftSymbol}]`
    }

    tempValue = tempValue % 50
    repeats = parseInt(tempValue / 10)
    for (let i = 0; i < repeats; i++) {
      giftResult += `{${giftSymbol}}`
    }

    tempValue = tempValue % 10

    if (tempValue > 0) {

      giftResult += '('
      for (let i = 0; i < tempValue; i++) {
        giftResult += giftSymbol
      }
      giftResult += ')'
    }


    result += giftResult
  }

  return result
}

const result1 = organizeGifts(`76a11b`)
console.log(result1)