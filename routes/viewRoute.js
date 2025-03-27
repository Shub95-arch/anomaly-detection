const express = require('express');
const router = express.Router();

const viewController = require('../controller/viewsController');

router.get('/', viewController.getIndex);

module.exports = router;
