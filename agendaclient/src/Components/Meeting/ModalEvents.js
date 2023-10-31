import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import MeetingForm from './MeetingForm'

function ModalEvents ({ dateTime, isEdit, getEvent, handleIsEdit}) {
    const closeModalEvent = () => {
        if(isEdit) handleIsEdit(false)
        document.getElementById("modalEvent").style.display = "none"
        document.getElementById("title").value = ""
        document.getElementById("link").value = ""
        document.getElementById("comments").value = ""
    }

    return(
        <>
                <div id="modalEvent" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <FontAwesomeIcon icon={faXmark} className="close"
                                onClick={closeModalEvent}
                            />
                            <h2>{isEdit ? "Editar" : "Crear"} un Nuevo Evento</h2>
                        </div>
                        <div className="modal-body">
                            <div className="center">
                                <MeetingForm 
                                dateTime={ dateTime.dateStr } 
                                allDay={ dateTime.allDay } 
                                getEvent={ isEdit ? getEvent : {}
                                }/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button form="formAddEvent">{isEdit ? "Editar" : "Crear"}</button>
                            <button onClick={closeModalEvent}>Cerrar</button>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default ModalEvents
