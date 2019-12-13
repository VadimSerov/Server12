const socket = io();

t001.innerHTML = "окно загружено ";
but01.onclick = function() {
    t001.innerHTML = "Жесть от Node JS";
}

function emitToServer() {
    socket.emit("eventServer", sendinput.value);
}

send.onclick = emitToServer;
//sendinput.onchange = emitToServer;

socket.on("eventClient", function(msg) {
    t002.innerHTML += msg.data + "<br>";
    sendinput.value = "";
});

//кнопка Прочитать файл
btnfnread.onclick = function() {
    socket.emit("fnServer", filenameread.value);
}

//вдруг что то пришло с сервера
socket.on("fnClient", function(dann) {
    filenamewrite.value = dann.filename;
    if (dann.err == "") {
        txtar.value = dann.data;
    } else {
        txtar.value = dann.data;
        t002.innerHTML += "Error: " + dann.err + " " + dann.filename + "<br>";
        sendinput.value = "";
    }
});

//Кнопка записать в файл
btnfnwrite.onclick = function() {
    socket.emit("wrServer", {
        "filename": filenamewrite.value,
        "data": txtar.value
    });
}

//ответ с сервера как прошла запись
socket.on("wrClient", function(datt) {
    if (datt.err != "") {
        t002.innerHTML += "Error: " + datt.err +
            " " + datt.filename + "<br>";
        sendinput.value = "";
    }
});

//задача file2 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
//решение на стороне сервера, бинарные файлы не использовать
btnfile2.onclick = function() {
    socket.emit("file2Server", {
        "n": Number(inpn.value),
        "filename": inpfilename.value
    });
}

//задача file3 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
//решение на стороне сервера, бинарные файлы не использовать, 
//обязательно использовать парсинг в JSON 
btnfile3.onclick = function() {
    socket.emit("file3Server", {
        "a": Number(inpa.value),
        "b": Number(inpb.value),
        "filename": inpfilename3.value
    });
}

//задача file7 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
btnfile7.onclick = function() {
    socket.emit("file7Server", {
        "filename": inpfilename7.value
    });
}

//вдруг с сервера пришел ответ на задачу file7
socket.on("answerFile7Client", function(datt7) {
    answerfile7.innerHTML = " n= " + datt7.n +
        " ; a= " + datt7.a +
        " ; b= " + datt7.b +
        " ; c= " + datt7.c +
        " ; d= " + datt7.d;
});

//задача file10 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
btnfile10.onclick = function() {
    socket.emit("file10Server", {
        "filename": inpfilename10.value
    });
}

//вдруг с сервера пришел ответ на задачу file10
socket.on("answer10Client", function(datt10) {
    answerfile10.innerHTML = " Inverse file name: " + datt10.invFilename;
});

//задача file14 -- 1000 задач по программированию Часть II Абрамян М.Э. 2004 --
btnfile14.onclick = function() {
    socket.emit("file14Server", {
        "filename": inpfilename14.value
    });
}

//вдруг с сервера пришел ответ на задачу file10
socket.on("answer14Client", function(datt14) {
    answerfile14.innerHTML = " Среднее арифметическое: " + datt14.avg;
});