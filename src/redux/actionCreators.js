import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders
    }
}

export const loadOrdersDjangoREST = orders => {
    return {
        type: actionTypes.LOAD_ORDERS_DJANGO_REST,
        payload: orders
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

export const fetchOrders = (token,userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://react-burger-builder-f10e3-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
    .then(response => dispatch(loadOrders(response.data)))
    .catch(err => {
        dispatch(orderLoadFailed());
    });
}

export const fetchOrdersDjangoREST = (token,userId) => dispatch => {
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    axios.get(`http://127.0.0.1:8000/api/order/?id=${userId}`) // #,header)
    .then(response => dispatch(loadOrdersDjangoREST(response.data)))
    .catch(err => {
        console.log(err);
        dispatch(orderLoadFailed());
    });
}

