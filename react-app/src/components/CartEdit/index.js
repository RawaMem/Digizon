import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editQuantityOfProductThunk, getCartDetails } from '../../store/cart';
import { getAllProducts } from '../../store/products';


export const CartEdit = ({product}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const allProductsObj = useSelector(state => state?.products)
    const allProductsList = Object.values(allProductsObj)
    const cart = useSelector(state => state?.cart)

    const allProductsInCartList = Object.values(cart)

    const [edittedQuantity, setEdittedQuantity] = useState(product.quantity_in_cart);


    let productsInCartList = []

    let stockQuantity = []
    for (let i = 1; i <= product?.stock_quantity; i++) {
        stockQuantity.push(i)
    }


    const handleEditQuantity = async(e) => {
        e.preventDefault();
        const payload = {
            productId: product.id,
            quantity: edittedQuantity
        };
        // console.log('=========@@@@@>', payload)
        dispatch(editQuantityOfProductThunk(payload))
    }


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getCartDetails(user?.id))

    }, [dispatch, productsInCartList.length])




    return(
        <div className="product-cart-edit--component-container">
            <form onSubmit={handleEditQuantity}>
                <div className="edit-quantity-container">
                    <select value={edittedQuantity} onChange={(e) => setEdittedQuantity(e.target.value)}>
                        {stockQuantity?.map(quantity => {
                            return (
                                <option value={quantity}>{quantity}</option>
                            )
                        })}
                    </select>
                    <button type='submit' className="add-to-cart-submit">Edit Quantity</button>

                </div>
            </form>
        </div>

    )


}
