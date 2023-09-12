import axios from 'axios'

const meetingsApi = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {
        "Content-type": "application/json"
    }
})

export const getEvents = async () => {
    return await meetingsApi.get('/schedule')
}

export const createEvent = async (event) => {
    await meetingsApi.post('/schedule', event)
}
