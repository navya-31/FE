import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ReviewCard from "../../ReviewCard/ReviewCard";
import { getHotelByOwnerId } from "../../../actions/Hotels";
import { getRoomsByHotelId } from "../../../actions/Rooms";
import RoomCard from "./RoomCard";
import DefaultMessage from "../../DefaultMessage/DefaultMessage";
import * as api from "../../../api/index";
import Footer from "../../Footer/Footer";

const Rooms = ({ setCurrentId }) => {
  //Need Hotel by owner ID
  //Need reviews by hotel ID
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //const { rooms, roomsLoading } = useSelector((state) => state.rooms);
  //const { hotels,hotelsLoading } = useSelector((state) => state.hotels);

  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchKey, setSearchKey] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await api.getHotelByOwnerId(user?.result?._id);
      if (data) setHotels([...hotels, data]);
      const newData = await api.getRoomsByHotelId(data._id);
      if (newData) {
        setRooms(newData.data);
        setDuplicateRooms(newData.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //if (!rooms.length && !isLoading) return 'No rooms pending';

  function filterBySearch() {
    const tempRooms = duplicateRooms.filter((x) =>
      x.rent.toString().toLowerCase().includes(searchKey.toLowerCase())
    );

    setRooms(tempRooms);
  }

  return (
    <div>
      <div className="row mt-5 bs">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms by rent"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>

        {loading ? (
          <CircularProgress />
        ) : rooms.length === 0 ? (
          <DefaultMessage message="No rooms to show" />
        ) : (
          <Grid
            style={{ display: "block" }}
            container
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <DefaultMessage message="Your rooms" />
            </Grid>
            {rooms?.map((room) => (
              <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
                <RoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Rooms;
