const { Client } = require('pg');
const Cursor = require('pg-cursor');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ikea',
  password: 'templars',
  port: 5432,
});

client.connect();

const query = `
CREATE TABLE productSizes (
  id INT NOT NULL PRIMARY KEY,
  title VARCHAR
);

DROP TABLE IF EXISTS singleSizeSchema;
CREATE TABLE singleSizeSchema (
  id INT NOT NULL PRIMARY KEY,
  productSizes_id int NOT NULL,
  name VARCHAR,
  size VARCHAR,
  unit VARCHAR,
  FOREIGN KEY (productSizes_id) REFERENCES productSizes(id) ON DELETE CASCADE
)
`;

client
  .query(query)
  .then(res => {
    console.log('Table is successfully created');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });