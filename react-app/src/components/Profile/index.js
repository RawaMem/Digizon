import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getAllMedias } from '../../store/medias';
import { createProduct, getAllProducts, deleteOneProduct } from '../../store/products';
import { Modal } from '../Modal';
import './style.css'


export const Profile = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('');
    const [cover_img_url, setCover_img_url] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock_quantity, setStock_quantity] = useState('');
    // const [image, setImage] = useState([]);
    // const [image2, setImage2] = useState('');
    // const [image3, setImage3] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const allProductsObj = useSelector(state => state?.products)
    const allProductsList = Object.values(allProductsObj)
    const medias = useSelector(state => state?.medias)


    useEffect(() => {
        dispatch(getAllProducts())
        // dispatch(getAllMedias())
    }, [dispatch])
    //was getting stack overflow on profile page but it stopped when I deleted allProductsList from
    //useEffect dependancy array




    const displayMainImage = (product) => {
        const productMedia = product?.medias[0]
        return productMedia?.url
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            user_id: user?.id,
            name,
            description,
            cover_img_url,
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
        console.log('===========@@@@@@>', e.target.value)
        // e.preventDefault();
        dispatch(deleteOneProduct(e.target.value))
    }


    return (
        <div className='profile-page-container'>
            <div className="profile-page-content-container">
                <div className="create-product-btn-container">
                    <button className='sell-product-btn' onClick={() => setModalIsOpen(true)}>Add Product To Sell</button>
                    <Modal openModal={modalIsOpen} closeModal={() => setModalIsOpen(false)}>
                        <form onSubmit={handleSubmit}>
                            <div className="create-product-container">
                                <div className="input-container">
                                    <input
                                    type="text"
                                    placeholder="Product Name"
                                    className='login-input'
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    />
                                    <input
                                    type="text"
                                    placeholder="Cover Image URL"
                                    className='login-input'
                                    required
                                    value={cover_img_url}
                                    onChange={e => setCover_img_url(e.target.value)}
                                    />
                                    <input
                                    type="textarea"
                                    placeholder="Desciption"
                                    className='login-input'
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    />
                                    <input
                                    type="number"
                                    placeholder="Price"
                                    className='login-input'
                                    required
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    />
                                    <input
                                    type="number"
                                    placeholder="Stock Quantity"
                                    className='login-input'
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
                                    <button type="submit" className='modal-btn' onClick={handleSubmit}>Add Product To Sell</button>


                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>

                <div className="user-listed-products">
                {allProductsList?.map(product => {
                        return (
                            product.user_id === user?.id ? (
                            <div className="profile-product-card">
                                <Link className='product-card-link' to={`/products/${product?.id}`}>
                                    <div className="profile-product-img-container">
                                        <img src={product?.cover_img_url} alt="" className="profile-product-img" />
                                    </div>
                                    <p className="profile-product-name">{product?.name}</p>
                                </Link>
                                <div className="product-card-detail-text">
                                    {/* <p className="product-description">{product?.description}</p> */}
                                    <p className="product-price">${product?.price}</p>
                                    <p className="product-stock">In Stock: {product?.stock_quantity}</p>
                                    <button value={product?.id} onClick={handleDelete} className="product-delete-btn">Delete Product</button>
                                </div>
                            </div>
                            ) : false
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
