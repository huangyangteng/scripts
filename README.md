# scripts
Write some scripts to deal with some of the daily work, such as dealing with excel, word processing, etc.

## Note

Run script from the root directory,for example:

 node pupper-excel/index.js ✅

 cd pupper-excel && node index.js ❌

## Overview

###  pupper-excel 
Convert Peppa Pig bank lines file(excel) to json format.

* Move all excel files to one folder   

* Iterate through and read all the excel under the folder,process the  data,output to peppa.json  
* Read the peppa.json file and store the data into the database.

### merge-video

Merge the video list under one folder.

Core script:

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

input:

* video folder path
* mylist.txt      generated from video folder path

 output:

* ouput video    current project root path
* output info

example:

```shel
node merge-video -i /Users/h/Downloads/bdyDownload/30.Nginx核心知识100讲/1 第一章 初识Nginx  

# output
第一章 初识Nginx.mp4
第一章 初识Nginx.json
第一章 初识Nginx.csv
```

