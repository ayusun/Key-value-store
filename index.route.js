const express = require('express');
const kvaRoutes = require('./server/KVA/kva.route');
const swaggerSpec = require('./server/utils/swagger');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount kva routes at /object
router.use('/object', kvaRoutes);

//swagger-doc
router.get('/swagger.json', (req, res) => {
  res.json(swaggerSpec);
});

module.exports = router;
