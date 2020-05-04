const express = require('express');

const server = express();

// tratar as requisições HTTP (GET, POST, PUT, DELETE)

server.get('/', function(request, response) {
    response.send('Hello World, Fatec!');
})

// escutar um porta com as requisições HTTP:
server.listen(process.env.PORT || 3000);