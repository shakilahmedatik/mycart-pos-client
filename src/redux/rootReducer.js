const initialState = {
  loading: false,
  cartItems: [],
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addToCart':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }
    case 'updateCart':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
    case 'emptyCart':
      return {
        ...state,
        cartItems: [],
      }
    case 'deleteFromCart':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          item => item._id !== action.payload._id
        ),
      }

    case 'showLoading':
      return {
        ...state,
        loading: true,
      }

    case 'hideLoading':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
