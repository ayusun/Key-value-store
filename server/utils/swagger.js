const path = require('path');
const swaggerJSDoc =require('swagger-jsdoc');

/**
 * Swagger definition.
 */
const swaggerDefinition = {
  info: {
    title: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION
  },
  basePath: '/'
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [
    path.join(__dirname, '../KVA/kva.route.js'),
    path.join(__dirname, '/../docs/*.js'),
    path.join(__dirname, '/../docs/*.yml'),
    path.join(__dirname, '/../docs/*.yaml')
  ]
};

/**
 * Initialize swagger-jsdoc.
 */
let swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;
