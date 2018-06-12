const express = require('express');
const paramValidation = require('./kva.validators');
const KVACtrl = require('./kva.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

/**
 * @swagger
 * /object/:
 *   post:
 *     description: Create a new Key Value Object
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *          - in: body
 *            name: Key-Value
 *            required: true
 *            description: The Key Value to create
 *            schema:
 *              type: object
 *     responses:
 *       200:
 *         description: Key Value Pair Object
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      key:
 *                          type: string
 *                          description: The key entered by user
 *                      value:
 *                          type: object
 *                          description: The value entered by the user
 *                      timestamp:
 *                          type: string
 *                          format: "date-time"
 */
  .post(paramValidation.kvaInsert, KVACtrl.createKeyValue);

/**
 * @swagger
 * /object/{key}:
 *   get:
 *     description: Get Saved Value
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: key value with which data is stored
 *         in: path
 *         required: true
 *         type: string
 *       - name: timestamp
 *         description: timestamp in epoch seconds
 *         in: query
 *         required: false
 *         type: integer 
 *     responses:
 *       404:
 *         description: Key Or Key with given time doesnot exist
 *       200:
 *         description: Key Value Pair Object
 *         content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      key:
 *                          type: string
 *                          description: The key entered by user
 *                      value:
 *                          type: object
 *                          description: The value entered by the user
 */
router.route('/:key')
  .get(KVACtrl.findByKey)



module.exports = router;
