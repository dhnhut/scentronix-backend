import { Request, Response, NextFunction } from 'express';

var express = require('express');
var router = express.Router();

var serverResolver = require('../libs/server-resolver');

/* GET home page. */
router.get('/', function (_req: Request, res: Response, next: NextFunction) {
  res.render('index', {
    title: 'Express',
    server: JSON.stringify(serverResolver(),null, 4),
  });
});

module.exports = router;
