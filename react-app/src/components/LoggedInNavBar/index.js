import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



export default function LoggedInNav() {
    // const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const cart = useSelector(state => state?.cart)


    const allProductsInCartList = Object.values(cart)
    let numberOfProductsInCart = allProductsInCartList.reduce((accum, ele) => {
        return accum + ele.quantity_in_cart
    }, 0)


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
                <div className="cart-container">
                    <Link className='product-cart-link' to={`/cart`}>
                        <p className="cart">Cart: {numberOfProductsInCart}</p>
                    </Link>
                </div>
                <LogoutButton />
            </div>
        </div>
    )
}
