var im = require('imagemagick');
im.readMetadata('image.jpg', function(err, metadata){
  if (err) throw err;
  console.log(`Shot at: ${metadata.exif.dateTimeOriginal}`);
})

im.identify('image.jpg', function(err, features){
  if (err) throw err;
  console.log(features);
  // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
});
