console.log('Hello World  (start of js file)');

// Get Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

var invert = function() {
    console.log('Calling invert function');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};

var shift = function() {
    console.log('Calling shift function');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data

    const shift = parseInt(imageData.width * 1.5);
    console.log(`Using shift of: ${shift}`);
    for (var i = 0; i < data.length; i+= 4) {
        var newind = (i+shift) % data.length;
        data[i] = data[newind];
        data[i+1] = data[newind+1];
        data[i+2] = data[newind+2];
        data[i+3] = data[newind+3];
    }
    ctx.putImageData(imageData, 0, 0);
}

// Draw Image
var img = new Image();
img.src = 'image.jpg';

img.onload = function(){
    var imageRatio = img.height / img.width;
    canvas.height = imageRatio * canvas.width;

    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    // img.setAttribute('crossOrigin', '')

    console.log('Collecting data...');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imageData);
}
