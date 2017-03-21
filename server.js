var net = require('net');
var tcpServer = net.createServer();
var tcpPort = 5550;
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const WebSocket = require('ws');
const port = 1337;
const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws){
  console.log('new connection');

  ws.on('message', function incoming(message){
    console.log('WS Message received from Token Browser: %s', message);
    ws.send('Token Server WebSocket echo: ', message);

    tcpClient.write(message);
  });
});

console.log('websocket server started on port: ' + port);

//-----------------
//TCP stuff
//-----------------

var tcpClient = new net.Socket();
var tcpPort = 5550;

tcpClient.connect(tcpPort, '127.0.0.1', function(){
  console.log('Connected');
  var data = "{\"message\": \"Token Controller Requesting Connection\"}"
  // tcpClient.write('Hello from Token TCP Server');
  tcpClient.write(JSON.stringify(data));
});

tcpClient.on('data', function(data){
  console.log('TCP message received: ', decoder.write(data));
  // tcpClient.destroy();
});

tcpClient.on('close', function(){
  console.log('TCP Connection closed');
})
