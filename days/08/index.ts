import * as fs from 'fs';
import * as path from 'path';

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split(/ \| |\n/)
  let input = []
  let output = []
  for (let i in file) {
    if (+i % 2 === 0){
      input.push(file[i].split(' '))
    }
    else {
      output.push(file[i].split(' '))
    }
  }
  return [input, output]
}

function setUnion(setA: Set<string> | undefined, setB: Set<string> | undefined): Set<string> {
  if (setA && setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
      _union.add(elem)
    }
    return _union
  }
  return new Set()
}

function setDifference(setA: Set<string> | undefined, setB: Set<string> | undefined): Set<string> {
  if (setA && setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
      if (setA.has(elem)) {
        _difference.delete(elem)
      }
      else {
        _difference.add(elem)
      }
    }
    return _difference
  }
  return new Set()
}

function setIntersection(setA: Set<string> | undefined, setB: Set<string> | undefined): Set<string> {
  if (setA && setB) {
    let _intersection = new Set<string>()
    for (let elem of setB) {
      if (setA.has(elem)) {
          _intersection.add(elem)
      }
    }
    return _intersection
  }
  return new Set()
}

function deleteSetFromSet(setA: Set<string> | undefined, setToDelete: Set<string> | undefined): Set<string> {
  if (setA && setToDelete) {
    let _remainder = new Set(setA)
    for (let elem of setToDelete) {
      _remainder.delete(elem)
    }
    return _remainder
  }
  return new Set()
}

function update(arrayN: number[], numberCode: Set<string>, dict: Map<number, Set<string>>) {
  arrayN.forEach(n => {
    let numberCodeArray = dict.get(n)
    if (numberCodeArray) {
      let set = setUnion(new Set(numberCodeArray), numberCode)
      dict.set(n, set)
    }
    else {
      dict.set(n, numberCode)
    }
  });
  return dict
}
const [inputArray, outputArray] = readData()
let arrayDecoded = []

for (let d in inputArray) {
  let data = inputArray[d]
  let dictInv = new Map<number, Set<string>>()
  for (let numberCode of data) {
    let length = numberCode.length
    let numberCodeSetInv = setDifference(new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']), new Set(numberCode.split('')))
    if (length === 2) {
      dictInv.set(1, numberCodeSetInv)
    } 
    else if (length === 3) {
      dictInv.set(7, numberCodeSetInv)
    } 
    else if (length === 4) {
      dictInv.set(4, numberCodeSetInv)
      
    } 
    else if (length === 5) {
      const arrayN = [2, 3, 5]
      dictInv = update(arrayN, numberCodeSetInv, dictInv)
    } 
    else if (length === 6) {
      const arrayN = [0, 6, 9]
      dictInv = update(arrayN, numberCodeSetInv, dictInv)
    } 
    else if (length === 7) {
      dictInv.set(8, numberCodeSetInv)
    } 
  }

  let dict = new Map<number, Set<string>>()
  for (let numberCode of data) {
    let length = numberCode.length
    let numberCodeSet = new Set(numberCode.split(''))
    if (length === 2) {
      dict.set(1, numberCodeSet)
    } 
    else if (length === 3) {
      dict.set(7, numberCodeSet)
    } 
    else if (length === 4) {
      dict.set(4, numberCodeSet)
      
    } 
    else if (length === 5) {
      const arrayN = [2, 3, 5]
      dict = update(arrayN, numberCodeSet, dict)
    } 
    else if (length === 6) {
      const arrayN = [0, 6, 9]
      dict = update(arrayN, numberCodeSet, dict)
    } 
    else if (length === 7) {
      dict.set(8, numberCodeSet)
    } 
  }

  let dictAlphabet = new Map<string, string>()
  dictAlphabet.set('a', Array.from(setDifference(dictInv.get(1), dictInv.get(7)))[0])
  dictAlphabet.set('e', Array.from(setIntersection(dictInv.get(0), dictInv.get(4)))[0])
  dictAlphabet.set('b', Array.from(setIntersection(setDifference(dictInv.get(5), new Set(dictAlphabet.get('e'))), dictInv.get(1)))[0])
  dictAlphabet.set(
    'g', 
    Array.from(
      setIntersection(
        setDifference(dictInv.get(4), new Set([dictAlphabet.get('e') as string, dictAlphabet.get('a') as string, dictAlphabet.get('b') as string])), 
        dictInv.get(4)
      )
    )[0]
  )
  dictAlphabet.set(
    'd', 
    Array.from(
      deleteSetFromSet(
        deleteSetFromSet(dict.get(4), new Set([dictAlphabet.get('e') as string, dictAlphabet.get('a') as string, dictAlphabet.get('b') as string])),
        dict.get(1)
      )
    )[0]
  )
  dictAlphabet.set(
    'c', 
    Array.from(
      deleteSetFromSet(dictInv.get(6), new Set([dictAlphabet.get('e') as string, dictAlphabet.get('d') as string]))
    )[0]
  )
  dictAlphabet.set(
    'f', 
    Array.from(
      deleteSetFromSet(dict.get(1), new Set([dictAlphabet.get('c') as string]))
    )[0]
  )

  for (let numberCode of outputArray[d]) {
    if (numberCode.includes(dictAlphabet.get('a') as string)) {
      if (numberCode.includes(dictAlphabet.get('c') as string)) {
        if (numberCode.includes(dictAlphabet.get('b') as string)) {
          if (numberCode.includes(dictAlphabet.get('d') as string)) {
            if (numberCode.includes(dictAlphabet.get('e') as string)) {
              arrayDecoded.push(8)
            }
            else {
              arrayDecoded.push(9)
            }
          }
          else {
            arrayDecoded.push(0)
          }
        }
        else {
          if (numberCode.includes(dictAlphabet.get('d') as string)) {
            if (numberCode.includes(dictAlphabet.get('e') as string)) {
              arrayDecoded.push(2)
            }
            else {
              arrayDecoded.push(3)
            }
          }
          else {
            arrayDecoded.push(7)
          }
        }
      }
      else if (numberCode.includes(dictAlphabet.get('e') as string)) {
        arrayDecoded.push(6)
      }
      else {
        arrayDecoded.push(5)
      }
    }
    else if (numberCode.includes(dictAlphabet.get('d') as string)) {
      arrayDecoded.push(4)
    }
    else {
      arrayDecoded.push(1)
    }
  }
}

const searchNumbers = [1, 4, 7, 8] 
console.log('Answer part 1:', arrayDecoded.filter(i => searchNumbers.includes(i)).length)

let xArray = Array<string>(Math.floor(arrayDecoded.length / 4)).fill('')
for (let i in arrayDecoded) {
  xArray[Math.floor(+i / 4)] = xArray[Math.floor(+i / 4)] + arrayDecoded[i]
}
let totalSum = 0
for (let x of xArray) {
  totalSum += +x
}

console.log('Answer part 2:', totalSum)
