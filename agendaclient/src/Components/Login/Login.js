import './Login.css'
import { Link, useNavigate} from "react-router-dom";
import { getParticipantLogin } from '../../Api/userApi'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {useReducer} from 'react';
import Cookies from 'universal-cookie'


function Login () {

    const cookie = new Cookies();

    const reducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return { ...state, ...action.payload }
            default:
                return state;
        }
    }

    const [formData, setFormData] = useReducer(reducer, {})

    const navigate = useNavigate()

    const loginUserMutation = useMutation({
        mutationFn: getParticipantLogin,
        onSuccess: ({data}) => {
            console.log(data.token)
            cookie.set('user', JSON.stringify(data), { path: '/' })
            navigate("/meetings")
        },
        onError: (error) => {
            console.log(error.response.data)
        }
    })

    const handlSubmit = e => {
        e.preventDefault()
        loginUserMutation.mutate(formData)
    }

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({
            type: 'LOGIN',
            payload: { [name]: value }
        })
    }

    return(
        <>
        <div className="container-login">
            <main>
                <div className="formulario-login">
                <h1>Login</h1>
                    <form onSubmit={handlSubmit}>
                        <div>
                            <label>Email</label>
                            <input type="email" 
                            name="email"
                            placeholder="Introduce un correo electronico" 
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input type="password" 
                            name="password"
                            placeholder="Introduce una contraseña" 
                            onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                        <Link to="/Register">Crear una cuenta</Link>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
} 

export default Login
