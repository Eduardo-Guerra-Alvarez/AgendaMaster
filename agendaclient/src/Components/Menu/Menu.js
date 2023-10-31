import './Menu.css'
import { Outlet, Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

function Menu() {

    const cookie = new Cookies()

    const hamburger = () => {
        const navBar = document.querySelector('.menu-bar')
        navBar.classList.toggle("active")
    }

    const handleToken = () => {
        cookie.remove('user')
    }

    return(
        <>
        <header>
            <div className="logo">Agen<span>da.com</span></div>
            <div className="hamburger" onClick={hamburger}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <nav className="menu-bar">
                <ul className="menu">
                    <li><Link to={"meetings"}>Meetings</Link></li>
                    <li><Link to={"users"}>Users</Link></li>
                    <li><Link to={"login"} onClick={handleToken}>Logout</Link></li>
                </ul>
            </nav>
        </header>
            <div id="detail">
            <Outlet />
        </div>
        </>
    )
}

export default Menu
