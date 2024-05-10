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
import { Button, CircularProgress, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../../actions/RoomRequests.js";
import img from "../../images/livingRoom1.jpg";
import useStyles from "./styles.js";
import { getHotelByHotelId } from "../../actions/Hotels.js";
import { getTenantsByUserId } from "../../actions/Tenants.js";
import { leaveRoom } from "../../actions/Rooms.js";
import Swal from "sweetalert2";
import * as api from "../../api/index";

function HotelCard({ currentUser, currentHotel, currentTenant, setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?.result?._id;
  const classes = useStyles();

  useEffect(() => {}, []);

  const date = new Date(currentTenant[0].starting_date);
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

  const leave = async () => {
    try {
      console.log(
        currentTenant.room_id,
        currentTenant.user_id,
        currentHotel._id
      );

      Swal.fire({
        title: "Are you sure you want to leave? this action cannot be reversed",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Leave",
        denyButtonText: `Stay`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await api.leaveRoom(
            currentTenant[0].room_id,
            currentTenant[0].user_id,
            currentHotel[0]._id
          );
          Swal.fire("Saved!", "", "success").then(() => {
            navigate("/Homepage");
          });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {}
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={img}></CardMedia>
      <CardContent className={classes.overlay}>
        <Typography variant="body1">
          Hello, {currentUser.result.name}!
        </Typography>
        <Typography variant="body2" style={{ marginLeft: "312px" }}>
          Tenant since {monthNames[date.getMonth()]} {date.getFullYear()}
        </Typography>
      </CardContent>

      <CardContent className={classes.overlay2}>
        <Typography gutterBottom variant="h4">
          You are living in {currentTenant[0].hotel_name} in Room #
          {currentTenant[0].room_number}
        </Typography>
        <Typography variant="body2">
          Every hotel has a meal system in place. As part of this system, we
          ensure that every guest receives at least one grocery shopping chore
          per person, every month. With our meal system, you get to enjoy
          homemade quality meals prepared fresh every day for both lunch and
          dinner. Our goal is to provide you with delicious and nutritious meals
          that will make your stay even more enjoyable. <p></p>Care to join us
          for a delightful dining experience?
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button onClick={leave} style={{ color: "white" }}>
          {" "}
          Leave{" "}
        </Button>
      </CardActions>
    </Card>
  );
}

// {/* <Grid item xs={4}>
//    <Button variant='contained'className={classes.cardActions}>
//  Join meal system
// </Button>
// </Grid> */}
export default HotelCard;
