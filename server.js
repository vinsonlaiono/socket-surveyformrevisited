const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

const server = app.listen(7000, function(){
    console.log('listening on port: 7000');     
})

const io = require('socket.io')(server);

io.on('connection', function (socket) { 
    var number =  Math.floor(Math.random()*1000+1);
    console.log('Socket connection complete...')
    socket.on('formdata', function(data){
        console.log(data)
        socket.emit('response', {data: data}, number)
        console.log(number)
    })
});

app.get('/', function(req, res) {
    res.render("index");
})

