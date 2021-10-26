import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProductFromCartThunk, getCartDetails } from '../../store/cart';
import { getAllProducts, getProductDetails } from '../../store/products';
import { CartEdit } from '../CartEdit';
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

    // const [edittedQuantity, setEdittedQuantity] = useState();


    let productsInCartList = []



    let stockQuantity = []
    allProductsInCartList.forEach(product => {
        let tempArr = []
        for (let i = 1; i <= product?.stock_quantity; i++) {
            tempArr.push(i)
        }
        stockQuantity.push(tempArr)
    })

    const handleRemoveFromCart = async(e) => {
        e.preventDefault();
        const payload = {
            productId: e.target.id
        };
        // console.log('=========@@@@@>', payload)
        dispatch(deleteProductFromCartThunk(payload))
    }


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getCartDetails(user?.id))

    }, [dispatch, productsInCartList.length])




    return(

        <div className="cart-page-container">
            <h3 className="cart-title">Cart</h3>
            <div className="products-in-cart-container">
                {allProductsInCartList.map((product, i) => {
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
                                <CartEdit product={product} />
                                {/* <form onSubmit={handleEditQunatity}>
                                    <div className="edit-quantity-container">
                                        <select value={product.quantity_in_cart} onChange={(e) => setAddQuantity(e.target.value)}>
                                            {stockQuantity?.map(quantity => {
                                                return (
                                                    <option value={quantity}>{quantity}</option>
                                                )
                                            })}
                                        </select>
                                        <button type='submit' className="add-to-cart-submit">Edit Quantity</button>

                                    </div>
                                </form> */}
                            </div>
                            <div className="delete-btn-container">
                                <button className="cart-product-delete-btn" id={product.id} onClick={handleRemoveFromCart}>Remove Product</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )


}
