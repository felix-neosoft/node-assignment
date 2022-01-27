var http = require('http')
var fs = require('fs')
var module = require('./module')

http.createServer(function(request,response){
    if(request.method==="GET" && request.url==="/"){
        response.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('./index.html',(err,data)=>{
            if(err) throw err
            response.write(data)
            response.end()
        })
    }
    else if(request.method==="POST"){
        var body='';
        request.on('data',function(data){
            body+=data;
        });
        request.on('end',function(){
            let form = []
            fs.readFile('./data.json','utf-8',(err,data)=>{
                form = data
            })
            const data = JSON.stringify(module.postConvertJson(body))
            form.push(data)
            fs.writeFile('data.json',form,(err)=>{
                if(err) throw err
                console.log("Data Inserted")
            })
        })
    }
}).listen(6677)