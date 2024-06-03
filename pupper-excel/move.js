/**
 * 把 /Users/z/Downloads/挑战52天背完小猪佩奇-文档资料/line  下面的excel文件  移动到  /Users/z/Desktop/pupper-line-excels 文件夹中
 */

const fs=require('fs')
const shell=require('shelljs')

const INPUT='/Users/z/Downloads/挑战52天背完小猪佩奇-文档资料/line'
const TARGET='/Users/z/Desktop/pupper-line-excels/'
shell.exec(`ls ${INPUT}`,(code,stdout,stderr)=>{
    let list=stdout.split(/\n/).filter(i=>!!i)
    console.log(list)
    list.forEach(item=>{
        let file=`${INPUT}/${item}/${item}-中英台词.xlsx`
        shell.exec(`cp ${file} ${TARGET}`,(c,so,se)=>{
            console.log(c,so,se)
        })
    })

})

   // let regex = /第(\d+)集/
        // let match = item.match(regex);

        // const title=match[1]+'.xlsx'
        // console.log(title)