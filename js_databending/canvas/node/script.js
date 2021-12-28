const http = require('http');
const fs = require('fs');
const parse = require('node-html-parser').parse;
const Canvas = require('canvas');

// http.createServer((req, res) => {
fs.readFile('index.html', 'utf8', (err, html) => {
    if (err) {
        throw err;
    }
    Canvas.loadImage(__dirname + '/image.jpg').then(image => {
        const root = parse(html);
        const body = root.querySelector('body');
        console.log(body);

        console.log(image);
        console.log(image.width);
        console.log(image.height);

        // res.write('<html><body>');
        // res.write('<h1>NodeJS TEST</h1>');
        // res.write(`<canvas id="canvas" width="${image.width}" height="${image.height}"></canvas>`);
        // res.write('</body></html>');
        // res.end();

    })
})
// }).listen(8124, '127.0.0.1');
console.log('server running at localhost');
