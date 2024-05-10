import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const createRoom = (newRoom) => API.post("/rooms", newRoom);

export const getHotels = () => API.get("/hotels");
export const getUserByEmail = (email) => API.post(`/user/${email}`, email);

export const createHotel = (newHotel) => API.post("/hotels", newHotel);
export const getHotelByOwnerId = (id) => API.get(`/hotels/o/${id}`);

export const getEmptyRooms = () => API.get("/rooms/available/");
export const getRoomsByRoomId = (id) => API.get(`/rooms/${id}`);

export const createRoomRequest = (newRoomRequest) =>
  API.post("/roomRequests", newRoomRequest);

export const createReview = (newReview) => API.post("/reviews", newReview);

export const createComplaint = (newComplaint) =>
  API.post("/complaints", newComplaint);

export const getRoomRequestsByHotelId = (id) =>
  API.get(`/roomRequests/h/${id}`);

export const updateTenant = (id, updatedTenant) =>
  API.patch(`/tenants/${id}`, updatedTenant);

export const getTenantsByUserId = (id) => API.get(`/tenants/${id}`);

export const bookRoom = (id, uid, hid) =>
  API.patch(`/rooms/book/r/${id}/u/${uid}/h/${hid}`);

//router.delete('/:id', auth, deleteRoomRequest);
export const deleteRoomRequest = (id) => API.delete(`/roomRequests/${id}`);

export const getHotelByHotelId = (id) => API.get(`/hotels/h/${id}`);

// router.get('/userhotel/:uid/:hid',getReviewsByUserAndHotel);

export const getReviewsByUserAndHotel = (uid, hid) =>
  API.get(`reviews/userhotel/${uid}/${hid}`);
export const getReviewsByHotel = (id) => API.get(`/reviews/h/${id}`);

// router.patch('/update/:uid',updateuser)
export const updateuser = (uid, newUser) =>
  API.patch(`/user/update/${uid}`, newUser);
// router.patch('/:id',auth,updateReview);
export const updateReview = (id, newReview) =>
  API.patch(`/reviews/${id}`, newReview);

export const getComplaintsByHotel = (id) => API.get(`/complaints/h/${id}`);

// router.patch('/leave/r/:id/u/:uid/h/:hid',auth,leaveRoom);
export const leaveRoom = (id, uid, hid) =>
  API.patch(`/rooms/leave/r/${id}/u/${uid}/h/${hid}`);

// router.get('/h/:id',getTenantsByHotelId);
export const getTenantsByHotelId = (id) => API.get(`/tenants/h/${id}`);

// router.get('/:id',getuserbyuserid);
export const getuserbyuserid = (id) => API.get(`/user/${id}`);

// router.get('/h/:id',getRoomsByHotelId)
export const getRoomsByHotelId = (id) => API.get(`/rooms/h/${id}`);

// router.delete('/:id',auth,deleteComplaint);
export const deleteComplaint = (id) => API.delete(`/complaints/${id}`);

// router.patch('/bills/create/:id',generateBill);
export const generateBill = (id) => API.patch(`/hotels/bills/create/${id}`);

// router.patch('/bills/receive/:uid',receiveBill);
export const receiveBill = (uid) => API.patch(`/hotels/bills/receive/${uid}`);

// router.get('/h/:id',getMealItemsByHotel);

export const getMealItemsByHotel = (id) => API.get(`/mealItems/h/${id}`);
// router.post('/',auth,createMealItem);

export const createMealItem = (newMealItem) =>
  API.post("/mealItems", newMealItem);

// router.patch('/:id', auth, updateHotel);
export const updateHotel = (id, newHotel) =>
  API.patch(`/hotels/${id}`, newHotel);

// router.delete('/:id',auth,deleteMealItem);
export const deleteMealItem = (id) => API.delete(`/mealItems/${id}`);

// router.get('/u/:id',getRoomRequestsByUserId);
export const getRoomRequestsByUserId = (id) => API.get(`/roomRequests/u/${id}`);

// // router.get('/u/:id',getRoomRequestsByUserId);
// export const getRoomRequestsByUserId = (id) => API.get(`/roomRequests/u/${id}`)
