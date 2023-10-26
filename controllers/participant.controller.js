const Participant = require('../models/participant')
const Schedule = require('../models/schedule')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

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
    const isParticipant = await Participant.findOne({ email: req.body.email })

    if(isParticipant == null) {
        const saltRounds = 10

        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if(err) return res.status(404).json({ message: err }) 
            req.body.password = hash
            const participant = new Participant(req.body)
            await participant.save()
            if(!participant) {
                console.log(err);
                return res.status(404).json({ message: 'Participant not created, error: ' + err })
            }
            return res.status(200).json({ participant: participant, message: 'Participant created successfully'})

        })

        
    } else {
        return res.status(404).json({ message: 'email is already used,'})
    }

}

participantController.loginParticipant = async(req, res) => {
    const { email, password } = req.body
    const participant = await Participant.findOne({ email })
    const isPasswordCorrect = participant === null
        ? false
        : await bcrypt.compare(password, participant.password)
    if(!isPasswordCorrect) {
        return res.status(401).json({ message: 'invalid user or password' })
    }

    const participantForToken = {
        id: participant._id,
        email: participant.email
    }

    const token = jwt.sign(participantForToken, process.env.SECRET)

    return res.status(200).send({
        name: participant.name,
        email: participant.email,
        token: token
    })
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
