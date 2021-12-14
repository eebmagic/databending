var getPixels = require("get-pixels")
var fs = require('fs');

getPixels("image.jpg", function(err, pixels) {
  if(err) {
    console.log("Bad image path")
    return
  }
  // console.log("got pixels", pixels.shape.slice())
  console.log(pixels.data);
  console.log(`Length of Buffer: ${pixels.data.length}`);
  console.log(pixels.data.slice(4, 16).toString());

  var all = fs.createWriteStream('out.txt');
  // var stride = 4;
  // for (i=0; i<pixels.data.length/stride; i++) {
  //   if (i % 1000000 == 0) {
  //       console.log(`${i}/${pixels.data.length/stride}`);
  //   }
  //   var buffer = new Buffer( new Uint8Array(pixels.data.slice(i*stride, (i+1)*stride)) );
  //   all.write(buffer);
  // }
  // for (i=0; i<pixels.data.length; i++) {
  //   if (i % 1000000 == 0) {
  //       console.log(`${i}/${pixels.data.length}`);
  //   }
  //   var buffer = new Buffer( new Uint8Array(pixels.data[i]) );
  //   all.write(buffer);
  // }
  all.write(new Buffer( new Uint8Array(5) ));
  all.end();
})