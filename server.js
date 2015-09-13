

var redis= require('redis');
var fs = require('fs');
var app = require("http").createServer(handler); 

var WebSocketServer = require("ws").Server;
var socket = new WebSocketServer({port:8080});


socket.on('connection', function(connection) {
	var client = redis.createClient(6379,"localhost");

	console.log("We have a client" + this.clients);

	var a = this.clients;
	
	client.subscribe("quote-added");

	client.on("error",function(channel,count) {
		console.log(" REDIS small Client DISconnected" + channel + count);
	});
	
	client.on("message",function(channel,message) {
		console.log(" REDIS Client subscribe quote added"+channel+message);
		//io.sockets		
		console.log("length: " + a.length);
		
		a.forEach(function(client) {
			client.send(message);
		});

		
	});
	
});

// redis_client.on("message",function(msg) {
// 		console.log(" REDIS Client subscribe quote added " + this.clients);
// 		//io.sockets		
// 		this.clients.forEach(function(client) {
// 			client.send(msg);
// 		});
// // 	});


// redis_client.on("connect",function(channel,count) {
// 	console.log(" REDIS Client connected");
// });

// redis_client.on('ready', function() {
// 	console.log(this.clients);
//     console.log('redis is runninX_g');
// });

// redis_client.on("error",function(channel,count) {
// 	console.log(" REDIS Client DISconnected");
// });

// var store = redis.createClient();
// var pub = redis.createClient();
// var sub = redis.createClient();

function handler(req,res){
    fs.readFile(__dirname + '/index.html', function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        console.log("Listening on port 8088");
        res.end(data);
    });
}
 
// io.on('connection', function (client) {
//     sub.subscribe("quote-added");

// 	sub.on("quote-added", function (channel, message) {
//         console.log("quote-added received on server from publish "+message);
//         client.send(message);
//     });

// 	redis_client.on("message",function(channel,count) {
// 		console.log(" REDIS Client subscribe quote added ");
// 		//io.sockets
// 	});
	
//     client.on("message", function (msg) {
//         console.log(msg);
//         if(msg.type == "chat"){
//             pub.publish("chatting",msg.message);
//         }
//         else if(msg.type == "setUsername"){
//             pub.publish("chatting","A new user in connected:" + msg.user);
//             store.sadd("onlineUsers",msg.user);
//         }
//     });
//     client.on('disconnect', function () {
//         sub.quit();
//         pub.publish("chatting","User is disconnected :" + client.id);
//     });
     
//   });
