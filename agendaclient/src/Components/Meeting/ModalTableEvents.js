import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent } from '../../Api/meetingApi'
import {useState} from 'react';
import MeetingForm from './MeetingForm'

function ModalTableEvents ({events, dateTime}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [getEvent, setGetEvent] = useState({})

    const queryClient = useQueryClient();

    const deleteEventMutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            console.log("event deleted successfully");
            queryClient.invalidateQueries('mettings')
        },
        onError: (error) => {
            console.log(error.response.data);
        }
    })
    const handleDelete = (id) => {
        deleteEventMutation.mutate(id)
    }

    const handleEdit = (eventEdit) => {
        console.log(eventEdit)
        setIsEdit(true)
        setGetEvent({
            ...eventEdit,
        });
    }

    const handleCreate = () => {
        setIsOpen(true)
    }

    const showEvents = () => {
        const eventsByDate = events.data.filter(ev => dateTime.dateStr === ev.start)

        return eventsByDate.map(({_id, title, start, link, comments, participants}) => (
            <tr key={_id}>
                <td>{title}</td>
                <td>{start}</td>
                <td>{link}</td>
                <td>
                    <ul>
                        {
                            participants.map(participant => (
                                <li key={participant._id}>{participant.name}</li>
                            ))
                        }
                    </ul>
                </td>
                <td>
                    <button className="trash" onClick={() => handleDelete(_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className="edit" onClick={() => { 
                        handleEdit({_id, title, start, link, comments, edit: true, participants: participants.map(p => p._id)}); 
                        showModalEvent(); 
                    }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        ))
    }

    const closeModal = () => {
        setIsOpen(false)
        document.getElementById("myModal").style.display = "none"
        if(isEdit) {
            setIsEdit(false)
            document.getElementById("title").value = ""
            document.getElementById("link").value = ""
            document.getElementById("comments").value = ""
        }
    }

    const showModalEvent = () => {
        setIsOpen(true)
    }

    return(
        <>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <FontAwesomeIcon icon={faXmark} className="close"
                            onClick={closeModal}
                        />
                        { isOpen && 
                            <h2>{isEdit ? "Editar" : "Crear"} un Nuevo Evento</h2>
                        }
                        { !isOpen &&
                            <h2>Eventos</h2>
                        }
                    </div>
                    <div className="modal-body">
                            {isOpen &&
                                <div className="center">
                                    <MeetingForm 
                                    dateTime={ dateTime.dateStr } 
                                    allDay={ dateTime.allDay } 
                                    getEvent={ isEdit ? getEvent : {}}
                                    isOpen={isOpen}
                                    />
                                </div>
                            }
                            {!isOpen && 
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
                            }
                    </div>
                    <div className="modal-footer">
                        { isOpen &&
                            <button form="formAddEvent">{isEdit ? "Editar" : "Crear"}</button>
                        }
                        { !isOpen &&
                            <button onClick={handleCreate} id="createEvent">Crear evento</button>
                        }
                        <button onClick={closeModal}>Cerrar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalTableEvents
