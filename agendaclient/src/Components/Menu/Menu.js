import './Menu.css'
import { Outlet, Link } from 'react-router-dom'

function Menu() {

    const hamburger = () => {
        const navBar = document.querySelector('.menu-bar')
        navBar.classList.toggle("active")
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
                    <li><Link to={"login"}>Logout</Link></li>
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
