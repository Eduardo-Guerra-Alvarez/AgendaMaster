import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect, useReducer } from 'react';
import './Meeting.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function Meeting () {
    const [events, setEvents] = useState([])
    const [dateTime, setDateTime] = useState("")
    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value

        }
    }

    const [formData, setFormData] = useReducer(formReducer, {})

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
    }
    

    const addEvent = event => {
        event.preventDefault();
        const newEvent = {
            title: formData.title,
            start: dateTime
        }

        const updateEvents = [...events, newEvent];
        setEvents(updateEvents)
        closeModalEvent();
        closeModal();
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })

    }

    const listEvents = () => {
        return (
            <ul>
                {
                    events.map((event, id) => {
                        <li key={id}>{event.title}</li>
                    })
                }
            </ul>
        )
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
                            <table>
                                <tr>
                                    <td>Titulo</td>
                                    <td>Fecha Inicio</td>
                                </tr>
                                <tr>
                                    {
                                        events.map(({title, start}) => (
                                            <tr>
                                                <td>{title}</td>
                                                <td>{start}</td>
                                            </tr>
                                        ))
                                    } 
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button onClick={showModalEvent} id="createEvent">Crear evento</button>
                            <button onClick={closeModal}>Close</button>
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
                                <form action="" onSubmit={addEvent} id="formAddEvent">
                                    <div>
                                        <label htmlFor="">Titulo</label>
                                        <input type="text" name="title" onChange={handleChange}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button form="formAddEvent">Crear</button>
                            <button onClick={closeModalEvent}>Close</button>
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
                    events={events}
                    selectable={true}
                    locale={"es"}
                    dateClick={(event) => { setDateTime(event.dateStr);  showModal()}}
                />
            </div>
            
        </>
    )
}

export default Meeting
