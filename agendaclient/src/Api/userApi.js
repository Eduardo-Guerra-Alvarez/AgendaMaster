import axios from 'axios'

const usesApi = axios.create({
    baseURL: 'http://localhost:4000/api/participant',
    headers: {
        "Content-type": "application/json"
    }
})

export const getParticipants = async () => {
    return await usesApi.get('/')

}

export const getParticipant = async (id) => {
    return await usesApi.get('/' + id)
}

export const createParticipant = async (participant) => {
    await usersApi.post('/', participant)
}

export const updateParticipant = async (id, participant) => {
    await usersApi.put('/' + id, participant)
}
export const deleteParticipant = async (id) => {
    await usersApi.delete('/' + id)

}
