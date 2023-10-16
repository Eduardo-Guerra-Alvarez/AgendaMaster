import './Register.css'
import { Link } from "react-router-dom";
import { useReducer, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createParticipant } from '../../Api/userApi';
import { redirect } from 'react-router-dom';

function Login () {
    
    const [user, setUser] = useState(null)

    const reducer = (state, action) => {
        switch (action.type) {
        case 'CREATE_USER':
            return { ...state, ...action.payload };
        default:
            return state;
        }
    };

    const [formData, setFormData] = useReducer(reducer, {})

    const queryClient = useQueryClient()

    const addUserMutation = useMutation({
        mutationFn: createParticipant,
        onSuccess: ({data}) => {
            console.log(data.message)
            setUser(data.participant)
            redirect('/meetings')
            queryClient.invalidateQueries('users')
        }
    })

    const handlSubmit = e => {
        e.preventDefault();
        addUserMutation.mutate(formData)
    }

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({
            type: 'CREATE_USER',
            payload: { [name]: value }
        })
    }

    return(
        <>
        <div className="container-register">
            <main>
                <div className="formulario-register">
                <h1>Registrar</h1>
                    <form onSubmit={handlSubmit}>
                        <div>
                            <label>Nombre</label>
                            <input id="name" name="name" type="text" placeholder="Introduce Nombre completo" 
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input id="email" name='email' type="email" placeholder="Introduce un correo electronico" 
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Télefono</label>
                            <input id="phone" name='phone' type="number" placeholder="Introduce un numero télefonico" 
                            onChange={handleChange}/>
                        </div>

                        <div>
                            <label>Contraseña</label>
                            <input id="password" name='password' type="password" placeholder="Introduce una contraseña" 
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="submit">Registrar</button>
                        </div>
                        <Link to="/login">Iniciar Sesión</Link>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
} 

export default Login
