const fs = require('fs');
const server = require('http').createServer();
const ios = require('socket.io').listen(server);

var port = 80;
var host = 'localhost';

const defs = {
    css: `body{
	margin:0;
	padding:0;
	text-align:center;} 
	h1{
	background-color:#43853d;
	color:white;
	padding: .5em;
	font-family:"Consolas";}`,

    htm: `<!DOCTYPE html>
	<html>
	<head>
	<meta charset="UTF-8">
	<title>Первый сервер</title>
	<link rel="stylesheet" href="app.css">
	</head>
	<body>
	<h1>Основы node js</h1>
	<button id="but01">Нажать</button>
	<script src="app.js"></script>
	</body>
	</html>`,

    js: `const but01=document.getElementById("but01");
	but01.onclick=function(){
	alert("Жесть")}`
}

function getRandomInt(min, max) {
    if (min > max) {
        var buf = min;
        min = max;
        max = buf;
    }
    return Math.floor(Math.random() * (max - min)) + Math.floor(min);
}

function getRandomIntArr(n, min, max) {
    if (min > max) {
        var buf = min;
        min = max;
        max = buf;
    }
    var result = [];
    for (let i = 0; i < n; i++) {
        result.push(Math.floor(Math.random() * (max - min)) + Math.floor(min));
    }
    return result;
}

function getRandomFloat(min, max) {
    if (min > max) {
        var buf = min;
        min = max;
        max = buf;
    }
    return Math.random() * (max - min) + min;
}

function getRandomFloatArr(n, min, max) {
    if (min > max) {
        var buf = min;
        min = max;
        max = buf;
    }
    var result = [];
    for (let i = 0; i < n; i++) {
        result.push(Math.random() * (max - min) + min);
    }
    return result;
}

server.on('request', function(request, response) {
    console.log(request.url);
    if (request.url == '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(__dirname + '/content/html/index.html', function(err0, data0) {
            if (!isNaN(err0)) {
                response.end(data0);
            } else {
                response.end(defs.htm);
            }
        });
    }
    if (request.url == '/app.js') {
        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        fs.readFile(__dirname + '/content/js/app.js', function(err1, data1) {
            if (!isNaN(err1)) {
                response.end(data1);
            } else {
                response.end(defs.js);
            }
        });
    }
    if (request.url == '/app.css') {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        fs.readFile(__dirname + '/content/css/app.css', function(err2, data2) {
            if (!isNaN(err2)) {
                response.end(data2);
            } else {
                response.end(defs.css);
            }
        });
    }
    if (request.url == '/bu.jpg') {
        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
        fs.readFile(__dirname + '/content/image/bu.jpg', function(errj, dataj) {

            response.end(dataj);

        });
    }
});

server.listen(port, host, function() {
    console.log('Сервер работает. Слушает хост:', host, ' ,  порт:', port)
});

//установить счётчик рассоединений
//n_disconnect=0;

ios.sockets.on('connection', function(socket) {

    socket.on('eventServer', function(data) {
        console.log(data);
        socket.emit('eventClient', {
            "data": 'Hello Client! You send: ' + data
        });
    });

    socket.on("fnServer", function(data3) {
        console.log("Filename: " + data3);
        try {
            var buf = fs.readFileSync(__dirname + '/files/' + data3, "utf8");
            err = "";
        } catch {
            err = "No such file.";
            buf = "";
        }
        socket.emit("fnClient", {
            "err": err,
            "filename": data3,
            "data": buf
        });
    });

    socket.on("wrServer", function(data4) {
        console.log("Write file " + data4.filename);
        try {
            fs.writeFileSync(__dirname + '/files/' + data4.filename, data4.data);
            err = "";
        } catch {
            err = "Can't write file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data4.filename
        });
    });

    //задача file2 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
    socket.on("file2Server", function(data5) {
        console.log("Write file " + data5.filename);
        try {
            var nex = 2
            var string5 = String(nex);
            for (let i = 1; i < data5.n; i++) {
                nex += 2;
                string5 += " " + String(nex);
            }
            fs.writeFileSync(__dirname + '/files/' + data5.filename, string5);
            err = "";
        } catch {
            err = "Can't write file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data5.filename
        });
    });

    //задача file3 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
    socket.on("file3Server", function(data6) {
        console.log("Write file " + data6.filename);
        try {
            var buf = [];
            var x = data6.a;
            for (let i = 0; i < 10; i++) {
                buf.push(x);
                x += data6.b;
            }
            //преобразовать в JSON и записать в файл на сервере
            fs.writeFileSync(__dirname + '/files/' + data6.filename, JSON.stringify(buf));
            err = "";
        } catch {
            err = "Can't write file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data6.filename
        });
    });

    //задача file7 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
    socket.on("file7Server", function(data7) {
        try {
            //преобразовать в JSON и записать в файл на сервере
            fs.writeFileSync(__dirname + '/files/' + data7.filename, JSON.stringify(getRandomIntArr(getRandomInt(5, 50), -50, 50)));
            err = "";
            console.log("Write file " + data7.filename);
        } catch {
            err = "Can't write file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data7.filename
        });
        try {
            //прочитать файл JSON с сервера и преобразовать в масив
            var buf7 = JSON.parse(fs.readFileSync(__dirname + '/files/' + data7.filename));
            err = "";
            console.log("Read file " + data7.filename);
        } catch {
            err = "Can't read file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data7.filename
        });
        try {
            //вычислить ответ задачи file7 и послать клиенту
            socket.emit("answerFile7Client", {
                "n": buf7.length,
                "a": buf7[0],
                "b": buf7[1],
                "c": buf7[buf7.length - 2],
                "d": buf7[buf7.length - 1]
            });
        } catch {
            err = "Can't calculate file.";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data7.filename
        });
    });

    //задача file10 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
    socket.on('file10Server', function(data10) {
        //создать имя файла с инвертированным массивом , только если это файл JSON
        var invFilename10 = data10.filename.replace('.json', 'inv.json');
        console.log('Inverse file: ' + invFilename10);
        try {
            //создать массив случайных целых чисел и сохранить как файл JSON на сервере
            fs.writeFileSync(__dirname + '/files/' + data10.filename,
                JSON.stringify(getRandomIntArr(getRandomInt(5, 50), -50, 50))
            );
            err = "";
        } catch {
            err = "Can`t write file. ";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data10.filename
        });
        try {
            //прочитать
            var buf10 = JSON.parse(fs.readFileSync(__dirname + '/files/' + data10.filename));
            err = "";
        } catch {
            err = "Can`t read file. ";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data10.filename
        });
        try {
            //вычислить ответ
            inv10 = [];
            for (let i = 0; i < buf10.length; i++) {
                inv10.push(buf10[buf10.length - 1 - i]);
            }
            //записать в новый файл
            fs.writeFileSync(__dirname + '/files/' + invFilename10, JSON.stringify(inv10));
            //послать ответ клиенту усли всё удачно
            socket.emit("answer10Client", { "invFilename": invFilename10 });
            err = "";
        } catch {
            err = "Can`t write file. ";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": invFilename10
        });
    });

    //задача file14 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
    socket.on('file14Server', function(data14) {
        try {
            //создать массив случайных вещественных чисел (с плавающей точкой)
            var buf = getRandomFloatArr(getRandomInt(10, 45), -100, 100);
            //записать в файл на сервере
            fs.writeFileSync(__dirname + '/files/' + data14.filename, JSON.stringify(buf));
            err = "";
        } catch {
            err = "Can`t write file. ";
        }
        socket.emit("wrClient", {
            "err": err,
            "filename": data14.filename
        });
        //прочитать файл на сервере
        try {
            var buf14 = JSON.parse(fs.readFileSync(__dirname + '/files/' + data14.filename));
            //решить задачу file14 и послать ответ клиенту
            var avg = 0;
            for (let i = 0; i < buf14.length; i++) {
                avg += buf14[i] / buf14.length;
            }
            socket.emit('answer14Client', { "avg": avg });
            err = "";
        } catch {
            err = "Can`t read file. ";
        }
    });

    // что делать при разъединении с браузером 
    socket.on('disconnect', function() {
        //console.log('user disconnected',n_disconnect++);
    });
});