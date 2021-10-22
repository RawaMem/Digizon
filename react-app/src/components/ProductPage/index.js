import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createProduct, getAllProducts, deleteOneProduct, getProductDetails, editProductDetails } from '../../store/products';
import { Modal } from '../Modal';
// import './index.css'


export const ProductPage = () => {
    const {productId} = useParams()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock_quantity, setStock_quantity] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)

    const product = useSelector(state => state?.products)

    useEffect(() => {
        dispatch(getProductDetails(productId))
    }, [dispatch])


    const imageUrl = (product) => {
        const productMedia = product?.medias[0]
        console.log("=======>", productMedia)

        return productMedia?.url
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            id: product.id,
            user_id: user.id,
            name,
            url,
            description,
            price,
            stock_quantity
            // image,
            // image2,
            // image3
        };
        dispatch(editProductDetails(payload))
        setModalIsOpen(false)
    }


    return (
        <div className="product-page-container">
            <h1 className="product-name">{product.name}</h1>
            <img src={imageUrl(product)} alt="" className="product-img" />
            <button onClick={() => setModalIsOpen(true)}>Edit Product</button>
                <Modal openModal={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
                    <form onSubmit={handleSubmit}>
                        <div className="create-product-container">
                            <div className="input-container">
                                <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={product.name}
                                onChange={e => setName(e.target.value)}
                                />
                                <input
                                type="text"
                                placeholder="URL"
                                required
                                value={imageUrl(product)}
                                onChange={e => setUrl(e.target.value)}
                                />
                                <input
                                type="textarea"
                                placeholder="Desciption"
                                required
                                value={product.description}
                                onChange={e => setDescription(e.target.value)}
                                />
                                <input
                                type="number"
                                placeholder="Price"
                                required
                                value={product.price}
                                onChange={e => setPrice(e.target.value)}
                                />
                                <input
                                type="number"
                                placeholder="Stock Quantity"
                                required
                                value={product.stock_quantity}
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

        </div>
    )
}
