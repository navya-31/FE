import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { Grid, TextField, Button, Card, CardContent, Typography,CircularProgress } from '@material-ui/core';
import RoomRequestList from '../../RoomRequests/RoomRequestList'; 
import * as api from '../../../api/index'
import Footer from "../../Footer/Footer";


function Homepage({ setCurrentId }) {

  const [user, setUser] = useState( JSON.parse(localStorage.getItem('profile')) )
  const [flag, setFlag] = useState(false)
  const dispatch = useDispatch();
  // const { hotelsLoading, hotels } = useSelector((state) => state.hotels);
  // const {roomRequests, roomRequestsLoading} = useSelector((state) => state.roomRequests)
  const [hotels, setHotels] = useState([])
  const [roomRequests, setRoomRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    try {
      console.log(user?.result?._id)
      const {data} = await api.getHotelByOwnerId(user?.result?._id)
      if(data)
      {
        setHotels([...hotels, data])
        const newData = await api.getRoomRequestsByHotelId(data._id)
        setRoomRequests(newData.data)
      }
      
      setLoading(false)
    } catch (error) {
      
      setHotels([])
      setRoomRequests([])
      setLoading(false)
    }
    
  }
  useEffect(()=> {
    fetchData()
   
  },[])
 
  return (
    <div>
    {
      loading? <CircularProgress/>:
      <RoomRequestList hotels={hotels} roomRequests={roomRequests}/>    
    }
    <Footer/>
    </div>
  )
}

export default Homepage
