const GET_CART = "cart/LOAD";
const CART_DETAILS = "cart/DETAILS";
const ADD_PRODUCT_TO_CART = "cart/ADD";
const EDIT_QUANTITY_OF_PRODUCT_IN_CART = "cart/EDIT";
const DELETE_PRODUCT_FROM_CART = "cart/DELETE";
const PURCHASE_CART = "cart/PURCHASE";

const getCart = (cartObj) => {
  return {
    type: GET_CART,
    cartObj,
  };
};

const cartDetails = (cartObj) => {
  return {
    type: CART_DETAILS,
    cartObj,
  };
};

const addProductToCart = (cartObj) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    cartObj,
  };
};

const editQuantityOfProductInCart = (cartObj) => {
  return {
    type: EDIT_QUANTITY_OF_PRODUCT_IN_CART,
    cartObj,
  };
};

const deleteProductFromCart = (cartObj) => {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    cartObj,
  };
};

const purchaseFromCart = (cartObj) => {
  return {
    type: PURCHASE_CART,
    cartObj,
  };
};

export const getAllCarts = () => async (dispatch) => {
  const response = await fetch("/api/products/carts/");
  if (response.ok) {
    const cartObj = await response.json();
    dispatch(getCart(cartObj));
    return cartObj;
  }
};

export const getCartDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/cart/${id}`);
  if (response.ok) {
    let cartObj = await response.json();
    dispatch(cartDetails(cartObj));
    return cartObj;
  }
};

export const addProductToCartThunk = (cartDetails) => async (dispatch) => {
  // console.log('===========@@@@@=======> add to cart running', cartDetails)
  const response = await fetch(
    `/api/products/cart/add/${cartDetails.productId}/${cartDetails.quantity}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    }
  );



  if (response.ok) {
    const cartObj = await response.json();
    dispatch(addProductToCart(cartObj));
    return cartObj;
  } else {
    // console.log('===========@@@@@=======> this is response from database', response)
    const problem = await response.json();

    // console.log('===========@@@@@=======> this is jsoned problem', problem)
  }
};

export const editQuantityOfProductThunk = (cartDetails) => async (dispatch) => {
  const response = await fetch(
    `/api/products/cart/edit/${cartDetails.productId}/${cartDetails.quantity}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    }
  );
  if (response.ok) {
    const cartObj = await response.json();
    dispatch(editQuantityOfProductInCart(cartObj));
    return cartObj;
  }
};

export const deleteProductFromCartThunk = (cartDetails) => async (dispatch) => {
  const response = await fetch(`/api/products/cart/delete/${cartDetails.productId}`);
  if (response.ok) {
    const cartObj = await response.json();
    dispatch(deleteProductFromCart(cartObj));
    return cartObj;
  }
};


export const purchaseProductsFromCartThunk = () => async (dispatch) => {
//   console.log('===========@@@@@=======> purchase thunk running')
  const response = await fetch(`/api/products/cart/purchase`);
  if (response.ok) {
    const cartObj = await response.json();
    dispatch(purchaseFromCart(cartObj));
    return cartObj;
  }
};



const initialState = {}

const cartReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_CART:
            newState = action.cartObj.productsObjForState;
            return newState;
        case CART_DETAILS:
            newState = action.cartObj.productsObjForState;
            return newState;
        case ADD_PRODUCT_TO_CART:
            newState = action.cartObj.productsObjForState;
            return newState;
        case EDIT_QUANTITY_OF_PRODUCT_IN_CART:
            newState = action.cartObj.productsObjForState;
            return newState;
        case DELETE_PRODUCT_FROM_CART:
            newState = action.cartObj.productsObjForState;
            return newState;
        case PURCHASE_CART:
            newState = action.cartObj.productsObjForState;
            return newState;
        default:
        return state
    }
}

export default cartReducer;






































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
//   // console.log('===========@@@@@=======> edit running', cartDetails)
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

// // productQuantities will be ID as key and quantity as value {1:3}
// const initialState = { cart: {}, productQuantities: {} };

// const cartReducer = (state = initialState, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_CART:
//       newState.cart = action.cartObj.cart;
//       newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//       return newState;
//     case CART_DETAILS:
//       newState.cart = action.cartObj.cart;
//       newState.productQuantities = action.cartObj.quantityObj;
//       return newState;
//     case ADD_PRODUCT_TO_CART:
//       newState.cart[action.cartObj.cart.id] = action.cartObj;
//       newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//       return newState;
//     case EDIT_QUANTITY_OF_PRODUCT_IN_CART:
//       newState.cart[action.cartObj.cart.id] = action.cartObj;
//       newState.productQuantities[action.cartObj.productId] = action.cartObj.quantity;
//       return newState;
//     case DELETE_PRODUCT_FROM_CART:
//       newState.cart = action.cartObj.cart;
//       // delete newState.cart.products[action.cartObj.productId]
//       delete newState.productQuantities[action.cartObj.productId];

//       return newState;
//     default:
//       return state;
//   }
// };

// export default cartReducer;
