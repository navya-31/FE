import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "../../ReviewCard/ReviewCard";
import { getHotelByOwnerId } from "../../../actions/Hotels";
import { getReviewsByHotel } from "../../../actions/Reviews";
import DefaultMessage from "../../DefaultMessage/DefaultMessage";
import * as api from "../../../api/index";
import Footer from "../../Footer/Footer";

const Reviews = ({ setCurrentId }) => {
  //Need Hotel by owner ID
  //Need reviews by hotel ID

  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const { data } = await api.getHotelByOwnerId(user?.result?._id);
      if (data) setHotels([...hotels, data]);
      const newData = await api.getReviewsByHotel(data._id);
      if (newData) setReviews(newData.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : reviews.length === 0 ? (
        <DefaultMessage message="No reviews yet" />
      ) : (
        <Grid
          style={{ display: "block" }}
          container
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <DefaultMessage message="Your reviews" />
          </Grid>
          {reviews?.map((review) => (
            <Grid key={review._id} item xs={12} sm={12} md={6} lg={3}>
              <ReviewCard review={review} />
            </Grid>
          ))}
        </Grid>
      )}
      <Footer />
    </div>
  );
};

export default Reviews;
