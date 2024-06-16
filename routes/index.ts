import { Request, Response } from 'express';

var express = require('express');
var router = express.Router();

var findServer = require('../libs/find-server');

/* GET home page. */
router.get('/', async function (_req: Request, res: Response) {
  var data = await findServer();
  res.render('index', {
    title: 'Scentronix Backend Test',
    server: JSON.stringify(data, null, 4),
  });
});

module.exports = router;
