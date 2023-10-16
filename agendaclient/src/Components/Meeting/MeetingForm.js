import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent, editEvent } from '../../Api/meetingApi'
import { useReducer, useEffect, } from 'react';



function MeetingForm ({ dateTime, allDay, getEvent }){

    const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_MEETING':
        return { ...state, ...action.payload };
      case 'UPDATE_FORM':
            return {
                ...state,
                [action.name]: action.value
            }
      default:
        return state;
    }
  };

    const queryClient = useQueryClient()

    const closeModalEvent = () => {
        document.getElementById("modalEvent").style.display = "none"
    }

    const addEventMutation = useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            console.log("Event added successfully")
            // it used to update data in front
            queryClient.invalidateQueries('meetings')
        }
    })

    const editEventMutation = useMutation({
        mutationFn: editEvent,
        onSuccess: () => {
            console.log("Event edited successfully")
            // it used to update data in front
            queryClient.invalidateQueries('meetings')
        }
    })

    const [formData, setFormData] = useReducer(reducer, getEvent || {})

    const handleSubmit = event => {
        event.preventDefault();
        if(getEvent.edit) {
            editEventMutation.mutate({
                ...formData,
                _id: getEvent._id
            })
        } else {
            const newEvent = {
                title: formData.title,
                link: formData.link,
                comments: formData.comments,
                start: dateTime,
                allDay: allDay
            }
            addEventMutation.mutate(newEvent)
        }

        document.getElementById("title").value = ""
        document.getElementById("link").value = ""
        document.getElementById("comments").value = ""

        closeModalEvent();
    }

    const handleChange = event => {
        const {name, value} = event.target
        setFormData({
            type: 'UPDATE_MEETING',
            payload: { [name]: value },
        })
    }

    useEffect(() => {
        if(Object.keys(getEvent).length !== 0) {
            setFormData({
                type: 'UPDATE_MEETING',
                payload: getEvent
            })
        } else {
            setFormData({
                type: 'UPDATE_MEETING',
                payload: {
                    title: '',
                    link: '',
                    comments: '',
                    _id: '',
                    start: '',
                    edit: ''
                }
            })
        }
    }, [getEvent])

    return (
        <form action="" onSubmit={handleSubmit} id="formAddEvent">
            <div>
                <label htmlFor="">Titulo</label>
                <input id="title" type="text" name="title" placeholder="Please type a title" onChange={handleChange} 
                value={formData.title || ''}
                />
            </div>
            <div>
                <label htmlFor="">Link</label>
                <input id="link" name="link" type="text" placeholder="Please type link meeting" onChange={handleChange} 
                value={formData.link || ''}
                />
            </div>
            <div>
                <label htmlFor="">Descripcion</label>
                <textarea name="comments" id="comments" placeholder="Please type a comment" onChange={handleChange} 
                value={formData.comments || ''}>
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
