import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@material-ui/core/";
import Rating from "@mui/material/Rating";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../../actions/RoomRequests";
import img1 from "../../images/livingRoom1.jpg";
import img2 from "../../images/livingRoom2.jpg";
import img3 from "../../images/livingRoom3.jpg";
import useStyles from "./styles.js";
import { getHotelByHotelId } from "../../actions/Hotels.js";
import { getTenantsByUserId } from "../../actions/Tenants";
import { createSelector } from "reselect";
import Swal from "sweetalert2";
import * as api from "../../api/index";

function RoomCard({ room, setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?.result?._id;
  const classes = useStyles();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stars, setStars] = useState(-1.0);
  const [hasBooked, setHasBooked] = useState(false);
  const [randomImage, setRandomImage] = useState("");

  const images = [img1, img2, img3];

  const fetchData = async () => {
    try {
      if (images.length > 0) {
        setRandomImage(images[Math.floor(Math.random() * images.length)]);
      }

      const { data } = await api.getTenantsByUserId(user?.result?._id);
      setTenants([...tenants, data]);
      const newData = await api.getHotelByHotelId(room.hotel_id);
      setHotels([...hotels, newData.data]);
      const revs = await api.getReviewsByHotel(room.hotel_id);
      const booking = await api.getRoomRequestsByUserId(user?.result?._id);
      if (
        booking.data.length === 0 ||
        booking.data[0].user_id !== user?.result?._id
      )
        setHasBooked(false);
      else setHasBooked(true);
      console.log(booking.data);
      if (revs.data.length) {
        let sum = 0;
        for (let i = 0; i < revs.data.length; i++) {
          sum += revs.data[i].stars;
        }
        setStars(sum / revs.data.length);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const book = () => {
    //Use getTenant by userID
    var date = new Date();
    const curForm = {
      user_id: userId,
      user_name: user?.result?.name,
      user_phone: user?.result?.phone,
      room_id: room._id,
      room_number: room.room_number,
      hotel_id: room.hotel_id,
      hotel_name: "",
      date_issued: date,
    };
    console.log(tenants);
    if (tenants[0].has_booked === true) {
      Swal.fire({
        title: "You already have a  booking, go to hotel page to cancel",
        confirmButtonColor: "#3a3b7b",
      });
    } else {
      //const confirm  = prompt('You can only book one room at a time.Type confirm and ok to Continue?','confirm')

      Swal.fire({
        title: "Confirm booking? You can't book other rooms after this",
        showCancelButton: true,
        confirmButtonText: "Save",
        confirmButtonColor: "#3a3b7b",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.createRoomRequest(curForm);
          Swal.fire({
            title: "Booking Complete!",
            icon: "success",
            confirmButtonColor: "#3a3b7b",
          }).then(() => {
            window.location.reload(false);
          });
          // dispatch(createRoomRequest(curForm)).then(()=>{
          //     Swal.fire('Booking complete!', '', 'success' , )

          // })
        }
      });
    }
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(room.next_vacancy_date);

  return loading ? (
    <CircularProgress />
  ) : (
    <Card raised elevation={6} className={classes.card}>
      <CardMedia className={classes.media} image={randomImage}></CardMedia>
      <CardContent className={classes.overlay}>
        <Typography gutterBottom variant="h6" component="div">
          {room.hotel_name}
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          Address: {room.hotel_address}
        </Typography>
        <Typography variant="body2">Room number: {room.room_number}</Typography>
        <Typography variant="body2">Type of room: {room.type}</Typography>
        <Typography variant="body2">Rent: {room.rent} $</Typography>
        <Typography variant="body2">Area: {room.area} m2</Typography>
      </CardContent>
      <CardContent className={classes.overlay2}>
        <Typography variant="body2">
          Free from {monthNames[date.getMonth()]} {date.getFullYear()}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {stars === -1 ? (
          <Typography>No reviews yet</Typography>
        ) : (
          <Rating
            size="small"
            name="half-rating-read"
            defaultValue={stars}
            precision={0.001}
            readOnly
          />
        )}
        {hasBooked ? (
          <Button disabled size="small" style={{ color: "#3a3b7b" }}>
            Booked
          </Button>
        ) : (
          <Button size="small" onClick={book} style={{ color: "#3a3b7b" }}>
            Book now
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default RoomCard;
