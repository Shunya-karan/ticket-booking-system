import api from "./api";

export const getAdminstats=()=>
    api.get("/admin/stats");

export const recentBookings=()=>
    api.get("/admin/recent-bookings");

export const popularRoutes=()=>
    api.get("/bus/popular-routes")

export const revenues=()=>
    api.get("/admin/revenue")

export const getUpcomingBuses=()=>
    api.get("/admin/upcoming-buses")

export const getActivebuses=()=>
    api.get("/admin/active-buses")

export const getAllBuses=()=>
    api.get("/admin/all")


export const deleteBus=(busid)=>
    api.delete(`/admin/delete/${busid}`)

export const BusBookingss=(busid)=>
    api.get(`/admin/bus/${busid}`);

export const addBus=(payload)=>
    api.post("/admin/add_bus", payload);

export const getBusById = (id) => api.get(`/admin/bus-detail/${id}`);

export const updateBus = (bus_id, data) => api.put(`/admin/update/${bus_id}`, data);

export const getAdminProfile = () => api.get("/admin/profile");

export const updateAdminProfile = (data) => api.put("/admin/profile", data);
