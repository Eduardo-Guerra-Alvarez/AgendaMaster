import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent } from '../../Api/meetingApi'

function ModalTableEvents ({events, dateTime, handleEdit}) {

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

    const showEvents = () => {
        const eventsByDate = events.data.filter(ev => dateTime.dateStr === ev.start)

        return eventsByDate.map(({_id, title, start, link, comments}) => (
            <tr key={_id}>
                <td>{title}</td>
                <td>{start}</td>
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
                    <button className="edit" onClick={() => { 
                        handleEdit({_id, title, start, link, comments, edit: true}); 
                        showModalEvent(); 
                    }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        ))
    }

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none"
    }

    const showModalEvent = () => {
        document.getElementById("modalEvent").style.display = "block"
        closeModal()
    }

    return(
        <>
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
        </>
    )
}

export default ModalTableEvents
