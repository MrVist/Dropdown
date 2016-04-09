var http = require('http');
var fs = require('fs');
var url = require('url');

var mimetype = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'ico':'image/ico'
}

http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = __dirname + pathname;
    console.log('Request for ' + pathname + ' received');
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            response.writeHead(404);
        } else {
            response.writeHead(200,{'Content-Type':mimetype[realPath.split('.').pop()]||'text/plain'});
            response.write(data);
        }

        response.end();
    });
}).listen(8082);

console.log('Server runnint at http://127.0.0.1:8082/');