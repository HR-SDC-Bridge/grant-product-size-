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
    id SERIAL,
  title VARCHAR,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS singleSizeSchema;
CREATE TABLE singleSizeSchema (
  id serial,
  productSizes_id int NOT NULL,
  name VARCHAR,
  size VARCHAR,
  unit VARCHAR,
  PRIMARY KEY (id),
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