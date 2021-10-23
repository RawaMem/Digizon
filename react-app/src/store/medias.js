const GET_MEDIAS = 'medias/LOAD'
const MEDIA_DETAILS = 'medias/DETAILS'
const ADD_MEDIA = 'medias/ADD'
const EDIT_MEDIA = 'medias/EDIT'
const DELETE_MEDIA = 'medias/DELETE'


const getMedias = mediasObj => {
    return {
        type: GET_MEDIAS,
        mediasObj
    }
}


const mediaDetails = mediaDetailsObj => {
    return {
        type: MEDIA_DETAILS,
        mediaDetailsObj
    }
}


const addMedia = newMediaObj => {
    return {
        type: ADD_MEDIA,
        newMediaObj
    }
}


const editMedia = edittedMediaObj => {
    return {
        type: EDIT_MEDIA,
        edittedMediaObj
    }
}


const deleteMedia = deletedMediaObj => {
    return {
        type: DELETE_MEDIA,
        deletedMediaObj
    }
}


export const getAllMedias = () => async (dispatch) => {
    const response = await fetch('/api/medias')
    if (response.ok) {
        const mediasObj = await response.json();
        dispatch(getMedias(mediasObj))
        return mediasObj
    }
}

export const getMediaDetails = (product_id) => async(dispatch) => {
    const response = await fetch(`/api/medias/${product_id}`)
    console.log('get media thunk running ========', response)
    if (response.ok) {
        let mediaDetailsObj = await response.json()
        dispatch(mediaDetails(mediaDetailsObj))
        return mediaDetailsObj
    }
}


// export const createMedia = mediaDetails => async (dispatch) => {
//     const response = await fetch('/api/medias/new', {
//         method: 'POST',
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify(mediaDetails)
//     })
//     if (response.ok) {
//         const newMediaObj = await response.json();
//         const imagePaylod = {
//             user_id: newMediaObj.user_id,
//             product_id: newMediaObj.id,
//             image: mediaDetails.image
//         }

//         const imageResponse = await fetch(`/api/medias/media/new/${newMediaObj.user_id}/${newMediaObj.id}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify(imagePaylod)
//         })

//         if (imageResponse.ok) {
//             let productWithImagesObj = await response.json()
//             dispatch(addMedia(productWithImagesObj))
//             return productWithImagesObj
//         }

//     }
// }


export const createMedia = mediaDetails => async (dispatch) => {
    const response = await fetch('/api/medias/new', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(mediaDetails)
    })
    if (response.ok) {
        const newMediaObj = await response.json();
        dispatch(addMedia(newMediaObj))
        return newMediaObj
    }
}






export const editMediaDetails = mediaDetails => async (dispatch) => {
    const response = await fetch(`/api/medias/edit/${mediaDetails.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(mediaDetails)
    })
    if (response.ok) {
        const edittedMediaObj = await response.json()
        dispatch(editMedia(edittedMediaObj))
        return edittedMediaObj
    }
}


export const deleteOneMedia = id => async (dispatch) => {
    const response = await fetch(`/api/medias/delete/${id}`)
    if (response.ok) {
        const deletedMediaObj = await response.json();
        dispatch(deleteMedia(deletedMediaObj))
        return deletedMediaObj
    }
}


const initialState = {}

const mediaReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case GET_MEDIAS:
            return action.mediasObj
        case MEDIA_DETAILS:
            return action.mediaDetailsObj
        case ADD_MEDIA:
            newState[action.newMediaObj.id] = action.newMediaObj
            return newState
        case EDIT_MEDIA:
            newState[action.edittedMediaObj.id] = action.edittedMediaObj
            return newState
        case DELETE_MEDIA:
            delete newState[action.deletedMediaObj.id]
            return newState
        default:
        return state
    }
}

export default mediaReducer;
