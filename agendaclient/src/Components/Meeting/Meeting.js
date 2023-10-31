import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import './Meeting.css'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '../../Api/meetingApi'
//import { getParticipants } from '../../Api/userApi'
import ModalTableEvents from './ModalTableEvents';
import ModalEvents from './ModalEvents';

function Meeting () {


    const [dateTime, setDateTime] = useState({})
    const [getEvent, setGetEvent] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    // useQuery get the events
    const { data: events, isLoading, isError, error } = useQuery({ 
        queryKey: ['meetings'], 
        queryFn: getEvents,
        onError: error => {
            console.log(error.response.data)
        }
        //select:
    })


    const handleEdit = (eventEdit) => {
        setIsEdit(true)
        setGetEvent({
            ...eventEdit
        });
    }

    const handleIsEdit = (edit) => {
        setIsEdit(edit)
    }
    
    // Checking if is loading or get an error
    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>

    // Get the modal
    let modal = document.getElementById("myModal")
    let modalEvent = document.getElementById("modalEvent")

    window.onclick = function(event) {
        handleIsEdit(false)
        if (event.target === modal) {
            modal.style.display = "none";
        } else if (event.target === modalEvent) {
            modalEvent.style.display = "none"
        }
    }

    const showModal = () => {
        document.getElementById("myModal").style.display = "block"
    }

    return(
        <>
            <div className="container-meeting">
                <ModalTableEvents events={events} dateTime={dateTime} handleEdit={handleEdit}/>
                <ModalEvents dateTime={dateTime} isEdit={isEdit} getEvent={getEvent} handleIsEdit={handleIsEdit} /> 
                <FullCalendar
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                    start: 'dayGridMonth,timeGridWeek,timeGridDay', // will normally be on the left. if RTL, will be on the right
                    center: 'title',
                    end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
                    }}
                    timeZone={"local"}
                    height={"80vh"}
                    events={events.data}
                    selectable={true}
                    locale={"es"}
                    dateClick={(event) => { setDateTime(event); showModal()}}
                />
            </div>
        </>
    )
}

export default Meeting
