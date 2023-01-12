const router  = require('express').Router();
const PersonController = require('../controllers/PersonController');

router.post('/person', PersonController.create);

module.exports = router;