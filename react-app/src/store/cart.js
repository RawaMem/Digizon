const GET_CART = 'cart/LOAD'
const CART_DETAILS = 'cart/DETAILS'
const ADD_PRODUCT_TO_CART = 'cart/ADD'
const EDIT_QUANTITY_OF_PRODUCT_IN_CART = 'cart/EDIT'
const DELETE_PRODUCT_FROM_CART = 'cart/DELETE'


const getCart = cartObj => {
    return {
        type: GET_CART,
        cartObj
    }
}


const cartDetails = cartDetailsObj => {
    return {
        type: CART_DETAILS,
        cartDetailsObj
    }
}


const addProductToCart = addedProductToCartObj => {
    return {
        type: ADD_PRODUCT_TO_CART,
        addedProductToCartObj
    }
}


const editQuantityOfProductInCart = edittedQuantityCartObj => {
    return {
        type: EDIT_QUANTITY_OF_PRODUCT_IN_CART,
        edittedQuantityCartObj
    }
}


const deleteProductFromCart = deletedFromCartObj => {
    return {
        type: DELETE_PRODUCT_FROM_CART,
        deletedFromCartObj
    }
}


export const getAllCarts = () => async (dispatch) => {
    const response = await fetch('/api/carts')
    if (response.ok) {
        const cartObj = await response.json();
        dispatch(getCart(cartObj))
        return cartObj
    }
}

export const getCartDetails = (id) => async(dispatch) => {
    const response = await fetch(`/api/carts/${id}`)
    if (response.ok) {
        let cartDetailsObj = await response.json()
        dispatch(cartDetails(cartDetailsObj))
        return cartDetailsObj
    }
}


export const addProductToCartThunk = cartDetails => async (dispatch) => {
    const response = await fetch('/api/carts/new', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(cartDetails)
    })
    if (response.ok) {
        const addedProductToCartObj = await response.json();
        dispatch(addProductToCart(addedProductToCartObj))
        return addedProductToCartObj
    }
}



export const editQuantityOfProductThunk = cartDetails => async (dispatch) => {
    // console.log('===========@@@@@=======> edit running', cartDetails)
    const response = await fetch(`/api/carts/edit/${cartDetails.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(cartDetails)
    })
    if (response.ok) {
        const edittedQuantityCartObj = await response.json()
        dispatch(editQuantityOfProductInCart(edittedQuantityCartObj))
        return edittedQuantityCartObj
    }
}


export const deleteProductFromCartThunk = id => async (dispatch) => {
    const response = await fetch(`/api/carts/delete/${id}`)
    if (response.ok) {
        const deletedFromCartObj = await response.json();
        dispatch(deleteProductFromCart(deletedFromCartObj))
        return deletedFromCartObj
    }
}

// {1:3:{product}}
const initialState = {cart:{}, productsInCart:[]}

const cartReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_CART:
            newState.cart= action.cartObj
            newState.productsInCart = action.cartObj.products
            return newState
        case CART_DETAILS:
            newState.currentProduct = action.cartDetailsObj
            return newState
        case ADD_PRODUCT_TO_CART:
            newState[action.addedProductToCartObj.id] = action.addedProductToCartObj
            newState.productsInCart = action.addedProductToCartObj.products
            return newState
        case EDIT_QUANTITY_OF_PRODUCT_IN_CART:
            newState.cart[action.edittedQuantityCartObj.id] = action.edittedQuantityCartObj
            newState.productsInCart = action.edittedQuantityCartObj.products
            return newState
        case DELETE_PRODUCT_FROM_CART:
            delete newState[action.deletedFromCartObj.id]
            newState.productsInCart = action.deletedFromCartObj.products

            return newState
        default:
        return state
    }
}

export default cartReducer;
