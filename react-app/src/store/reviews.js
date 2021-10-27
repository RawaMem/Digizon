const GET_ALL_REVIEWS = `reviews/GET`;
const EDIT_REVIEW = `reviews/EDIT`;
const ADD_REVIEW = `reviews/ADD`;
const DELETE_REVIEW = `reviews/DELETE`;


const getReviews = allreviewsObj => ({
    type: GET_ALL_REVIEWS,
    allreviewsObj
});


const editReview = reviewObj => ({
    type: EDIT_REVIEW,
    reviewObj
});

const addReview = reviewObj => ({
    type: ADD_REVIEW,
    reviewObj

});

const deleteReview = reviewObj => ({
    type: DELETE_REVIEW,
    reviewObj
});



export const getAllReviewsThunk = () => async dispatch => {
    const response = await fetch(`/api/reviews/`)

    if (response.ok) {
        const allreviewsObj = await response.json();
        dispatch(getReviews(allreviewsObj));
    }
};


export const createReviewThunk = (reviewObj) => async dispatch => {
    const response = await fetch('/api/reviews/new', {
      method: 'POST',
      body: JSON.stringify(reviewObj)
    })
    if(response.ok){
      const reviewObj = await response.json()
      dispatch(addReview(reviewObj))
      return reviewObj;
    }
};

export const editReviewThunk = (reviewObj) => async dispatch => {
    const response = await fetch(`/api/reviews/edit/${reviewObj.reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(reviewObj)
    })
    if(response.ok){
      const reviewObj = await response.json()
      dispatch(editReview(reviewObj))
      return reviewObj;
    }
};

export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
      body: JSON.stringify({reviewId})

    })
    if(response.ok){
        const reviewObj = await response.json();
        dispatch(deleteReview(reviewObj));
        return reviewObj;
    }
};

const initialState = {};
const reviewReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            newState = action.allreviewsObj
            return newState
        }
        case EDIT_REVIEW: {
            newState[action.reviewObj.id] = action.reviewObj
            return newState
        }
        case ADD_REVIEW: {
            newState[action.reviewObj.id] = action.reviewObj
            return newState
        }
        case DELETE_REVIEW: {
            delete newState[action.reviewObj.id]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer;
