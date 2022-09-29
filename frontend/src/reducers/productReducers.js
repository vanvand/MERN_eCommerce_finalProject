import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants"


// takes in initial state of empty object and empty array of products
// and action > dispatch action to reducer
export const productListReducer = (state = { products: [] }, action) => {
    
    switch (action.type) {
        // check to see if the reducer cares about this action
        case PRODUCT_LIST_REQUEST:
            // if so set loading to true and products to an empty array
            return { loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            // fill products with payload dispatched by action
            return { loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
             return { loading: false, error: action.payload}
        // otherwise return existing state unchanged
        default:
            return state 
    }
}


export const productDetailReducer = (state = { product: { reviews: [] } }, action) => { // single product
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state} // ...state equal to copy of state
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
             return { loading: false, error: action.payload}
        // otherwise return existing state unchanged
        default:
            return state
    }
}