import axios from 'axios'

const usersApi = axios.create({
    baseURL: 'http://localhost:4000/api/participant',
    headers: {
        "Content-type": "application/json"
    }
})

export const getParticipants = async () => {
    return await usersApi.get('/')

}

export const getParticipant = async (id) => {
    return await usersApi.get('/' + id)
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
