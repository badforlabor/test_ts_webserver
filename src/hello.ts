import * as http from 'http';
import * as csv from 'csv-parse'

//====================
const server = http.createServer(function(request:http.IncomingMessage,response:http.ServerResponse):void{
    console.log("create a server...");
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('5 Hello world,we use typescript to develop.');

    let parser = new csv.Parser({delimiter:';'});
    parser.on("readable", function():void{
        do {
            let record = parser.read();
            if(record) {
                console.log(record);
            }
        } while(true);
    });
    parser.on("error", function(err:Error){
        console.log(err);
    })
    parser.write("root:x:0:0:root:/root:/bin/bash\n");
    parser.write("someone:x:1022:1022:a funny cat:/home/someone:/bin/bash\n");
    parser.end();


    response.end();
});

server.listen(3000,function(){
    console.log("Server listening on port 3000");
    console.log("test...");
});