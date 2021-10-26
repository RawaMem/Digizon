import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartDetails } from '../../store/cart';
import { getAllProducts, getProductDetails } from '../../store/products';
import './style.css'


export const Cart = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const allProductsObj = useSelector(state => state?.products)
    const allProductsList = Object.values(allProductsObj)
    const cart = useSelector(state => state?.cart)

    const allProductsInCartList = Object.values(cart)
    let numberOfProductsInCart = allProductsInCartList.reduce((accum, ele) => {
        return accum + ele.quantity_in_cart
    }, 0)

    let productsInCartList = []


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getCartDetails(user?.id))

    }, [dispatch, productsInCartList.length])


    return(

        <div className="cart-page-container">
            <h3 className="cart-title">Cart</h3>
            <div className="products-in-cart-container">
                {allProductsInCartList.map(product => {
                    return(
                        <div className="product-in-cart-row">
                            <div className="product-cart-img-container">
                                <Link className='product-cart-card-link' to={`/products/${product?.id}`}>
                                    <img src={product?.cover_img_url} alt="" className="product-cart-img" />
                                </Link>
                            </div>
                            <div className="product-cart-description">
                                <Link className='product-cart-card-link' to={`/products/${product?.id}`}>
                                    <p className="product-name">{product?.name}</p>
                                </Link>
                                <p className="product-description">{product?.description}</p>
                            </div>
                            <div className="product-cart-edit-container">

                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )


}
