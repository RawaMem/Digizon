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
    const response = await fetch('/api/products/')
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
    // console.log('===========@@@@@@>thunk', productDetails)

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
        return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}



export const editProductDetails = productDetails => async (dispatch) => {
    // console.log('===========@@@@@=======> edit running', productDetails)
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
        return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
}


export const deleteOneProduct = id => async (dispatch) => {
    // console.log('===========@@@@@=======> edit running', id)

    const response = await fetch(`/api/products/delete/${id}`)
    if (response.ok) {
        const deletedProductObj = await response.json();
        dispatch(deleteProduct(deletedProductObj))
        return deletedProductObj
    }
}






// const GET_CART = "cart/LOAD";
// const CART_DETAILS = "cart/DETAILS";
// const ADD_PRODUCT_TO_CART = "cart/ADD";
// const EDIT_QUANTITY_OF_PRODUCT_IN_CART = "cart/EDIT";
// const DELETE_PRODUCT_FROM_CART = "cart/DELETE";

// const getCart = (cartObj) => {
//   return {
//     type: GET_CART,
//     cartObj,
//   };
// };

// const cartDetails = (cartObj) => {
//   return {
//     type: CART_DETAILS,
//     cartObj,
//   };
// };

// const addProductToCart = (cartObj) => {
//   return {
//     type: ADD_PRODUCT_TO_CART,
//     cartObj,
//   };
// };

// const editQuantityOfProductInCart = (cartObj) => {
//   return {
//     type: EDIT_QUANTITY_OF_PRODUCT_IN_CART,
//     cartObj,
//   };
// };

// const deleteProductFromCart = (cartObj) => {
//   return {
//     type: DELETE_PRODUCT_FROM_CART,
//     cartObj,
//   };
// };

// export const getAllCarts = () => async (dispatch) => {
//   const response = await fetch("/api/carts");
//   if (response.ok) {
//     const cartObj = await response.json();
//     dispatch(getCart(cartObj));
//     return cartObj;
//   }
// };

// export const getCartDetails = (id) => async (dispatch) => {
//   const response = await fetch(`/api/products/cart/${id}`);
//   if (response.ok) {
//     let cartObj = await response.json();
//     dispatch(cartDetails(cartObj));
//     return cartObj;
//   }
// };

// export const addProductToCartThunk = (cartDetails) => async (dispatch) => {
//   console.log('===========@@@@@=======> add to cart running', cartDetails)
//   const response = await fetch(
//     `/api/products/cart/add/${cartDetails.productId}/${cartDetails.quantity}`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cartDetails),
//     }
//   );
//   if (response.ok) {
//     const cartObj = await response.json();
//     dispatch(addProductToCart(cartObj));
//     return cartObj;
//   }
// };

// export const editQuantityOfProductThunk = (cartDetails) => async (dispatch) => {
//   const response = await fetch(
//     `/api/products/cart/edit/${cartDetails.id}/${cartDetails.quantity}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cartDetails),
//     }
//   );
//   if (response.ok) {
//     const cartObj = await response.json();
//     dispatch(editQuantityOfProductInCart(cartObj));
//     return cartObj;
//   }
// };

// export const deleteProductFromCartThunk = (cartDetails) => async (dispatch) => {
//   const response = await fetch(`/api/products/cart/delete/${cartDetails.id}`);
//   if (response.ok) {
//     const cartObj = await response.json();
//     dispatch(deleteProductFromCart(cartObj));
//     return cartObj;
//   }
// };





// const initialState = {products:{}, currentProduct:{}, cart: {}, productQuantities: {}}

// const productReducer = (state = initialState, action) => {
//     let newState = {...state}
//     switch (action.type) {
//         case GET_PRODUCTS:
//             newState.products= action.productsObj
//             // newState.currentProduct= {}
//             return newState
//         case PRODUCT_DETAILS:
//             newState.currentProduct = action.productDetailsObj
//             return newState
//         case ADD_PRODUCT:
//             newState.products[action.newProductObj.id] = action.newProductObj
//             newState.currentProduct = action.newProductObj
//             return newState
//         case EDIT_PRODUCT:
//             newState.products[action.edittedProductObj.id] = action.edittedProductObj
//             newState.currentProduct = action.edittedProductObj
//             return newState
//         case DELETE_PRODUCT:
//             delete newState.products[action.deletedProductObj.id]
//             return newState
//         case GET_CART:
//             newState.cart = action.cartObj.cart;
//             newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//             return newState;
//         case CART_DETAILS:
//             newState.cart = action.cartObj.cart;
//             newState.productQuantities = action.cartObj.quantityObj;
//             return newState;
//         case ADD_PRODUCT_TO_CART:
//             newState.cart[action.cartObj.cart.id] = action.cartObj;
//             newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//             newState.currentProduct = action.cartObj.product
//             newState.products[action.cartObj.product.id] = action.cartObj.product
//             return newState;
//         case EDIT_QUANTITY_OF_PRODUCT_IN_CART:
//             newState.cart[action.cartObj.cart.id] = action.cartObj;
//             newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//             newState.currentProduct = action.cartObj.product
//             newState.products[action.cartObj.product.id] = action.cartObj.product
//             return newState;
//         case DELETE_PRODUCT_FROM_CART:
//             newState.cart = action.cartObj.cart;
//             // delete newState.cart.products[action.cartObj.productId]
//             delete newState.productQuantities[action.cartObj.productId];
//             newState.currentProduct = action.cartObj.product
//             newState.products[action.cartObj.product.id] = action.cartObj.product
//             return newState;
//         default:
//         return state
//     }
// }

const initialState = {}

const productReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_PRODUCTS:
            newState= action.productsObj
            return newState
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
