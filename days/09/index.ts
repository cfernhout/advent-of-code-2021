import * as fs from 'fs'
import * as path from 'path'
import * as math from 'mathjs'
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
const length = data.length
const wide = data[0].length
const tnMirror = tf.pad(data, [[1, 1], [1, 1]], 10)
const tn = tf.reshape(tnMirror, [1, length+2, wide+2, 1]) as tf.Tensor4D

const kArray = [
  [
    [-1, 1, 0],
    [3, 1, 1, 1]
  ],
  [
    [-1, 1, 0],
    [1, 3, 1, 1]
  ],
  [
    [0, 1, -1],
    [3, 1, 1, 1]
  ],
  [
    [0, 1, -1],
    [1, 3, 1, 1]
  ],
]
let gatherArray = []
for (let k in kArray) {
  let resizeShape = kArray[k][1] as [number, number, number, number]
  const kernel = tf.reshape(kArray[k][0], resizeShape) as tf.Tensor4D

  let out = tf.conv2d(tn, kernel, 1, 'same')
  gatherArray.push(out.reshape([length+2, wide+2]).slice([1,1],[length,wide]).flatten().arraySync())
}
let sum = 0
let lowPoints = []
const flatData = data.flat()
for (let i in gatherArray[0]) {
  if (gatherArray[0][i] < 0 && gatherArray[1][i] < 0 && gatherArray[2][i] < 0 && gatherArray[3][i] < 0) {
    lowPoints.push([Math.floor(+i/wide), +i % wide])
    sum += flatData[i] + 1
  }
}
console.log('Answer to part 1:', sum)

  
// Function that returns true if
// the given pixel is valid
function isValid(screen: number[][], m: number, n: number, x: number, y: number, prevC: number, newC: number)
{
    if(x<0 || x>=m || y<0 || y>=n || screen[x][y]==9 || screen[x][y]==newC)
        return false;
    return true;
}


// FloodFill function
function floodFill(screen: number[][], m: number, n: number, x: number, y: number, prevC: number, newC: number)
{
    let queue = [];

    queue.push([x, y]);

    screen[x][y] = newC;

    let counter = 1
    while(queue.length > 0)
    {
        // Dequeue the front node
        let currPixel = queue[queue.length - 1] as number[];
        queue.pop();

        let posX = currPixel[0];
        let posY = currPixel[1];

        if(isValid(screen, m, n, posX + 1, posY, prevC, newC))
        {
            screen[posX + 1][posY] = newC;
            queue.push([posX + 1, posY]);
            counter++
        }

        if(isValid(screen, m, n, posX-1, posY, prevC, newC))
        {
            screen[posX-1][posY] = newC;
            queue.push([posX-1, posY]);
            counter++
        }

        if(isValid(screen, m, n, posX, posY + 1, prevC, newC))
        {
            screen[posX][posY + 1] = newC;
            queue.push([posX, posY + 1]);
            counter++
        }

        if(isValid(screen, m, n, posX, posY-1, prevC, newC))
        {
            screen[posX][posY-1] = newC;
            queue.push([posX, posY-1]);
            counter++
        }
    }
  return counter
}

let m = data.length;
let n = data[0].length;

let sizeBasins = []
for (let coords of lowPoints) {
  let x = coords[0]
  let y = coords[1]
  let prevC = data[x][y];

  let newC = 10;
  let c = floodFill(data, m, n, x, y, prevC, newC)
  sizeBasins.push(c)  
}
function compareNumbers(a: number, b: number) {
  return b - a;
}
sizeBasins.sort(compareNumbers)
console.log('Answer to part 2:', math.prod(sizeBasins.slice(0,3)))

