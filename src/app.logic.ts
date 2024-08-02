import fs from 'fs'

const headerMessage = `Tabla del 5 \n\n`
let resultado = ''
let base = 5
for (let i = 1; i <= 10; i++) {
  resultado += `${base} x ${i} = ${base * i}\n`
}

const outPutMessage = headerMessage + resultado

console.log(outPutMessage)
const pathOutPut = 'outputs'

fs.mkdirSync(pathOutPut, { recursive: true })

fs.writeFileSync(`${pathOutPut}/tabla-${base}.txt`, outPutMessage)
