const xlsx = require('node-xlsx')
const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const INPUT = 'record-excels/打卡记录.xlsx'
const OUTPUT='record-excels/result.xlsx'
const dayjs=require('dayjs')
const {saveResultXlsx}=require('./build')
const records = xlsx.parse(`${INPUT}`)[0].data

const getDay=(time)=>{
return Number(dayjs(time).format('DD'))-1
}
const getHour=(time)=>{
    let hour=dayjs(time).hour()
    if(hour>=0 && hour<11){
        return 0
    }else if(hour>=11 && hour<18){
        return 1
    }else{
        return 2
    }
}

const daysInMonth=(time)=>{
    return dayjs(time).daysInMonth()
}
// 1. 处理excel
let res=[]
let map=new Map()  // key '名字' value:index
records.forEach((item,index)=>{
    // 跳过前3行
    if(index>2){
        const [name,_a,date,time,_b,result,address,remark]=item
        let day=getDay(time)
        let hour=getHour(time)
        // 初始化数据
        if(!map.has(name)){
            map.set(name,res.length)
            res.push({
                name:name,
                time:time,
                logs:new Array(daysInMonth(time)).fill(0).map(()=>new Array(3).fill(null))
            })

        }
        let i=map.get(name)
        res[i].logs[day][hour]={
            address,
            time,
            result,
            remark
        }

    }
})

// 2.生成excel
saveResultXlsx(OUTPUT,res)

// console.log(JSON.stringify(res.slice(0,1)))
