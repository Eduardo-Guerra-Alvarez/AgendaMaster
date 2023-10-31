const { Router } = require('express');
const router = Router();
const scheduleController = require('../controllers/schedule.controller');
const verifyToken = require('../middlewares/access_token')


router.get('/', verifyToken,scheduleController.getSchedules);
router.get('/:id', scheduleController.getSchedule);
router.post('/', scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
