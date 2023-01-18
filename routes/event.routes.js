const router = require('express').Router();
const EventController = require('../controllers/EventController');

router.post('/event', EventController.create);
router.get('/event', EventController.read);
router.get('/event/:id', EventController.read);
router.patch('/event/:id', EventController.update);
router.delete('/event/:id', EventController.delete);

module.exports = router;