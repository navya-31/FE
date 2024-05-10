import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Grid, CircularProgress } from "@material-ui/core";
import RoomCard from "../../RoomCard/RoomCard";
import Rooms from "../../Rooms/Rooms.js";
import { getTenantsByUserId } from "../../../actions/Tenants";
import { getEmptyRooms } from "../../../actions/Rooms";
import * as api from "../../../api/index";
import Footer from "../../Footer/Footer";

import "antd/dist/reset.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

//This will have a population of all the room cards
function Homepage({ setCurrentId }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [rooms, setRooms] = useState([]);
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [searchKey2, setSearchKey2] = useState("");
  const [type, setType] = useState("all");

  //if (!rooms.length && !isLoading) return 'No rooms pending';

  const CustomSelect = styled.select`
    border: 2px solid #ced4da;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    background-color: #fff;
    width: 7rem; /* Adjust width as needed */

    &:hover {
      border-color: #6c757d; /* Change border color on hover */
    }

    &:focus {
      border-color: #66afe9; /* Change border color when focused */
      box-shadow: 0 0 5px rgba(102, 175, 233, 0.5); /* Add box shadow when focused */
    }
  `;

  const fetchData = async () => {
    const newData = await api.getEmptyRooms();
    setRooms(newData.data);
    setDuplicateRooms(newData.data);
    console.log(newData.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  function filterByDate(dates) {
    // console.log(moment(dates[0]).format("DD-MM-YYYY"));
    // console.log(moment(dates[1]).format("DD-MM-YYYY"));
    try {
      setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
      setToDate(moment(dates[1]).format("DD-MM-YYYY"));

      var tempRooms = [];
      for (const room of duplicateRooms) {
        var availability = false;
        if (room.currentbookings.length > 0) {
          for (const booking of room.currentbookings) {
            if (
              !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              ) &&
              !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
                booking.fromdate,
                booking.todate
              )
            ) {
              if (
                moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
                moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
              ) {
                availability = true;
              }
            }
          }
        }
        //
        if (availability == true || room.currentbookings.length == 0) {
          tempRooms.push(room);
        }
      }
      setRooms(tempRooms);
    } catch (error) {}
  }

  function filterBySearchLevel() {
    const tempRooms = duplicateRooms.filter(function (x) {
      var num = Math.floor(parseInt(x.room_number) / 100);
      if (isNaN(searchKey) || !searchKey || parseInt(searchKey) === 0) {
        console.log("searchKey is not a valid integer.");
        return x.room_number.toString().toLowerCase();
      } else {
        return (
          parseInt(searchKey) < (num + 1) * 100 &&
          num.toString().toLowerCase().includes(searchKey.toLowerCase()[0])
        );
      }
    });

    setRooms(tempRooms);
  }

  function filterByType(type) {
    setType(type);
    console.log(type);
    if (type !== "all") {
      const tempRooms = duplicateRooms.filter(
        (x) => x.type.toLowerCase() == type.toLowerCase()
      );
      setRooms(tempRooms);
    } else {
      setRooms(duplicateRooms);
    }
  }

  return (
    <div className="container">
      <div className="row mt-5 bs">
        <div
          className="col-md-3"
          style={{
            display: "flex",
            justifyContent: "space-between",
            border: "2px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        >
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />

          <input
            type="text"
            placeholder="Search rooms by level"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearchLevel}
            style={{
              width: "30rem",
              padding: "12px 20px",
              margin: "10px 10px",
              boxSizing: "border-box",
              border: "2px solid #ccc",
              borderRadius: "10px",
              fontSize: "16px",
              backgroundColor: "#f8f8f8",
              outline: "none",
            }}
          />

          <CustomSelect
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="standart">Standart</option>
            <option value="lux">Lux</option>
            <option value="family">Family</option>
          </CustomSelect>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <Rooms
            rooms={rooms?.sort((room1, room2) => {
              const roomNumber1 = parseInt(room1.rent);
              const roomNumber2 = parseInt(room2.rent);

              if (roomNumber1 < roomNumber2) {
                return -1;
              } else if (roomNumber1 > roomNumber2) {
                return 1;
              } else {
                return 0;
              }
            })}
          />
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
