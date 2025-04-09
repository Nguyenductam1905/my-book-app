import '../layout/header.css'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>

            {/* <li><a href="">About</a></li> */}
        </ul>

    )
}

export default Header