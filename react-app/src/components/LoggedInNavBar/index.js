import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function LoggedInNav() {
    // const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)


    return(
        <div className="navbar-container">
            <div className="left-container">
                <Link to='/' exact={true}>
                    Home
                </Link>
            </div>
            <div className="searchbar-container">
                <input type="text" className="search-bar" placeholder='Search'/>
                <button className="search-btn">Search</button>
            </div>
            <div className="right-container">
                <Link to={`/profile/${user?.id}`} exact={true}>
                    Profile
                </Link>
                <LogoutButton />
            </div>
        </div>
    )
}
