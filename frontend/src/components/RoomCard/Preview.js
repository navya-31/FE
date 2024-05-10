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
import { createRoomRequest } from "../../actions/RoomRequests";
import image from "../../images/searching.png";
import useStyles from "./styles.js";
import { getHotelByHotelId } from "../../actions/Hotels.js";
import { getTenantsByUserId } from "../../actions/Tenants";
import RoomCard from "./RoomCard";

function Preview({ room, setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?.result?._id;
  useEffect(() => {
    dispatch(getHotelByHotelId(room.hotel_id));
  }, []);

  return <RoomCard room={room} />;
}

export default Preview;
