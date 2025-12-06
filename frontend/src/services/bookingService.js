import api from "./api";

export const getMyBookings = () => 
    api.get("/booking/my-bookings");

export const CancelSelectedSeats = (bookingId, seats) =>
  api.patch(`/booking/cancel-seats/${bookingId}`, { seats });




export const BOOKINGseats = (busId,selectedSeats,passengers)=>
    api.post("/booking/book", {
        bus_id: busId,
        seats: selectedSeats,
        passengers,
});