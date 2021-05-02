# Vikea

A mock-up of Ikea's item details page. This repo is a module of the "Product Size" section.

## Related Projects

  - https://github.com/IKEA-Vikings/josh-service-reviews
  - https://github.com/IKEA-Vikings/vbao-others-also-viewed
  - https://github.com/IKEA-Vikings/phucci-service-1
  - https://github.com/IKEA-Vikings/kim-service-1

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)
1. [Database](#database)

## Usage

This repo provides front end components for the Product Size module of Ikea's item detail page. Includes API to the product size service.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB `mongodb-community@4.4`

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Seed Database

From within the root directory:

```sh
npm run seed
```

This script will run a seeding script to insert 100 records into a new Mongo database called `ikea` within a collection called `productsizes`.

Prior to running the seeding script locally, be sure the Mongo server is started.

```sh
brew services start mongodb-community@4.4
```

### Transpile React

From within the root directory in its own terminal:

```sh
npm run build
```

This script will transpile updates made to files within the `./client` folder to the `./public` folder. This script will continually watch for changes.

### Run Tests

Test scripts will test the database, API, client, and seeding script via Jest and will show coverage of the tests in the terminal.

Prior to running the test be sure the local Mongo server is started. And that the API server is started as well.

```sh
brew services start mongodb-community@4.4
```

From within the root directory:

```sh
npm start
```

In a separate terminal window, from within the root directory:

```sh
npm run test
```

## API

API               | Description
------------------|----------------------------------------------
**Functionality** | Retrieves product's sizes.
**Endpoint/Path** | `api/sizes/:id`
**Verb**          | GET

### Request/Response

```javascript
/* Sample Request */
$.get('api/sizes/1', (data) => { ... });

/* Sample Response */
{
  id: 1,
  title: '45x25"'
  sizes: [
    {
      name: 'Height',
      size: '45',
      unit: 'in'
    },
    {
      name: 'Width',
      size: '25',
      unit: 'in'
    },
    {
      name: 'Max. load',
      size: '200',
      unit: 'lb'
    }
  ]
}
```
**Functionality** | Retrieves product's sizes.
**Endpoint/Path** | `api/sizes/`
**Verb**          | POST

### Request/Response

```javascript
/* Sample Request */
$.post('api/sizes/', (data) => { ... });

/* Sample Request */
{
  id: 1,
  title: '33x20"'
  sizes: [
    {
      name: 'Height',
      size: '33',
      unit: 'in'
    },
    {
      name: 'Width',
      size: '20',
      unit: 'in'
    },
    {
      name: 'Max. load',
      size: '100',
      unit: 'lb'
    }
  ]
}
```
**Functionality** | Retrieves product's sizes.
**Endpoint/Path** | `api/sizes/:id`
**Verb**          | PUT

### Request/Response

```javascript
/* Sample Request */
$.put('api/sizes/1', (data) => { ... });

/* Sample Response */
{
  id: 1,
  title: '45x25"'
  sizes: [
    {
      name: 'Height',
      size: '45',
      unit: 'in'
    },
    {
      name: 'Width',
      size: '25',
      unit: 'in'
    },
    {
      name: 'Max. load',
      size: '200',
      unit: 'lb'
    }
  ]
}
```
**Functionality** | Retrieves product's sizes.
**Endpoint/Path** | `api/sizes/:id`
**Verb**          | DELETE

### Request/Response

```javascript
/* Sample Request */
$.delete('api/sizes/1', (data) => { ... });

## Database

Schema utilizing mongoDB via Mongoose

```javascript

const singleSize = new Schema({
  name: String,
  size: String,
  unit: String
});

const productSizes = new Schema({
  id: Number,
  title: String,
  sizes: {
    type: [singleSize],
    default: undefined
  }
});
```
