# scripts
Write some scripts to deal with some of the daily work, such as dealing with excel, word processing, etc.

## Note
执行脚本从根目录开始执行，举个例子：  node pupper-excel/index.js ✅
不要  cd pupper-excel && node index.js ❌

## Overview

###  pupper-excel 
把小猪佩奇的台词(excel)文件处理成json格式

* 把所有的excel文件放到一个文件夹中
* 读取文件夹下所有的excel，处理数据，输出到peppa.json中
* 读取peppa.json文件，遍历入库
