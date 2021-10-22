import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createProduct, getAllProducts, deleteOneProduct } from '../../store/products';
import { Modal } from '../Modal';
// import './index.css'




export const Profile = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock_quantity, setStock_quantity] = useState('');
    // const [image, setImage] = useState([]);
    // const [image2, setImage2] = useState('');
    // const [image3, setImage3] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)



    const displayMainImage = (product) => {
        const productMedia = product.medias[0]
        return productMedia?.url
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
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

        dispatch(createProduct(payload))
        setModalIsOpen(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault();

        const payload = {
            id: e.target.value
        }

        dispatch(deleteOneProduct(payload))

    }





    return (
        <div className='profile-page-container'>
            <div className="create-product-btn-container">
                <button onClick={() => setModalIsOpen(true)}>Sell Product</button>
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
                                type="text"
                                placeholder="URL"
                                required
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                                />
                                <input
                                type="textarea"
                                placeholder="Desciption"
                                required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
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
                                <button type="submit" onClick={handleSubmit}>Add Product</button>


                            </div>
                        </div>
                    </form>
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
                            <button value={product.id} onClick={handleDelete} className="product-delete">Delete Product</button>

                        </div>
                    )
                })}

            </div>



        </div>
    )
}
