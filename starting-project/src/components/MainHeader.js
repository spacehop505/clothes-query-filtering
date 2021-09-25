import { Link, NavLink } from 'react-router-dom';
import './MainHeader.css';
const MainHeader = () => {
    return (
        <header className='header'>

            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName='active' to='/welcome'>welcome</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/products'>products</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
};


export default MainHeader;