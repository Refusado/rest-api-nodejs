const router  = require('express').Router();
const PersonController = require('../controllers/PersonController');
const Person = require('../models/Person');

router.post('/person', PersonController.create);
router.get('/person', PersonController.read);
router.get('/person/:id', PersonController.read);
router.patch('/person/:id', PersonController.update);

module.exports = router;