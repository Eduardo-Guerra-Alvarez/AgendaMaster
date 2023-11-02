import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createEvent, editEvent } from '../../Api/meetingApi'
import { useReducer, useEffect, useState } from 'react';
import { getParticipants } from '../../Api/userApi';



function MeetingForm ({ dateTime, allDay, getEvent, isOpen}){

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
        document.getElementById("myModal").style.display = "none"
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
                allDay: allDay,addEventMutation,
                participants: formData.participants

            }
            addEventMutation.mutate(newEvent)
        }

        document.getElementById("title").value = ""
        document.getElementById("link").value = ""
        document.getElementById("comments").value = ""
        document.getElementById("participants").value = []

        closeModalEvent();
    }

    const handleChange = event => {
        let name, value
        if(event.target.name !== 'participants') {
            name = event.target.name
            value = event.target.value
        } else {
            name = event.target.name
            value = Array.from(event.target.selectedOptions, option => option.value)
        }
        setFormData({
            type: 'UPDATE_MEETING',
            payload: { [name]: value },
        })

    }

    useEffect(() => {
        console.log(getEvent)
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
                    edit: '',
                    participants: []
                }
            })
        }
    }, [getEvent])

    const {data: participants, isLoading, isError, error } = useQuery({
        enabled: isOpen,
        queryFn: getParticipants,
        queryKey:['participants'],
        onError: (error) => { console.log(error) }
    })

    if(isLoading) return <div>Loading...</div>
    else if(isError) return <div>{error}</div>

    const renderParticipantSelect = () => {
        return participants.data.map(participant => (
            <option id={participant._id} value={participant._id} key={participant._id}>{participant.name}</option>
        ))
    }


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
                <select id="participants" name="participants" className="selectUsers" multiple onChange={handleChange}
                    value={ formData.participants || []}>
                    { renderParticipantSelect() }
                </select>
            </div>
        </form>
    )
}

export default MeetingForm
