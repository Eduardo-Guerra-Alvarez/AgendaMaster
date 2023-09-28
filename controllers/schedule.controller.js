const Schedule = require("../models/schedule")

const scheduleController = {};

scheduleController.createSchedule = async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        await schedule.save();
        if(!schedule) {
            console.log("Schedule not created")
            res.status(404).json({ message: 'Schedule not created'})
            return;
        }
        res.status(200).json({ message: 'Schedule created successfully' });

    } catch( err ){
        console.log(err)
        res.status(404).json({ message: 'Schedule not created'})
    }
}

scheduleController.getSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({})
            .populate('participants');
        if(!schedules) {
            console.log("Schedules not found");
            res.status(404).json({ message: 'Schedule not found' });
            return;
        }
        res.status(200).json(schedules);
    } catch (err){
        console.log(err);
        res.status(404).json({ message: 'Schedule not found' });
    }
}
scheduleController.getSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id)
            .populate('participants');
        if(!schedule) {
            console.log("Schedules not found");
            res.status(404).json({ message: 'Schedule not found' });
            return;
        } 
        res.status(200).json(schedule);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: 'Schedule not found' });
    }
}
scheduleController.updateSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body);
        if(!schedule) {
            console.log("Schedule not updated")
            res.status(404).json({ message: 'Schedule not updated'})
            return;
        }
        res.status(200).json({ message: 'Schedule updated successfully' });

    } catch( err ){
        console.log(err)
        res.status(404).json({ message: 'Schedule not updated'})
    }

}
scheduleController.deleteSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if(!schedule) {
            console.log("Schedule not deleted")
            res.status(404).json({ message: 'Schedule not deleted'})
            return;
        }
        res.status(200).json({ message: 'Schedule deleted successfully' });

    } catch( err ){
        console.log(err)
        res.status(404).json({ message: 'Schedule not deleted'})
    }
}

module.exports = scheduleController;
