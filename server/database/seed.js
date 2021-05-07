const mongoose = require('mongoose');
const db = require('./database.js');
const models = require('./databaseModels.js');
const productSizes = models.productSizes;
const generateSeedData = require('./generateSeedData.js');
const dbname = process.env.NODE_ENV === 'test' ? 'ikea-test' : 'ikea';
const host = process.env.DB_HOST_ENV === 'docker' ? 'mongo:27017' : 'localhost';


/* Data Insertion */

const seedDBAsync = async (callback) => {
  console.log(`Connecting to DB mongodb://${host}/${dbname}`)
  await mongoose.connect(`mongodb://${host}/${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(async () => {
    let entries = [];
    for (let i = 1; i <= 10000000; i++) {
      var data = generateSeedData(i);
      entries.push(data);
      if (entries.length === 100000) {
        await productSizes.insertMany(entries);
        console.log(`${i} entries saved`);
        entries = [];
      }
    }
  })
  .catch(err => console.error(err))
  .then(() => mongoose.disconnect());
}
//   models.productSizes.deleteMany();
//   const data = await generateSeedData();
//   db.setProductSizesAsync(data)
//     .then((results) => {
//       // console.log(results);
//     })
//     .catch(err => console.error(err))
//     .then(() => mongoose.disconnect());
// }

seedDBAsync(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Database has been seeded!');
  }
})