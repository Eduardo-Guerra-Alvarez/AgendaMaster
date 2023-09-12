import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent } from '../../Api/meedingApi'
import { useReducer } from 'react';

function MeetingForm ({ dateTime }){

    const queryClient = useQueryClient()

    const closeModalEvent = () => {
        document.getElementById("modalEvent").style.display = "none"
    }

    const addEventMutation = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            console.log("Product added successfully")
            // it used to update data in front
            queryClient.invalidateQueries('meetings')
        }
    })

    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {})

    const handleSubmit = event => {
        event.preventDefault();
        const newEvent = {
            title: formData.title,
            link: formData.link,
            commit: formData.commit,
            start: dateTime
        }

        console.log(newEvent)

        addEventMutation.mutate(newEvent)

        document.getElementById("title").value = ""
        document.getElementById("link").value = ""
        document.getElementById("commit").value = ""

        closeModalEvent();
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    return (
        <form action="" onSubmit={handleSubmit} id="formAddEvent">
            <div>
                <label htmlFor="">Titulo</label>
                <input id="title" type="text" name="title" placeholder="Please type a title" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Link</label>
                <input id="link" name="link" type="text" placeholder="Please type link meeting" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Descripcion</label>
                <textarea name="commit" id="commit" placeholder="Please type a comment" onChange={handleChange}>

                </textarea>
            </div>
            <div>
                <label>Selecciona participantes</label>
                <select id="users" name="users" className="selectUsers" multiple>
                    <option value="">Luis</option>
                    <option value="">Mario</option>
                    <option value="">Jimeno</option>
                </select>
            </div>
        </form>
    )
}

export default MeetingForm
