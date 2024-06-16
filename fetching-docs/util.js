const createCsvWriter = require('csv-writer').createObjectCsvWriter;

 

function saveCsvFile(path,records){
    const csvWriter = createCsvWriter({
        path:path,
        header: [
            {id: 'sentence', title: 'sentence'},
            {id: 'link', title: 'link'},
            {id:'source',title:'source'}
        ]
    });
    const list=handleList(records)
    console.log(list.length)
    csvWriter.writeRecords(list)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
}
function handleList(list){
    return list.map(({link,sentences,source})=>{
        return sentences.map(item=>({link,source,sentence:item}))
      }).flat()
}

module.exports={
    saveCsvFile
}