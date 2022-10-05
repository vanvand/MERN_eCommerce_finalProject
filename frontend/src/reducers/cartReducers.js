import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from "../constants/cartConstants"

export const cartReducer = (state = { 
    cartItems: [], 
    shippingAddress: {}
}, action) => {
    
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload // id in this payload is called product
            const existItem = state.cartItems.find(x => x.product === item.product)
            
            if(existItem) {
                return {
                    ...state,
                    // map through current items > for each: if current item id is equal to the exist item id then return the item for this iteration otherwise x (stay the same) 
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return{
                    ...state,
                    cartItems: [...state.cartItems, item] // current items and add new item
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                // filter: strip out to be deleted item
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default: 
            return state
    }
}