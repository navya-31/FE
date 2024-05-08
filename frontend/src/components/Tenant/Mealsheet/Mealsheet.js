import React, { useState, useEffect } from "react";
import * as api from "../../../api/index";
import { CircularProgress, Grid, Typography, Button } from "@material-ui/core";
import DefaultMessage from "../../DefaultMessage/DefaultMessage";
import ItemCard from "../../Menu/ItemCard";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Footer from "../../Footer/Footer";

function Mealsheet() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mealItems, setMealItems] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data } = await api.getTenantsByUserId(user?.result?._id);
      setTenants([...tenants, data]);
      const hotelData = await api.getHotelByHotelId(data.hotel_id);
      setHotels([...hotels, hotelData.data]);
      const newData = await api.getMealItemsByHotel(data.hotel_id);
      setMealItems(newData.data);
      const date = new Date();
      const idx = date.getDay() % newData.data.length;
      setItem(newData.data[idx]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const leave = () => {
    Swal.fire({
      title: "Are you sure you want to leave the meal system?",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#3a3b7b",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await api.updateTenant(tenants[0]._id, { joined_meal_system: false });

        Swal.fire({
          title: "You will be redirected soon",
          timer: 1500,
          timerProgressBar: true,
        });
        navigate("/Homepage");
      }
    });
  };
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : hotels.length === 0 || !hotels[0] ? (
        <DefaultMessage message="You are not part of any hotel" />
      ) : !tenants[0].joined_meal_system ? (
        <DefaultMessage message="You are not part of the meal system yet. Go to hotel page to join" />
      ) : !hotels[0].has_meal_system ? (
        <DefaultMessage message="Your owner has not created any meal sheet yet" />
      ) : (
        <Grid container spacing={2} display="flex">
          <Grid item xs={6} md={8}>
            <DefaultMessage message="What's in the menu for today?" />
            <ItemCard item={item} />
          </Grid>
          <Grid item xs={6} md={4}>
            <DefaultMessage message="Do you want to leave this meal system?" />
            <Button
              style={{
                backgroundColor: "#3a3b7b",
                color: "white",
                poasition: "absolute",
                left: "80%",
              }}
              onClick={leave}
            >
              Leave
            </Button>
          </Grid>
        </Grid>
      )}
      <Footer />
    </div>
  );
}

export default Mealsheet;
