import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import Input from "../../Input/Input.js";
import { createHotel } from "../../../actions/Hotels.js";
import * as api from "../../../api/index.js";
import Swal from "sweetalert2";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import parseMax from "libphonenumber-js/max";
import Footer from "../../Footer/Footer.js";

function HotelForm() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const initialState = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [form, setForm] = useState(initialState);
  const [phoneNumber, setPhoneNumber] = useState("0");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
      Swal.fire({
        text: "That is an invalid phone number!",
        customClass: {
          container: "position-absolute",
        },
        confirmButtonColor: "#3a3b7b",
        toast: true,
        position: "top-end",
      });
    } else {
      const curState = {
        name: form.name,
        address: form.address,
        phone: phoneNumber,
        owner_name: user?.result?.name,
        owner_id: user?.result?._id,
      };
      await api.createHotel(curState);
      Swal.fire({
        icon: "success",
        title: "Hotel created!",
        confirmButtonColor: "#3a3b7b",
      }).then(() => {
        navigate("/Homepage");
      });
    }

    // dispatch(createHotel(curState)).then(()=>{
    //     navigate('/Homepage')
    // })
  };
  return (
    <div>
      <Typography gutterBottom variant="h3" align="center">
        Create new hotel
      </Typography>
      <Grid>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Public new hotel
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Fill up the form and our team will get back to you within 24
              hours.
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Input
                    isRequired={true}
                    name="name"
                    label="Enter name of hotel"
                    handleChange={handleChange}
                    type="text"
                  />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Input
                    isRequired={true}
                    name="address"
                    label="Address"
                    handleChange={handleChange}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    isRequired={true}
                    name="email"
                    label="Email Address"
                    handleChange={handleChange}
                    type="email"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                                <Input name="phone" label="Phone Number" handleChange={handleChange} type="number" />
                              </Grid> */}
                <Grid item xs={12} sm={12}>
                  <MuiPhoneNumber
                    variant="outlined"
                    name="phone"
                    fullWidth
                    required
                    label="phone"
                    defaultCountry={"ru"}
                    onChange={(c, t) => {
                      console.log(c, t);
                      setPhoneNumber(c);
                      return true;
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#3a3b7b" }}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Footer />
    </div>
  );
}

export default HotelForm;
