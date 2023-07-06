import './Login.css'
import { Link } from "react-router-dom";

function Login () {
    return(
        <>
        <div class="container-login">
            <main>
                <div class="formulario-login">
                <h1>Login</h1>
                    <form action="">
                        <div>
                            <label>Usuario</label>
                            <input type="email" placeholder="Introduce un correo electronico" />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input type="password" placeholder="Introduce una contraseña" />
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
