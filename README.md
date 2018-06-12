# KVA Store 

## Overview

A version controlled key-value store with a HTTP API

TECH USED
- Node Js with express
- MongoDB for DB
- Swagger for Documentation

## Getting Started


Install yarn:
```js
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

Set environment (vars):
```sh
cp .env.example .env
```

Start server:
```sh
# Start server
yarn start
```


Swagger UI Can be accessed from
```
http://localhost:4040/swagger/
```

DEMO
```
https://kva-store.herokuapp.com/swagger/
```


Tests:
```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```


