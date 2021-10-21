import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllProducts } from '../../store/products';
import { Modal } from '../Modal';
// import './index.css'




export const Profile = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)



    const displayMainImage = (product) => {
        const productMedia = product.medias[0]
        return productMedia.url

}





    return (
        <div className='profile-page-container'>
            <div className="create-product-btn-container">
                <button onClick={() => setModalIsOpen(true)}>Sell Product</button>
                <Modal openModal={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
                    This is where the form will be
                </Modal>
            </div>

            <div className="user-listed-products">
            {user?.products?.map(product => {
                    return (
                        <div className="product-card">
                            <div className="product-img-container">
                                <img src={displayMainImage(product)} alt="" className="product-img" />
                            </div>
                            <p className="product-name">{product?.name}</p>
                            <p className="product-description">{product?.description}</p>
                            <p className="product-price">${product?.price}</p>
                            <p className="product-stock">In Stock: {product?.stock_quantity}</p>

                        </div>
                    )
                })}

            </div>



        </div>
    )
}
