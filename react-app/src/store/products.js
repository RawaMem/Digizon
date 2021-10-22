const GET_PRODUCTS = 'products/LOAD'
const PRODUCT_DETAILS = 'products/DETAILS'
const ADD_PRODUCT = 'products/ADD'
const EDIT_PRODUCT = 'products/EDIT'
const DELETE_PRODUCT = 'products/DELETE'


const getProducts = productsObj => {
    return {
        type: GET_PRODUCTS,
        productsObj
    }
}


const productDetails = productDetailsObj => {
    return {
        type: PRODUCT_DETAILS,
        productDetailsObj
    }
}


const addProduct = newProductObj => {
    return {
        type: ADD_PRODUCT,
        newProductObj
    }
}


const editProduct = edittedProductObj => {
    return {
        type: EDIT_PRODUCT,
        edittedProductObj
    }
}


const deleteProduct = deletedProductObj => {
    return {
        type: DELETE_PRODUCT,
        deletedProductObj
    }
}


export const getAllProducts = () => async (dispatch) => {
    const response = await fetch('/api/products')
    if (response.ok) {
        const productsObj = await response.json();
        dispatch(getProducts(productsObj))
        return productsObj
    }
}

export const getProductDetails = (id) => async(dispatch) => {
    const response = await fetch(`/api/products/${id}`)
    if (response.ok) {
        let productDetailsObj = await response.json()
        dispatch(productDetails(productDetailsObj))
        return productDetailsObj
    }
}


// export const createProduct = productDetails => async (dispatch) => {
//     const response = await fetch('/api/products/new', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(productDetails)
//     })
//     if (response.ok) {
//         const newProductObj = await response.json();
//         const imagePaylod = {
//             user_id: newProductObj.user_id,
//             product_id: newProductObj.id,
//             image: productDetails.image
//         }

//         const imageResponse = await fetch(`/api/products/media/new/${newProductObj.user_id}/${newProductObj.id}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify(imagePaylod)
//         })

//         if (imageResponse.ok) {
//             let productWithImagesObj = await response.json()
//             dispatch(addProduct(productWithImagesObj))
//             return productWithImagesObj
//         }

//     }
// }


export const createProduct = productDetails => async (dispatch) => {
    const response = await fetch('/api/products/new', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productDetails)
    })
    if (response.ok) {
        const newProductObj = await response.json();
        dispatch(addProduct(newProductObj))
        return newProductObj
    }
}






export const editProductDetails = productDetails => async (dispatch) => {
    const response = await fetch(`/api/products/edit/${productDetails.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productDetails)
    })
    if (response.ok) {
        const edittedProductObj = await response.json()
        dispatch(editProduct(edittedProductObj))
        return edittedProductObj
    }
}


export const deleteOneProduct = id => async (dispatch) => {
    const response = await fetch(`/api/products/delete/${id}`)
    if (response.ok) {
        const deletedProductObj = await response.json();
        dispatch(deleteProduct(deletedProductObj))
        return deletedProductObj
    }
}


const initialState = {}

const productReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_PRODUCTS:
            return action.productsObj
        case PRODUCT_DETAILS:
            return action.productDetailsObj
        case ADD_PRODUCT:
            newState[action.newProductObj.id] = action.newProductObj
            return newState
        case EDIT_PRODUCT:
            newState[action.edittedProductObj.id] = action.edittedProductObj
            return newState
        case DELETE_PRODUCT:
            delete newState[action.deletedProductObj.id]
            return newState
        default:
        return state
    }
}

export default productReducer;
