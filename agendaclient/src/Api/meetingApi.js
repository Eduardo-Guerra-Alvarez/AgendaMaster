import axios from 'axios'
import Cookies from 'universal-cookie'

const cookie = new Cookies()
const token = cookie.get('user')?.token 
const meetingsApi = axios.create({
    baseURL: 'http://localhost:4000/api/schedule',
    headers: {
        "Content-type": "application/json", 
        Authorization: `Bearer ${token}`
    }
})

export const getEvents = async () => {
    return await meetingsApi.get('/')
}

export const createEvent = async (event) => {
    await meetingsApi.post('/', event)
}

export const deleteEvent = async (id) => {
    await meetingsApi.delete('/' + id)
}

export const editEvent = async (event) => {
    await meetingsApi.put('/' + event._id, event)
}
