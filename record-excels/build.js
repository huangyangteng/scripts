const xlsx = require('node-xlsx').default
const fs = require('fs')
const dayjs = require('dayjs')
//获取单元格合并信息
function getSpanningConfig(len, columnLen) {
    // 2列   4列
    //3-5
    //6-8
    const start = 2
    let configs = []
    for (let i = 0; i < len; i++) {
        configs.push({
            s: { r: i * 3 + start, c: 0 },
            e: { r: i * 3 + start + 2, c: 0 }
        })
        configs.push({
            s: { r: i * 3 + start, c: 1 },
            e: { r: i * 3 + start + 2, c: 1 }
        })
        configs.push({
            s: { r: i * 3 + start, c: 3 },
            e: { r: i * 3 + start + 2, c: 3 }
        })
        configs.push({
            s: { r: i * 3 + start, c: columnLen - 1 },
            e: { r: i * 3 + start + 2, c: columnLen - 1 }
        })
    }
    return configs
}
// 设置单元格宽度
function getColWidthConfig(columnLen) {
    return [...new Array(columnLen - 1).fill({ wch: 10 }), { wch: 20 }]
}
// 处理地址
const handleAddress = (item, arr) => {
    // 如果早、中、晚都没有打卡记录，说明是休息
    if (arr.filter((item) => item).length === 0) return '休息'
    if (!item) return ''
    // let address=item.remark&&!item.remark.includes('班')?item.remark:item.address
    let address = item.address
    let list = [
        '临沂',
        '东营北',
        '东营',
        '历下区',
        '玉林',
        '广西',
        '海南2',
        '镇江',
        '公司',
        '海南',
        '临沂',
        '镇江',
        '内陆港',
        '临邑',
        '世茂天城',
        '南京',
        '世茂',
        '泰安'
    ]
    let alias = new Map([
        ['世茂天城', '公司'],
        ['世茂', '公司']
    ])
    for (let region of list) {
        if (address.includes(region)) {
            return alias.has(region) ? alias.get(region) : region
        }
    }
    return address
}
// 获取备注信息
const getMark = (two, one) => {
    let oneStr = one.join('、') ? one.join('、') + '号一次打卡;' : ''
    let twoStr = two.join('、') ? two.join('、') + '号两次打卡' : ''
    return oneStr + twoStr
}
// 处理表格中每一行数据的生成
function handleRow(row, index = 0) {
    // 两次打开日期  一次打开日期  0次打开日期
    let two = [],
        one = [],
        zero = []
    row.logs.forEach((arr, i) => {
        let count = arr.filter((item) => item).length
        if (count === 2) {
            two.push(i)
        } else if (count === 1) {
            one.push(i)
        } else if (count === 0) {
            zero.push(i)
        }
    })
    let mark = getMark(two, one)

    return [
        [
            index + 1,
            row.name,
            '早上',
            row.logs.length - zero.length,
            ...row.logs.map((item) => handleAddress(item[0], item)),
            mark
        ],
        [
            '',
            '',
            '下午',
            '',
            ...row.logs.map((item) => handleAddress(item[1], item))
        ],
        [
            '',
            '',
            '晚上',
            '',
            ...row.logs.map((item) => handleAddress(item[2], item))
        ]
    ]
}
// 处理所有数据的生成
function handleData(res) {
    //     一条数据生成3条数据  早、中、晚
    return res.map((item, index) => handleRow(item, index)).flat()
}
function saveResultXlsx(outputPath, data) {
    let rows = handleData(data)
    const time = data[0].time
    const month = dayjs(time).month() + 1
    const daysInMonth = dayjs(time).daysInMonth()
    const row1 = [`${dayjs().year()}年${month}月考勤表`]
    const row2 = [
        '序号',
        '姓名',
        '时间',
        '出勤天数',
        ...new Array(daysInMonth).fill(0).map((_, i) => i + 1),
        '备注'
    ]
    const sheetOptions = {
        '!cols': getColWidthConfig(row2.length),
        '!merges': [
            { s: { r: 0, c: 0 }, e: { r: 0, c: row2.length } }, //合并第一行
            ...getSpanningConfig(data.length, row2.length)
        ]
    }
    // B3,4,5
    const buffer = xlsx.build(
        [{ name: 'mySheetName', data: [row1, row2, ...rows] }],
        {
            sheetOptions
        }
    ) // Returns a buffer
    fs.writeFileSync(outputPath, buffer)
}
module.exports = {
    saveResultXlsx
}
