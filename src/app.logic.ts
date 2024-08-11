import fs from 'fs'
import { yarg } from './config/plugins/args.plugin'

console.log(yarg)

const { b: base, l: limit, s: showTable } = yarg

const headerMessage = `Tabla del 5 \n\n`

let resultado = ''

for (let i = 1; i <= limit; i++) {
  resultado += `${base} x ${i} = ${base * i}\n`
}

const outPutMessage = headerMessage + resultado

if (showTable) {
  console.log(outPutMessage)
}

const pathOutPut = 'outputs'

fs.mkdirSync(pathOutPut, { recursive: true })

fs.writeFileSync(`${pathOutPut}/tabla-${base}.txt`, outPutMessage)
