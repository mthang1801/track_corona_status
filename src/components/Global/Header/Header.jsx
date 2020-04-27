import React from 'react'
import Moment from "react-moment";
import styles from "./Header.module.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
const Header = ({corona : {data_item}}) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>DIỄN BIẾN DỊCH VIRUS CORONA TRÊN TOÀN CẦU</h1>
      <h4>Dữ liệu ngày : <Moment format="DD-MM-YYYY">{data_item.date}</Moment></h4>
    </div>
  )
}

Header.propTypes = {
  corona : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  corona : state.corona
})
export default connect(mapStateToProps)(Header)
