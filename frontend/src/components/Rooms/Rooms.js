import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import RoomCard from "../RoomCard/RoomCard.js";
import { getHotelByHotelId } from "../../actions/Hotels.js";
import Preview from "../RoomCard/Preview.js";

const Rooms = ({ setCurrentId, rooms }) => {
  const dispatch = useDispatch();

  return rooms.length === 0 ? (
    <Typography
      variant="h5"
      gutterBottom
      style={{ marginLeft: "10px", marginTop: "50px" }}
    >
      No Available rooms
    </Typography>
  ) : (
    <Grid
      container
      alignItems="stretch"
      spacing={1}
      style={{ display: "block" }}
    >
      {rooms?.map((room) => (
        <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
          <RoomCard room={room} />
        </Grid>
      ))}
    </Grid>
  );
};
export default Rooms;
