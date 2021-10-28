import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllProducts } from '../../store/products';
import './index.css'

export const Home = () => {
    const dispatch = useDispatch();

    const allProductsObj = useSelector(state => state?.products)
    const allProductsList = Object.values(allProductsObj)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])


    // const displayMainImage = (product) => {
    //         const productMedia = product?.medias[0]
    //         // const productObj = productMedia[0]
    //         // console.log('=============@@@@@@@@@@========>',productMedia[0])
    //         return productMedia?.url
    // }
    // test




    return (

        <div className="home-page-container">
            <div className="home-page-content-container">
                <h2 className="all-products-title">All Products</h2>
            {/* {allProductsObj && ( */}
                <>
                    <div className="all-products">
                        {allProductsList?.map(product => {
                            return (
                                <Link className='product-card-link' to={`/products/${product?.id}`}>
                                <div className="product-card">
                                        <div className="product-img-container">
                                            <img src={product?.cover_img_url} alt="" className="product-img" />
                                        </div>
                                        <p className="product-name product-card-detail-text profile-product-name">{product?.name}</p>
                                    <div className="product-card-detail-text">
                                        {/* <p className="product-description">{product?.description}</p> */}
                                        <p className="product-price">${product?.price}</p>
                                        <p className="product-stock">In Stock: {product?.stock_quantity}</p>
                                    </div>
                                </div>
                                </Link>
                            )
                        })}
                    </div>
                </>
            {/* )} */}
            </div>
        </div>


    )
}
