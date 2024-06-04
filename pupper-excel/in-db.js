const fs = require('fs')
const shell = require('shelljs')
const path = require('path')
const INPUT_FILE = '/Users/h/Desktop/scripts/pupper-excel/peppa.json'

const data = JSON.parse(fs.readFileSync(INPUT_FILE).toString())

const sleep = async (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
async function fetchAdd(data, i) {
    await sleep(100)
    await shell.exec(
        `
    curl -X POST http://localhost:22222/lines/ \
-H "Content-Type: application/json" \
-d '${JSON.stringify(data)}'
    
    `,
        { silent: true },
        (code, stdout, stderr) => {
            console.log(stdout)
            if (code !== 0) {
                console.log('🐔🐔🐔', i, data, stderr)
            }
        }
    )
}
async function inDb() {
    const len = data.length
    for (let i = 2592; i < len; i++) {
        console.log(i)
        const item = data[i]
        item.en = item.en.replace(/'/g, '‘')
        await fetchAdd(item, i)
    }
}

inDb()
