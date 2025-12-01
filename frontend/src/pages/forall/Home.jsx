import { useState } from "react";
import AuthNavbar from "../../components/AuthNavbar"

const Home = ()=>{
    return(
        <div>
        <AuthNavbar
        signinorsignup="Sign up"
          signinorsignuppath="/signup"/>
        </div>
    )
}
export default Home



