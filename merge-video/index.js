const  argv = require('yargs').alias('i','input').argv;
const shell=require('shelljs')
const fs=require('fs')
//---
const inputDir=argv.i
const outputName=inputDir.split('/').pop().replace(/\s/g,'')
const videoTxtPath=inputDir+'/list.txt'
const outputVideoPath=outputName+'.mp4'

shell.exec(`ls '${inputDir}'`,{silent:true},(code,out,err)=>{
    if(code!==0)return
    const list=out.split('\n').filter(item=>item.includes('.mp4'))
    let videoList=list.map(item=>`file '${item}'`).join('\n')
    fs.writeFileSync(videoTxtPath,videoList)
    shell.exec(`cd '${inputDir}' &&  ffmpeg -f concat -safe 0 -i list.txt -c copy ${outputVideoPath}`)
})