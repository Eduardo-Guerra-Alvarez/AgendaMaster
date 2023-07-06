import './Register.css'
import { Link } from "react-router-dom";

function Login () {
    return(
        <>
        <div class="container-register">
            <main>
                <div class="formulario-register">
                <h1>Registrar</h1>
                    <form action="">
                        <div>
                            <label>Nombre</label>
                            <input type="text" placeholder="Introduce Nombre completo" />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" placeholder="Introduce un correo electronico" />
                        </div>
                        <div>
                            <label>Télefono</label>
                            <input type="number" placeholder="Introduce un numero télefonico" max="10" />
                        </div>

                        <div>
                            <label>Contraseña</label>
                            <input type="password" placeholder="Introduce una contraseña" />
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
