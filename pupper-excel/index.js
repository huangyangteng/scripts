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
let peppaList= [
    { title: '挑战52天背完小猪佩奇，第1天', bvid: 'BV113411F7ME' },
    { title: '挑战52天背完小猪佩奇，第2天', bvid: 'BV1yf4y1d7zi' },
    { title: '挑战52天背完小猪佩奇，第3天', bvid: 'BV1jB4y187A4' },
    { title: '挑战52天背完小猪佩奇，第4天', bvid: 'BV1EB4y1h7z8' },
    { title: '挑战52天背完小猪佩奇，第5天', bvid: 'BV1xU4y1Y7pk' },
    { title: '挑战52天背完小猪佩奇，第6天', bvid: 'BV1xa411V756' },
    { title: '挑战52天背完小猪佩奇，第7天', bvid: 'BV1Wt4y1n7yF' },
    { title: '挑战52天背完小猪佩奇，第8天', bvid: 'BV1at4y177zv' },
    { title: '挑战52天背完小猪佩奇，第9天', bvid: 'BV1tB4y1n7bN' },
    { title: '挑战52天背完小猪佩奇，第10天', bvid: 'BV13e4y1H7qZ' },
    { title: '挑战52天背完小猪佩奇，第11天', bvid: 'BV1dG411E775' },
    { title: '挑战52天背完小猪佩奇，第12天', bvid: 'BV1JD4y1r7af' },
    { title: '挑战52天背完小猪佩奇，第13天', bvid: 'BV1tm4y1F78o' },
    { title: '挑战52天背完小猪佩奇，第14天', bvid: 'BV1gD4y187PX' },
    { title: '挑战52天背完小猪佩奇，第15天，我会用英语野餐啦！', bvid: 'BV1XR4y1f7DP' },
    { title: '挑战52天背完小猪佩奇，第16天，7分05秒到13分很重要！', bvid: 'BV1vR4y1Z7KW' },
    { title: '挑战52天背完小猪佩奇，第17天，即将到达三分之一！即将！', bvid: 'BV1Pe4y1W7Vn' },
    { title: '挑战52天背完小猪佩奇，第18天，啊哈！三分之一了！', bvid: 'BV1yG4y1G7nc' },
    { title: '挑战52天背完小猪佩奇，第19天，即将到达20天！呀嘿！', bvid: 'BV15e411w7WD' },
    { title: '挑战52天背完小猪佩奇，第20天，进来一起玩猜台词！', bvid: 'BV1d8411E7xs' },
    { title: '挑战52天背完小猪佩奇，第21天，快一半了！', bvid: 'BV1e84y1h7Aw' },
    { title: '挑战52天背完小猪佩奇，第22天，离一半还有4天', bvid: 'BV1Q34y1f7ui' },
    { title: '挑战52天背完小猪佩奇，第23天，悄悄更一集', bvid: 'BV1je4y1P7as' },
    { title: '挑战52天背完小猪佩奇，第24天，今天开始进阶，升级了！', bvid: 'BV1zj411P7mc' },
    { title: '挑战52天背完小猪佩奇，第25天', bvid: 'BV1TY4y1S7fD' },
    { title: '挑战52天背完小猪佩奇，第26天，一半了！哈哈哈哈哈哈', bvid: 'BV1zk4y1i7Eo' },
    { title: '挑战52天背完小猪佩奇，第27天，合并重发一下', bvid: 'BV1BV4y1Z7eD' },
    { title: '挑战52天背完小猪佩奇，第28天，今天开始自测', bvid: 'BV1iz4y1b7za' },
    { title: '挑战52天背完小猪佩奇，第29天，离30天还有1天', bvid: 'BV1m24y1A7kd' },
    { title: '挑战52天背完小猪佩奇，第30天，我终于开始轻松了哈哈哈', bvid: 'BV1hh411T7Ye' },
    { title: '挑战52天背完小猪佩奇，第31天，呵，简单！', bvid: 'BV1CM4y1n7d9' },
    { title: '挑战52天背完小猪佩奇，第32天，我说单词，你猜台词', bvid: 'BV1XX4y1i78y' },
    { title: '挑战52天背完小猪佩奇，第33天', bvid: 'BV1WV4y1877V' },
    { title: '挑战52天背完小猪佩奇，第34天，没人看我也会坚持的！我超有毅力!', bvid: 'BV1DM4y1x7Do' },
    { title: '挑战52天背完小猪佩奇，第35天', bvid: 'BV1xu4y1m7i2' },
    { title: '挑战52天背完小猪佩奇，第36天', bvid: 'BV13k4y137En' },
    { title: '挑战52天背完小猪佩奇，第37天，从今天开始日更', bvid: 'BV1aP411s763' },
    { title: '挑战52天背完小猪佩奇，第38天，日更', bvid: 'BV1xu4y1q7Zj' },
    { title: '挑战52天背完小猪佩奇，第39天，日更', bvid: 'BV1fh4y1Q7kc' },
    { title: '挑战52天背完小猪佩奇，第40天，终于40集喽！', bvid: 'BV1b44y1F7Pf' },
    { title: '挑战52天背完小猪佩奇，第41天', bvid: 'BV1f84y1o7pf' },
    { title: '挑战52天背完小猪佩奇，第42天', bvid: 'BV1Tp4y1T7N3' },
    { title: '挑战52天背完小猪佩奇，倒数第10天', bvid: 'BV1vN4y1R715' },
    { title: '挑战52天背完小猪佩奇，第44天，最简单的一集', bvid: 'BV1Jr4y197he' },
    { title: '挑战52天背完小猪佩奇，第45天', bvid: 'BV1HP411h7pk' },
    { title: '挑战52天背完小猪佩奇，第46天', bvid: 'BV1PP411878k' },
    { title: '挑战52天背完小猪佩奇，第47天，还剩5天啦', bvid: 'BV1Em4y1N7gB' },
    { title: '挑战52天背完小猪佩奇，第48天，还剩4天啦', bvid: 'BV1P94y1p7Z8' },
    { title: '挑战52天背完小猪佩奇，第49天，还剩最后三天！', bvid: 'BV1Np4y1w7kR' },
    { title: '挑战52天背完小猪佩奇，第50天，还剩两天！', bvid: 'BV1Eu41137PC' },
    { title: '挑战52天背完小猪佩奇，第51天(含第52集内容)', bvid: 'BV1kw411m7TK' },
   { title: '挑战52天背完小猪佩奇，第51天(含第52集内容)', bvid: 'BV1kw411m7TK' },]

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
                    refer: peppaList[index].bvid
                })
            }
        })
    })
    fs.writeFileSync('./peppa.json', JSON.stringify(res, null, 2), 'utf8');
})

// let res=[]

//
