const xlsx = require('node-xlsx')
const { saveResultXlsx } = require('./build')
const { getDay, getHour, daysInMonth,getNow } = require('./utils')

// ----------------------- 主要流程
const [nodeEnv,dir,...args]=process.argv
const inputPath=args[0]
const OUTPUT = `result.xlsx`
if(!inputPath){
    throw new Error('请输入打开记录的路径!,例如 node index.js 打开记录.xlsx ')
}
// 1. 处理excel

// 获取excel表中的全部记录
const records = xlsx.parse(`${inputPath}`)[0].data
let res = []
let map = new Map() // key '名字' value:index
/**
 * res数组中的元素的数据结构
[
	{
			name:'安明',
			logs:[
				[
					{address:'',result:'正常',time:'2020-06-01 05:47'},//上午
					null,//下午
					
					
				],//数组中包含3项，上午，下午，晚上,数组中为[null,null,null]说明今天缺勤
				
			
			]
	
	}


]
 */
records.forEach((item, index) => {
    // 跳过前3行
    if (index > 2) {
        const [name, _a, date, time, _b, result, address, remark] = item
        let day = getDay(time)
        let hour = getHour(time)
        // 初始化数据
        if (!map.has(name)) {
            map.set(name, res.length)
            res.push({
                name: name,
                time: time,
                logs: new Array(daysInMonth(time))
                    .fill(0)
                    .map(() => new Array(3).fill(null))
            })
        }
        let i = map.get(name)
        // 设置员工的打卡记录
        res[i].logs[day][hour] = {
            address,
            time,
            result,
            remark
        }
    }
})

// 2.生成excel
saveResultXlsx(OUTPUT, res)
