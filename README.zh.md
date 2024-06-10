# scripts
Write some scripts to deal with some of the daily work, such as dealing with excel, word processing,video processing, etc.

## Note
Run script from the root directory,
执行脚本从根目录开始执行，举个例子：  node pupper-excel/index.js ✅
不要  cd pupper-excel && node index.js ❌

## Overview

###  pupper-excel 
把小猪佩奇的台词(excel)文件处理成json格式

* 把所有的excel文件放到一个文件夹中
* 读取文件夹下所有的excel，处理数据，输出到peppa.json中
* 读取peppa.json文件，遍历入库

### merge-video

合并一个文件夹下的多个视频

核心命令:

```shell
ffmpeg -f concat -safe 0 -i mylist.txt -c copy output.mp4

cat mylist.txt
#output
file 'path/to/your/video1.mp4'
file 'path/to/your/video2.mp4'
file 'path/to/your/video3.mp4'
# file is the keyword used by FFmpeg to specify the input file
# path can be an absolute path or a relative path where ffmpeg commands are executed.

```

输入:

* video folder path
* mylist.txt      根据视频文件夹路径自动生成

 输出:

* ouput video    生成在当前项目的根目录下面
* output info

例子:

```shel
node merge-video -i /Users/h/Downloads/bdyDownload/30.Nginx核心知识100讲/1 第一章 初识Nginx  

# output
第一章 初识Nginx.mp4
第一章 初识Nginx.json
第一章 初识Nginx.csv
```
