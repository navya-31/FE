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
import { Button, CircularProgress, Grid, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRoomRequest } from "../../actions/RoomRequests";
import image from "../../images/Avatar.png";
import quote from "../../images/quote.png";
import useStyles from "./styles.js";
import { getHotelByHotelId } from "../../actions/Hotels";
import { getTenantsByUserId } from "../../actions/Tenants";

function ReviewCard({ review, setCurrentId }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user?.result?._id;
  const classes = useStyles();

  const dateObject = new Date(review.date_posted);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = String(dateObject.getFullYear()).slice(-2);
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={image}></CardMedia>

      <Typography variant="body2" className={classes.quote}>
        “{" "}
      </Typography>
      <CardContent className={classes.overlay2}>
        <Typography variant="body2" color="textSecondary">
          {review.user_name} {formattedDate}
        </Typography>
        <Typography gutterBottom variant="h4">
          {review.comments}
        </Typography>
        <Rating precision={0.5} value={review.stars} readOnly></Rating>
      </CardContent>
    </Card>
  );
}

//{/* <Grid item xs={4}>
//    <Button variant='contained'className={classes.cardActions}>
//  Join meal system
// </Button>
// </Grid> */}
export default ReviewCard;
