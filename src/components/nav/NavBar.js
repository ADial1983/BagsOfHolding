import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import logo from "./Images/BoH_Logo.png"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/bags">My Bags</Link>
            </li>
            <li>
                <img className="logo" src={logo} onClick={() => navigate("/")}/>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("bags_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

