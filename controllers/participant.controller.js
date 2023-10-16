const Participant = require('../models/participant')
const Schedule = require('../models/schedule')

const participantController = {}

participantController.getParticipants = (req, res) => {
    Participant.find({})
        .then(data => {
        if(!data) return res.status(404).json({message: 'Participants not found'})
        return res.status(200).json(data)
    }).catch(err => {
        console.log(err)
        return res.status(404).json({ message: err })
    });

}

participantController.getParticipant = (req, res) => {
    Participant.findById(req.params.id)
        .then(async data => {
        if(!data) return res.status(404).json({message: 'Participant not found'})
            const schedules = await Schedule.find({ participants: data._id.toString() })
            // Transform data to JSON to manipulate the object
            const value = data.toJSON()
            value.schedules = schedules
        return res.status(200).json(value)
    }).catch(err => {
        console.log(err)
        return res.status(404).json({ message: err })
    });

}

participantController.createParticipant = async(req, res) => {
    const participant = new Participant(req.body)
    await participant.save()
    if(!participant) {
        console.log(err);
        return res.status(404).json({ message: 'Participant not created, error: ' + err })
    }
    return res.status(200).json({ participant: participant, message: 'Participant created successfully'})
}

participantController.updateParticipant = (req, res) => {
    Participant.findByIdAndUpdate(req.params.id, req.body.participant)
        .then( data => {
            return res.status(200).json({ message: 'Participant updated successfully' })
        }
        ).catch(err => {
            console.log(err);
            return res.status(404).json({ message: 'Participant not updated, error: ' + err })
        })
}

participantController.deleteParticipant = (req, res) => {
    Participant.findByIdAndDelete(req.params.id).
        then(data => {
            return res.status(200).json({ message: "Participant deleted successfully"})
        }).catch(err => {
            return res.status(404).json({ message: "Participant not deleted, error: " + err})
        })
}


module.exports = participantController
