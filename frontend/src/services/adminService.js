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

export const deleteBus=(busid)=>
    api.delete(`/admin/delete/${busid}`)

export const BusBookingss=(busid)=>
    api.get(`/admin/bus/${busid}`);