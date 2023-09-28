import axios from 'axios'

const meetingsApi = axios.create({
    baseURL: 'http://localhost:4000/api/schedule',
    headers: {
        "Content-type": "application/json"
    }
})

export const getEvents = async () => {
    return await meetingsApi.get('/')
}

export const createEvent = async (event) => {
    console.log(event)
    await meetingsApi.post('/', event)
}

export const deleteEvent = async (id) => {
    await meetingsApi.delete('/' + id)
}

export const editEvent = async (event) => {
    await meetingsApi.put('/' + event._id, event)
}
