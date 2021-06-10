const fs = require('fs');
const generateSeedData = require('./generateSeedData.js');
const productsWritePath = 'server/database/__data__/products.csv';
const sizesWritePath = 'server/database/__data__/sizes.csv';

var sizes = [];

const writeProductsCSV = async (writer, encoding, callback) => {
  let i = 10000000;
  let id = 0;
  const write = function () {
    // return new Promise ((resolve, reject) => {
    //   try {
    //     resolve(() => {

          let ok = true;
          do {
            i -= 1;
            id += 1;
            var data = generateSeedData(id);
            if (data.sizes) {
              data.sizes.forEach(size => sizes.push(size));
            }
            var productInfo = `${data.title},${data.id}\n`;
            if (i === 0) {
              writer.write(productInfo, encoding, callback);
            } else {
              // see if we should continue, or wait
              // don't pass the callback, because we're not done yet.
              ok = writer.write(productInfo, encoding);
              console.log('ok', ok);
            }
          } while (i > 0 && ok);
            if (i > 0) {
            // had to stop early!
            // write some more once it drains
            writer.once('drain', write);
            }
          // });
    //   } catch (err) {
    //     return reject(err);
    //   }
    // });
  };

  write();
  // for (var j = 1; j <= 10; j++) {
  //    await write()
  //   // .then( async (write) => {
  //   //   await write();
  //   //   // i = 1000000
  //   //   i = 1000;
  //   //   console.log(result);
  //   // })
  //   // .catch((err) => console.log(err));

  //   // i = 1000000;


  // }

};

const writeProducts = fs.createWriteStream(productsWritePath, { flags: 'a' });
writeProducts.write('title,id\n', 'utf8');
writeProductsCSV(writeProducts, 'utf-8', () => {
  writeProducts.end();
})
  .then((data) => {
    console.log(data);
    // const writeSizes = fs.createWriteStream(sizesWritePath);
    // writeSizes.write('productSizesId,name,unit,size\n', 'utf8');

    // writeSizesCSV(writeSizes, 'utf-8', () => {
    // writeSizes.end();
    // });
  })
  .catch((err) => {
    console.log(err);
  })

// const writeSizesCSV = async (writer, encoding, callback) => {
//   // const writeProducts = fs.createWriteStream(productsWritePath);
//   // writeProducts.write('title,id\n', 'utf8');
//   // await writeProductsCSV(writeProducts, 'utf-8', (err) => {
//   //   if (err) {
//   //     console.log(err);
//   //   }
//   //   writeProducts.end();
//   // });

//   let i = sizes.length;
//   const write = function () {
//     let ok = true;
//     do {
//       i -= 1;
//       var size = sizes[i];
//       var sizeInfo = `${size.productSizesId},${size.name},${size.unit},${size.size}\n`;
//       if (i === 0) {
//         writer.write(sizeInfo, encoding, callback);
//       } else {
//         ok = writer.write(sizeInfo, encoding);

//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       console.log('size drain');
//       writer.once('drain', write);
//     }

//   };
//   write();
// };

