const http = require('http');
const fs = require('fs');
const Canvas = require('canvas');

http.createServer(function (req, res) {
    // fs.readFile(__dirname + '/images/image.jpg', function(err, data) {
    //     if (err) throw err;
    //     var img = new Canvas.Image; // Create a new Image
    //     img.src = data;

    //     // Initialiaze a new Canvas with the same dimensions
    //     // as the image, and get a 2D drawing context for it.
    //     // var canvas = new Canvas(img.width, img.height);
    //     var canvas = Canvas.createCanvas(img.width, img.height, 'svg');
    //     var ctx = canvas.getContext('2d');
    //     // ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);
    //     ctx.drawImage(img, 50, 0, 70, 70);

    //     res.write('<html><body>');
    //     res.write('<img src="' + canvas.toDataURL() + '" />');
    //     console.log('<img src="' + canvas.toDataURL() + '" />');
    //     res.write('</body></html>');
    //     res.end();
    // });

    Canvas.loadImage(__dirname + '/images/image.jpg').then(image => {
        console.log(image);
        console.log(image.width)
        console.log(image.height)

        const canvas = Canvas.createCanvas(image.width, image.height, 'pdf');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 50, 50);

        // console.log('<img src="' + canvas.toDataURL() + '" />')

        res.write('<html><body>');
        res.write('<h1>TEST</h1>');
        res.write('<img src="' + canvas.toDataURL() + '" />');
        console.log('<img src="' + canvas.toDataURL() + '" />');
        res.write('</body></html>');
        res.end();
    })

}).listen(8124, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');