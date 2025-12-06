import api from "./api";

export const PostlogIn=(email,password)=>
    api.post("/auth/signin", {email, password });

export const PostSignUp=(name,email,password)=>
    api.post("/auth/signup", { name, email, password });

