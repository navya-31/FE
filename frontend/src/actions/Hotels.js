import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, FETCH_HOSTEL, END_LOADING, ERROR } from '../constants/actionTypes.js';

import * as api from '../api/index.js';
 
export const getHotels = ()  => async(dispatch) =>{
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHotels();
    
    dispatch({ type: FETCH_ALL, payload: { hotels: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
}
export const createHotel = (newHotel) => async (dispatch) =>{
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createHotel(newHotel)

      dispatch({ type: CREATE, payload: data })
      dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error.message);
  }
}

export const getHotelByOwnerId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHotelByOwnerId(id);
    
    dispatch({ type: FETCH_HOSTEL, payload: { hotel: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
};

export const getHotelByHotelId = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getHotelByHotelId(id);
    
    dispatch({ type: FETCH_HOSTEL, payload: { hotel: data } });
    dispatch({type: END_LOADING})
  } catch (error) {
    dispatch({type:ERROR})
    console.log(error);
  }
}
export const generateBill = (id) => async (dispatch)=>{
  try {
      dispatch({ type: START_LOADING });
      const {data} = await api.generateBill(id)
      dispatch({ type: UPDATE, payload: { hotel: data } });
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}
export const receiveBill = (uid) => async (dispatch)=>{
  try {
      dispatch({ type: START_LOADING });
      const {data} = await api.receiveBill(uid)
      dispatch({ type: UPDATE, payload: { hotel: data } });
      dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}