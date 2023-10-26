const participantController = require('../controllers/participant.controller')
const { Router } = require('express')
const router = Router();


router.get('/', participantController.getParticipants);
router.get('/:id', participantController.getParticipant);
router.post('/', participantController.createParticipant);
router.post('/login', participantController.loginParticipant);
router.put('/:id', participantController.updateParticipant);
router.delete('/:id', participantController.deleteParticipant);

module.exports = router
