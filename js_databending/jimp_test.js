const Jimp = require('jimp');
const math = require('mathjs')


function invert(color) {
    var out = Object.assign({}, color);
    out.r = 255 - color.r;
    out.g = 255 - color.g;
    out.b = 255 - color.b;

    return out;
}
 
// open a file called "lenna.png"
Jimp.read('images/image.jpg', (err, image) => {
    if (err) throw err;
    image 
        .resize(256, 256) // resize
        // .quality(60) // set JPEG quality
        // .greyscale() // set greyscale
        // .write('lena-small-bw.png'); // save

    for (y=0; y<image.bitmap.height; y++) {
        for (x=0; x<image.bitmap.width; x++) {
            var intValue = image.getPixelColor(x, y);
            var colorValue = Jimp.intToRGBA(intValue);
            console.log(`${[x, y]} = ${intValue} = ${JSON.stringify(colorValue)}`);
            var inverted = invert(colorValue);
            var invertedHex = Jimp.rgbaToInt(inverted.r, inverted.g, inverted.b, inverted.a);
            image.setPixelColor(invertedHex, x, y);
        }
    }

    image.write('inverted-result.png');
});