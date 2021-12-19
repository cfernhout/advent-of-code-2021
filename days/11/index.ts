import * as fs from 'fs'
import * as path from 'path'
import * as tf from '@tensorflow/tfjs'

function readData () {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  const file = fs.readFileSync(filePath,'utf8').split('\n')
  let data = []
  for (let f of file) {
    data.push(f.split('').map(Number))
  }
  return data
}

const data = readData()
const height = data.length
const width = data[0].length
let tn = tf.tensor2d(data)
const zeros = tf.zerosLike(tn)
const ones = tf.onesLike(tn)
const nines = tf.onesLike(tn).mul(9)
const kernel = tf.reshape([[1,1,1], [1,0,1], [1,1,1]], [3,3,1,1]) as tf.Tensor4D

console.log('Start situation')
tn.print()
let sum = 0
let iterationSyncFlash = -1

for (let i=0; i<1000; i++) {
  tn = tn.add(ones)
  let tnFlashes = ones.cast('bool')
  let tnAllFlashes = zeros.cast('bool')
  while (tnFlashes.max().arraySync() != 0) {
    tnFlashes = tn.greater(nines)
    tnAllFlashes = tnAllFlashes.logicalOr(tnFlashes)
    tn = tn.where(tnAllFlashes.logicalNot(), zeros)
    let tnFlashesEffect = tf.reshape(tnFlashes.mul(1), [1, height, width, 1]) as tf.Tensor4D
    let out = tf.conv2d(tnFlashesEffect, kernel, 1, 'same').reshape([height,width])
    tn = tn.add(out)
    tnFlashes = tn.greater(nines) 
  }
  tn = tn.where(tnAllFlashes.logicalNot(), zeros)
  sum += tnAllFlashes.sum().arraySync() as number
  if (tn.max().arraySync() == 0 && i > 0) {
    iterationSyncFlash = i + 1
    break
  }
}

console.log('End situation')
tn.print()
console.log(`Answer of part 1: ${sum}`)
console.log(`Answer of part 2: ${iterationSyncFlash}`)
