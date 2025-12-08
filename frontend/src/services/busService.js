import api from "./api";

export const BUSdetails=(busId)=>
    api.get(`/bus/${busId}`);

export const SEARCHbus=(from,to,date)=>
     api.get(`/bus/search?from=${from}&to=${to}&date=${date}`);

export const GetpopularRoutes = ()=>
    api.get("/bus/popular-routes");

export const GetActiveBus = ()=>
    api.get("/bus/list");
