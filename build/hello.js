"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const csv = require("csv-parse");
//====================
const server = http.createServer(function (request, response) {
    console.log("create a server...", request.url);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write((Math.random() * 100).toFixed(0).toString());
    response.write('5 Hello world,we use typescript to develop.');
    response.end();
    test_csv();
    test_json();
});
function test_csv() {
    let parser = new csv.Parser({ delimiter: ';' });
    parser.on("readable", function () {
        do {
            let record = parser.read();
            if (record) {
                console.log("info", record);
            }
            else {
                break;
            }
        } while (true);
    });
    parser.on("error", function (err) {
        console.log("err:", err);
    });
    parser.write("root:x:0:0:root:/root:/bin/bash\n");
    parser.write("someone:x:1022:1022:a funny cat:/home/someone:/bin/bash\n");
    parser.end();
}
function test_json() {
    let json = { "key": "value" };
    let obj1 = json;
    console.log("obj1:", obj1.key);
    let obj2 = {};
    obj2.obj1 = obj1;
    obj2.key = "key-obj2";
    let obj2string = JSON.stringify(obj2);
    console.log("obj2:", obj2string);
    let obj22 = (JSON.parse(obj2string));
    console.log("obj22:", obj22.key);
}
server.listen(3000, function () {
    console.log("Server listening on port 3000");
    console.log("test...");
});
