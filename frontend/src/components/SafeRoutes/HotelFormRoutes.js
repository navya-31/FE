import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHotelByOwnerId } from '../../actions/Hotels'
import HotelForm from '../Owner/HotelForm/HotelForm';
import BadGateway from './BadGateway';
function HotelFormRoutes() {
    const user = JSON.parse(localStorage.getItem('profile'));
    const {hotels} = useSelector((state) => state.hotels)
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(getHotelByOwnerId(user?.result?._id))   
    },[])
  return (
        hotels.length !== 0?(<BadGateway/>):(
          <HotelForm/>
        )
        //  hotels === null || hotels.length !==0 ?(
            
        //     <BadGateway/>
        // ):
        // (
        //     <HotelForm/>
        // )
    
  )
}

export default HotelFormRoutes
