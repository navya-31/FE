import React, { useState, useEffect } from "react";
import MealsheetForm from "../MealsheetForm/MealsheetForm";
import * as api from "../../../api/index";
import { CircularProgress } from "@material-ui/core";
import Menu from "../../Menu/Menu";
import DefaultMessage from "../../DefaultMessage/DefaultMessage";
import Footer from "../../Footer/Footer";

//Query to find the hotel from userId
//If the hotel has any mealsheet, then how today's menu, update meal system and delete mealsystem
//If they don't , just directly show MealsheetForm
function Mealsheet() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mealItems, setMealItems] = useState([]);
  const [tenants, setTenants] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await api.getHotelByOwnerId(user?.result?._id);
      if (data) setHotels([...hotels, data]);
      const newData = await api.getMealItemsByHotel(data._id);
      setMealItems(newData.data);
      const tens = await api.getTenantsByHotelId(data._id);
      setTenants(tens.data);
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
      ) : !hotels[0] ? (
        <DefaultMessage message="You do not have a hotel right now" />
      ) : hotels[0].has_meal_system && mealItems.length !== 0 ? (
        <Menu items={mealItems} tenants={tenants} />
      ) : (
        <MealsheetForm />
      )}
      <Footer />
    </div>
  );
}

export default Mealsheet;
