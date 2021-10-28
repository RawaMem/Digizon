import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { refreshUserThunk } from '../../store/session';
import './style.css'



export default function LoggedInNav() {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const cart = useSelector(state => state?.cart)


    const allProductsInCartList = Object.values(cart)
    let numberOfProductsInCart = allProductsInCartList.reduce((accum, ele) => {
        return accum + ele.quantity_in_cart
    }, 0)

    const userBalance = user?.balance

    useEffect(() => {
        dispatch(refreshUserThunk())


    }, [dispatch, numberOfProductsInCart])


    return(
        <div className="navbar-container">
            <div className="navbar-content-container">
                <div className="left-container">
                    <Link to='/' exact={true}>
                        <button className="navbar-btn home-btn">All Products</button>
                    </Link>
                    <Link to={`/profile/${user?.id}`} exact={true}>
                        <button className="navbar-btn btn-margin-right">Your Products</button>
                    </Link>
                </div>
                {/* <div className="searchbar-container">
                    <input type="text" className="search-bar" placeholder='Search'/>
                    <button className="search-btn">Search</button>
                </div> */}
                <div className="right-container">
                    <div className="cart-container">
                        <Link className='product-cart-link' to={`/cart`}>
                            <img src="https://www.pinclipart.com/picdir/big/485-4857762_png-file-svg-transparent-shopping-cart-icon-clipart.png" alt="" className="cart-img cart-margin-right" />
                            <p className="cart-number btn-margin-right">{numberOfProductsInCart}</p>
                        </Link>
                        <p className="user-balance btn-margin-right">Your Balance: ${user?.balance}</p>
                    </div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}
