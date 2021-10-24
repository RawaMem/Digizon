import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllMedias, getMediaDetails } from '../../store/medias';
import { createProduct, getAllProducts, deleteOneProduct, getProductDetails, editProductDetails } from '../../store/products';
import { Modal } from '../Modal';
// import './index.css'


export const ProductPage = () => {
    const {productId} = useParams()
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user)
    const product = useSelector(state => state?.products?.currentProduct)
    const medias = useSelector(state => state?.medias)
    const allMediasList = Object.values(medias)


    const [name, setName] = useState(product?.name);
    const [description, setDescription] = useState(product?.description);
    const [cover_img_url, setCover_img_url] = useState(product?.cover_img_url);
    const [price, setPrice] = useState(product?.price);
    const [stock_quantity, setStock_quantity] = useState(product?.stock_quantity);


    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(getProductDetails(productId))
        dispatch(getAllMedias())
    }, [dispatch])

    const productImgList = allMediasList?.filter(media => media?.product_id === product?.id)
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


    return (
        <div className="product-page-container">
            {/* {medias && ( */}
            <>
            <h1 className="product-name">{product?.name}</h1>
            <img src={product?.cover_img_url} alt="" className="product-img" />
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
                                    placeholder="Desciption"
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
                </>
            {/* )} */}
        </div>
    )
}
