import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
        <>
        <div className="whole-page-wrapper">

        <div className="home-page-container">
            <div className="home-page-content-container">
                <h2 className="all-products-title">All Products</h2>
            {/* {allProductsObj && ( */}
                <>
                    <div className="all-products">
                        {allProductsList?.map((product, ind) => {
                            return (
                                <Link key={ind + 'a'} className='product-card-link' to={`/products/${product?.id}`}>
                                <div key={ind + 'b'} className="product-card">
                                        <div key={ind + 'c'} className="product-img-container">
                                            <img src={product?.cover_img_url} alt="" key={ind + ''} className="product-img" />
                                        </div>
                                        <p key={ind + 'd'} className="product-name product-card-detail-text profile-product-name">{product?.name}</p>
                                    <div key={ind + 'e'} className="product-card-detail-text">
                                        {/* <p key={ind + 'f'} className="product-description">{product?.description}</p> */}
                                        <p key={ind + 'g'} className="product-price">${product?.price}</p>
                                        {product?.stock_quantity > 0 ?
                                        <p key={ind + 'h'} className="product-stock">In Stock: {product?.stock_quantity}</p> :
                                        <p key={ind + 'i'} className="out-of-stock">This product is out of stock</p>
                                        }
                                        {/* <p className="product-stock">In Stock: {product?.stock_quantity}</p> */}
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
