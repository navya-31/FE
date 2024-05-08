import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_HOSTEL, ERROR } from '../constants/actionTypes'

export default (state = { hotelsLoading: true, hotels: [] }, action) => {
    switch(action.type)
    {
        case 'START_LOADING':
            return { ...state, hotelsLoading: true }
        case 'END_LOADING':
            return { ...state, hotelsLoading: false }
        case FETCH_ALL:
            return action.payload
        case CREATE:
            return { ...state, hotels: [...state.hotels, action.payload] };
        case FETCH_HOSTEL:
             return{ ...state, hotels: action.payload.hotel };
        case ERROR:
            return {...state, hotelsLoading:false,hotels: []}
        default:
            return state
    }
}