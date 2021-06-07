var express = require('express')
var fs = require('fs');

var server = express()
server.get('/', function (request, response) {
    console.log(request.query.r)
	fs.appendFileSync('results.txt', request.query.r+'\n');

})
server.listen(9000)