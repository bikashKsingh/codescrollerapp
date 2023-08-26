import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = {
  jwtToken: null,
  name: null,
  mobile: null,
  email: null,
  gender: null,
  address: null,
  city: null,
  landmark: null,
  pincode: null,
  state: null,
  _id: null,
  dob: null,
  cart: [],
};

const clearLocalStorage = async item => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    alert(error.message);
  }
};

const updateItemToLocalStorage = async item => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify({...item}));
  } catch (error) {
    alert(error.message);
  }
};

export const userReducer = (state, action) => {
  if (action.type == 'USER') {
    // return {...state, jwtToken: action.payload};
    updateItemToLocalStorage({...state, ...action.payload});
    return {...state, ...action.payload};
  } else if (action.type == 'CLEAR') {
    clearLocalStorage();
    return initialState;
  } else if (action.type == 'ADD_TO_CART') {
    updateItemToLocalStorage({
      ...state,
      cart: [...state.cart, action.payload],
    });
    return {...state, cart: [...state.cart, action.payload]};
  } else if (action.type == 'UPDATE_STATE') {
    return {...state, ...action.payload};
  } else if (action.type == 'INCREASE_QUANTITY') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(item =>
        item.productId == action.payload.productId
          ? {...item, quantity: item.quantity + 1}
          : {...item},
      ),
    });
    return {
      ...state,
      cart: state.cart.map(item =>
        item.productId == action.payload.productId
          ? {...item, quantity: item.quantity + 1}
          : {...item},
      ),
    };
  } else if (action.type == 'DECREASE_QUANTITY') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(item => {
        return item.productId == action.payload.productId
          ? {...item, quantity: item.quantity - 1}
          : {...item};
      }),
    });
    return {
      ...state,
      cart: state.cart.map(item => {
        return item.productId == action.payload.productId
          ? {...item, quantity: item.quantity - 1}
          : {...item};
      }),
    };
  } else if (action.type == 'CLEAR_CART') {
    updateItemToLocalStorage({...state, cart: []});
    return {...state, cart: []};
  } else if (action.type == 'REMOVE_FROM_CART') {
    if (state.cart.length > 1) {
      updateItemToLocalStorage({
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
      });
      return {
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
      };
    } else {
      updateItemToLocalStorage({
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
        adonCart: [],
      });
      return {
        ...state,
        cart: state.cart.filter(c => c.productId !== action.payload.productId),
        adonCart: [],
      };
    }
  } else if (action.type == 'UPDATE_CART_PRODUCT') {
    updateItemToLocalStorage({
      ...state,
      cart: state.cart.map(c => {
        if (c.productId == action.payload.productId) {
          return action.payload;
        } else {
          return c;
        }
      }),
    });
    return {
      ...state,
      cart: state.cart.map(c => {
        if (c.productId == action.payload.productId) {
          return action.payload;
        } else {
          return c;
        }
      }),
    };
  } else {
    return state;
  }
};
