import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import './Meeting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvents, deleteEvent } from '../../Api/meetingApi'
import MeetingForm from './MeetingForm'
import  moment from 'moment'

function Meeting () {

    const queryClient = useQueryClient()

    const [dateTime, setDateTime] = useState({})

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            console.log("event deleted successfully");
            queryClient.invalidateQueries('mettings')
        }
    })

    const handleDelete = (id) => {
        deleteEventMutation.mutate(id)
    }

    // useQuery get the events
    const { data: events, isLoading, isError, error } = useQuery({ 
        queryKey: ['meetings'], 
        queryFn: getEvents,
        //select:
    })

    // Checking if is loading or get an error
    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error: {error.message}</div>


    // Get the modal
    let modal = document.getElementById("myModal")
    let modalEvent = document.getElementById("modalEvent")
    // Get the close modal

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none"
    }

    const closeModalEvent = () => {
        document.getElementById("modalEvent").style.display = "none"
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        } else if (event.target === modalEvent) {
            modalEvent.style.display = "none"
        }
    }


    const showModal = () => {

        document.getElementById("myModal").style.display = "block"
    }

    const showModalEvent = () => {
        document.getElementById("modalEvent").style.display = "block"
        closeModal()
    }

    const showEvents = () => {
        const eventsByDate = events.data.filter(ev => moment(dateTime.dateStr).format("YYYY-MM-D") === moment(ev.start).format("YYYY-MM-D"))
        return eventsByDate.map(({_id, title, start, link}) => (
            <tr key={_id}>
                <td>{title}</td>
                <td>{moment(start).format('D-MM-YYYY')}</td>
                <td>{link}</td>
                <td>
                    <ul>
                        <li>Luis Jimenez</li>
                        <li>Mario Ramirez</li>
                        <li>Juan</li>
                    </ul>
                </td>
                <td>
                    <button className="trash" onClick={() => handleDelete(_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        ))
    }

    return(
        <>
            <div className="container-meeting">
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <FontAwesomeIcon icon={faXmark} className="close"
                                onClick={closeModal}
                            />
                            <h2>Eventos</h2>
                        </div>
                        <div className="modal-body">
                            <div className="wrap-table">
                                <table className="tableEvents">
                                    <thead>
                                        <tr>
                                            <th>Titulo</th>
                                            <th>Fecha Inicio</th>
                                            <th>Link</th>
                                            <th>Participantes</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { showEvents() }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={showModalEvent} id="createEvent">Crear evento</button>
                            <button onClick={closeModal}>Cerrar</button>
                        </div>
                    </div>
                </div>
                <div id="modalEvent" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <FontAwesomeIcon icon={faXmark} className="close"
                                onClick={closeModalEvent}
                            />
                            <h2>Crear un Nuevo Evento</h2>
                        </div>
                        <div className="modal-body">
                            <div className="center">
                                <MeetingForm dateTime={ dateTime.dateStr } allDay={ dateTime.allDay }/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button form="formAddEvent">Crear</button>
                            <button onClick={closeModalEvent}>Cerrar</button>
                        </div>
                    </div>
                </div>
                
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
                    dateClick={(event) => { setDateTime(event); console.log(event); showModal()}}
                />
            </div>
            
        </>
    )
}

export default Meeting
