import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_BY_USER_REQUEST,
    PRODUCT_DETAILS_BY_USER_SUCCESS,
    PRODUCT_DETAILS_BY_USER_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_CATEGORYNAME_REQUEST,
    PRODUCT_TOP_CATEGORYNAME_SUCCESS,
    PRODUCT_TOP_CATEGORYNAME_FAIL,
} from "../constants/productConstants"


// takes in initial state of empty object and empty array of products
// and action > dispatch action to reducer
export const productListReducer = (
  state = { products: [], allProductsCategory: [] },
  action
) => {
  switch (action.type) {
    // check to see if the reducer cares about this action
    case PRODUCT_LIST_REQUEST:
      // if so set loading to true and products to an empty array
      return {
        loading: true,
        products: [],
        allProductsCategory: [],
      };
    case PRODUCT_LIST_SUCCESS:
      // fill products with payload dispatched by action
      return {
        loading: false,
        products: action.payload.products,
        allProductsCategory: action.payload.allProductsCategory,

        // pagination functionality >> extended res.json in productController
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return {};
    // otherwise return existing state unchanged
    default:
      return state;
  }
};


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

export const productDetailByUserIdReducer = (state = { products: [] }, action) => { 
    switch (action.type) {
        case PRODUCT_DETAILS_BY_USER_REQUEST:
            return { loading: true, ...state}
        case PRODUCT_DETAILS_BY_USER_SUCCESS:
            return { loading: false, productsUser: action.payload}
        case PRODUCT_DETAILS_BY_USER_FAIL:
             return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDeleteReducer = (state = { }, action) => { 
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
             return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const productCreateReducer = (state = { }, action) => { 
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
             return { loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return { }
        default:
            return state
    }
}

export const productUpdateReducer = (state = { }, action) => { 
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
             return { loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const productTopCategoryNameReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_TOP_CATEGORYNAME_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_CATEGORYNAME_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_CATEGORYNAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};