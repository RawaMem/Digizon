import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProductFromCartThunk, getCartDetails, purchaseProductsFromCartThunk } from '../../store/cart';
import { getAllProducts } from '../../store/products';
import { refreshUserThunk } from '../../store/session';
import { CartEdit } from '../CartEdit';
import './style.css'


export const Cart = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    // const allProductsObj = useSelector(state => state?.products)
    // const allProductsList = Object.values(allProductsObj)
    const cart = useSelector(state => state?.cart)

    const allProductsInCartList = Object.values(cart)
    // let numberOfProductsInCart = allProductsInCartList.reduce((accum, ele) => {
    //     return accum + ele.quantity_in_cart
    // }, 0)


    let totalPurchasePrice = allProductsInCartList?.reduce((accum, ele) => {
        return accum + (ele.quantity_in_cart * ele.price)
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
        // console.log('===========@@@@@@==>', e.target.id)
        e.preventDefault();
        const payload = {
            productId: e.target.id
        };
        // console.log('=========@@@@@>', payload)
        dispatch(deleteProductFromCartThunk(payload))
    }


    const handlePurchaseCart = async(e) => {
        e.preventDefault();
        // console.log('===========@@@@@@==> purchase component function running')
        dispatch(purchaseProductsFromCartThunk())
        dispatch(refreshUserThunk())
    }


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getCartDetails(user?.id))
    }, [dispatch, productsInCartList.length])




    return(
        <>
        <div className="whole-page-wrapper">

            <div className="cart-page-container">
                <div className="cart-page-content-container">
                <div className="cart-info-container">
                    <h2 className="cart-page-title">Cart</h2>
                    <div className="purchase-btn-container">
                        <p className="total-price">Total Price: ${totalPurchasePrice}</p>
                        <button className="cart-product-purchase-btn navbar-btn" onClick={handlePurchaseCart}>Place your order</button>
                    </div>
                    <div className="empty-cart-notification">
                        {totalPurchasePrice === 0 && (
                            <h2 className="empty-cart-text">Your cart is empty</h2>
                        )}
                    </div>
                </div>
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
                                        <p className="cart-page-product-name">{product?.name}</p>
                                    </Link>
                                    {/* <p className="product-description">{product?.description}</p> */}
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
                                    <button className="cart-product-delete-btn navbar-btn" id={product?.id} onClick={handleRemoveFromCart}>Remove Product</button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
        </div>
        <div className="footer-wrapper">
          <div className="footer-container">
            <p className="about-me"> Designed by Rawaha Memon</p>
            <div className="personal-link-container">
              <a href="https://github.com/RawaMem" target="_blank" rel="noreferrer" className="social-link">
                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-1024.png" alt="" className="social-link-img" />
              </a>
              <a href="https://linkedin.com/in/rawaha-m-b280a4204 " target="_blank"  rel="noreferrer" className="social-link">
                <img src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/linkedin-1024.png" alt="" className="social-link-img" />
              </a>
            </div>
          </div>
        </div>
        </>

    )


}
