/* eslint-disable no-unused-vars */
import React from "react";
import myPhoto from '../assets/logo.png';

function NavBar() {
    return (
        <div className="h-10 w-[100%] m-1 p-1 flex justify-between align-middle absolute top-0" >
            <img src={myPhoto} alt="" className="w-[200px] h-[50px]  relative to" />
        </div>
    )
};
export default NavBar