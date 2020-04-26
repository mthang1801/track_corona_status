import React from 'react'
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <ul>
      <li >
        <Link to="/global">Dữ liệu toàn cầu</Link>
      </li>
      <li>
        <Link to="/countries">Dữ liệu Quốc gia</Link>
      </li>
      
    </ul>
  )
}

export default Navbar
