/**
 * 输入 excels文件
 * 输出 json    {en:'',ch:'',refer:'',time:0}
 */

const xlsx = require('node-xlsx')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const INPUT = '/Users/z/Desktop/pupper-line-excels/'
// const FILE_NAME = '2'
//
// // 只取第一个sheet的数据
// const sheetData = sheets[0].data

shell.exec(`ls ${INPUT}`, (code, stdout, stderr) => {
    if (code !== 0) {
        console.error(stderr)
        return
    }
    let list = stdout
        .split(/\n/)
        .filter((i) => !!i)
        .sort((a, b) => {
            let regex = /第(\d+)集/
            let aNo = a.match(regex)[1]
            let bNo = b.match(regex)[1]
            return aNo - bNo
        })
    let res = []
    list.forEach((item, index) => {
        const sheets = xlsx.parse(`${INPUT}/${item}`)
        const sheetData = sheets[0].data
        console.log(sheetData)
        sheetData.forEach((row) => {
            if (row.length > 1) {
                let [en, ch] = row
                res.push({
                    en,
                    ch,
                    time: 0,
                    refer: index
                })
            }
        })
    })
    fs.writeFileSync('./output.json', JSON.stringify(res, null, 2), 'utf8');
})

// let res=[]

//
