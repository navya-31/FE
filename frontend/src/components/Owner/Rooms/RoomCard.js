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
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import img1 from "../../../images/livingRoom1.jpg";
import img2 from "../../../images/livingRoom2.jpg";
import img3 from "../../../images/livingRoom3.jpg";
import useStyles from "./styles.js";

function RoomCard({ room, setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?.result?._id;
  const classes = useStyles();
  const [randomImage, setRandomImage] = useState("");

  //const {tenants} = useSelector((state) => state.tenants)
  // console.log(tenants)

  const images = [img1, img2, img3];

  useEffect(() => {
    // if(tenants.length === 0)dispatch(getTenantsByUserId(user?.result?._id))
    if (images.length > 0) {
      setRandomImage(images[Math.floor(Math.random() * images.length)]);
    }
  }, []);

  console.log(images);
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
  console.log(date);

  return (
    <Card raised elevation={6} className={classes.card}>
      <CardMedia className={classes.media} image={randomImage}></CardMedia>
      <CardContent className={classes.overlay}>
        <Typography gutterBottom variant="h6" component="div">
          Room #{room.room_number}
        </Typography>
        <Typography variant="body2">Type: {room.type}</Typography>
        <Typography variant="body2">Rent: {room.rent} $</Typography>
        <Typography variant="body2">Area: {room.area} m2</Typography>
        {date.getFullYear() === 3000 ? (
          <Typography
            variant="body2"
            style={{ background: "#fc6d6d", borderRadius: "2px" }}
          >
            Vacancy status: Occupied
          </Typography>
        ) : (
          <Typography
            variant="body2"
            style={{ background: "#95f5af", borderRadius: "2px" }}
          >
            Vacancy status: Empty
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default RoomCard;
