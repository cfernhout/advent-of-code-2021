import * as fs from 'fs';
import * as path from 'path';

function readData() {
  const filePath = path.join(__dirname.replace('_build', 'days'), 'data.txt');
  // const file = fs.readFileSync(filePath,'utf8').replace(/\| /gi, '').split('\n')
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
const dataArray = readData()
console.log(dataArray)
