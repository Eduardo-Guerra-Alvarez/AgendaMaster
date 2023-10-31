import axios from 'axios'
import Cookies from 'universal-cookie'

const cookie = new Cookies()
const usersApi = axios.create({
    baseURL: 'http://localhost:4000/api/participant',
    headers: {
        "Content-type": "application/json"
    }
})

export const getParticipants = async () => {
    return await usersApi.get('/', {
        headers: {
            Authorization: `${cookie.get('user')}`
        }
    })

}

export const getParticipant = async (id) => {
    return await usersApi.get('/' + id)
}

export const getParticipantLogin = async (user) => {
    return await usersApi.post('/login', user)
}

export const createParticipant = async (participant) => {
    return await usersApi.post('/', participant)
}

export const updateParticipant = async (id, participant) => {
    await usersApi.put('/' + id, participant)
}
export const deleteParticipant = async (id) => {
    await usersApi.delete('/' + id)

}
