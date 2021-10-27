import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllMedias, getMediaDetails } from '../../store/medias';
import { createProduct, getAllProducts, deleteOneProduct, getProductDetails, editProductDetails} from '../../store/products';
import { getCartDetails, addProductToCartThunk } from '../../store/cart'
import { Modal } from '../Modal';
import { deleteReviewThunk, getAllReviewsThunk } from '../../store/reviews';
// import './index.css'


export const ProductPage = () => {
    const {productId} = useParams()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    // const product = useSelector(state => state?.products?.currentProduct)
    const cart = useSelector(state => state?.cart)
    const allProductsObj = useSelector(state => state?.products)
    const allReviewsObj = useSelector(state => state?.reviews)
    const allReviewsList = Object.values(allReviewsObj)
    const userId = user?.id


    const product = allProductsObj[productId]

    const medias = useSelector(state => state?.medias)
    const allMediasList = Object.values(medias)
    let productsInCartList = []


    const [name, setName] = useState(product?.name);
    const [description, setDescription] = useState(product?.description);
    const [cover_img_url, setCover_img_url] = useState(product?.cover_img_url);
    const [price, setPrice] = useState(product?.price);
    const [stock_quantity, setStock_quantity] = useState(product?.stock_quantity);
    const [addQuantity, setAddQuantity] = useState(1);

    const allProductsInCartList = Object.values(cart)
    let numberOfProductsInCart = allProductsInCartList.reduce((accum, ele) => {
        return accum + ele.quantity_in_cart
    }, 0)

    let reviewSum = 0;
    allReviewsList?.forEach(review => {
        console.log('==========@@@@@===>', review.product_id === productId)
        if (review?.product_id === productId) {
            reviewSum = reviewSum + review?.rating
    }});
    let aveRating = Math.round((reviewSum / allReviewsList?.length) *10) /10


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getProductDetails(productId))
        dispatch(getCartDetails(user?.id))
        dispatch(getAllReviewsThunk())

        return dispatch(getProductDetails(productId))
    }, [dispatch, productsInCartList.length, aveRating])

    // const productImgList = allMediasList?.filter(media => media?.product_id === product?.id)
    // const firstImg = productImgList[0]


    // console.log("=========@@@@@===>", name)

    // const imageUrl = (product) => {
    //     const productMedia = product?.medias
    //      const productObj = productMedia[0]
    //         console.log('=============@@@@@@@@@@========>',productMedia[0])
    //     return productObj?.url
    // }

//     const displayMainImage = (product) => {
//         const productMedia = product?.medias[0]
//         // const productObj = productMedia[0]
//         // console.log('=============@@@@@@@@@@========>',productMedia[0])
//         return productMedia?.url
// }


    let stockQuantity = []
    for (let i = 1; i <= product?.stock_quantity; i++) {
        stockQuantity.push(i)
    }

    const handleAddToCart = async(e) => {
        e.preventDefault();
        const payload = {
            productId: product.id,
            quantity: addQuantity
        };
        // console.log('=========@@@@@>', payload)
        dispatch(addProductToCartThunk(payload))
    }




    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            id: product.id,
            user_id: user.id,
            name,
            description,
            cover_img_url,
            price,
            stock_quantity
            // image,
            // image2,
            // image3
        };
        dispatch(editProductDetails(payload))
        setModalIsOpen(false)
    }

    const deleteThisReview = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(e.target.value));
    }


    return (
        <div className="product-page-container">

            <>
            <div className="product-page-navbar">
                <div className="logo-container">

                </div>
                <div className="searchbar-container">

                </div>
                {/* <div className="cart-container">
                    <Link className='product-cart-link' to={`/cart`}>
                        <p className="cart">Cart: {numberOfProductsInCart}</p>
                    </Link>
                </div> */}

            </div>
            <h1 className="product-name">{product?.name}</h1>
            <img src={product?.cover_img_url} alt="" className="product-img" />
            <p className="product-description">{product?.description}</p>
            <p className="product-price">${product?.price}</p>
            {/* <p className="product-average-score">Average review score: {aveRating}</p> */}
            <p className="product-stock">In Stock: {product?.stock_quantity}</p>

            {cart[productId] === undefined ?
            <form onSubmit={handleAddToCart}>
                <div className="add-to-cart-container">
                    <select value={addQuantity} onChange={(e) => setAddQuantity(e.target.value)}>
                        {stockQuantity?.map(quantity => {
                            return (
                                <option value={quantity}>{quantity}</option>
                            )
                        })}
                    </select>
                    <button type='submit' className="add-to-cart-submit">Add To Cart</button>

                </div>
            </form> :
            <div className="amount-already-in-cart-container">
                <Link className='product-cart-link' to={`/cart`}>
                    <p className="already-in-cart">This item is already in your cart</p>
                </Link>
            </div>}



            {product?.user_id === user?.id && (
                <>
                    <button onClick={() => setModalIsOpen(true)}>Edit Product</button>
                    <Modal openModal={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
                        <form onSubmit={handleSubmit}>
                            <div className="create-product-container">
                                <div className="input-container">
                                    <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    />
                                    <input
                                    type="textarea"
                                    placeholder="Description"
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    />
                                    <input
                                    type="input"
                                    placeholder="Cover Image URL"
                                    required
                                    value={cover_img_url}
                                    onChange={e => setCover_img_url(e.target.value)}
                                    />
                                    <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    />
                                    <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    required
                                    value={stock_quantity}
                                    onChange={e => setStock_quantity(e.target.value)}
                                    />
                                    {/* <label for="image1">Main Image</label>
                                    <input
                                    type="file"
                                    id='image1'
                                    placeholder="Main Image"
                                    required
                                    value={image}
                                    onChange={e => setImage(image.push(e.target.value))}
                                    />
                                    <label for="image2">1st Optional Image</label>
                                    <input
                                    type="file"
                                    id='image2'
                                    placeholder="1st Optional Image"
                                    value={image}
                                    onChange={e => setImage(image.push(e.target.value))}
                                    />
                                    <label for="image1">2nd Optional Image</label>
                                    <input
                                    type="file"
                                    id='image3'
                                    placeholder="2nd Optional Image"
                                    value={image}
                                    onChange={e => setImage(image.push(e.target.value))}
                                    /> */}
                                    <button type="submit" onClick={handleSubmit}>Edit Product</button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </>
                )}
                {/* <div className="review-container">
                    {allReviewsList.map(review => {
                            return (
                                +review?.product_id === +product?.id ? (
                                    <>
                                    <div className="r-container">
                                        <div className="review-username"><p>{review?.username}</p></div>
                                        <div className="rating"><p>Rating: <span className='review-rating-number'>{review.rating}</span></p></div>
                                        <div className="content"><p>{review.content}</p></div>
                                        {userId && userId === review?.user_id &&
                                        // (<Link to={`/businesses/${businessId}/reviews/${review?.id}/edit`}>
                                        <button value={review.id} className="review-edit-btn">Edit</button>
                                        // </Link>)
                                        }
                                        {userId && userId === review?.user_id &&
                                        (<button value={review.id} className="review-delete-btn" onClick={deleteThisReview}>Delete</button>)
                                        }
                                    </div>
                                </>
                                ) : false
                                )
                            })}

                </div> */}
                </>
            {/* )} */}
        </div>
    )
}
