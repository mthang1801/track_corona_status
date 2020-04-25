import React from 'react'
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";
const Navbar = () => {
  return (
    <ul>
      <li >
        <Link to="/global">Dữ liệu</Link>
      </li>
      <li>
        <Link to="/countries">Quốc gia</Link>
      </li>
      <li>
        <Link to="/statistic">Bảng thống kê</Link>
      </li>
      <li className="hide-xs">
        <Link to="/symptoms">Triệu chứng</Link>
      </li>
      <li className="hide-sm hide-xs">
        <Link to="/instructs">Chỉ dẫn</Link>
      </li>
      <li className="hide-sm hide-xs">
        <Link to="/news">Tin tức</Link>
      </li>
    </ul>
  )
}

export default Navbar
