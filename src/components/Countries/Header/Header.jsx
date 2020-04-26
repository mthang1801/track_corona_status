import React from "react";
import styles from "./Header.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
const Header = ({ country , new_update}) => {
  return (
    <div className={styles.container}>
      { country && country.name ? (
        <React.Fragment>
           <h1 className={styles.title}>
            Bảng thống kê tình hình dịch bệnh{" "}
            <span className={styles.country}>{country.name === "World" ? "trên thế giới" : `tại ${country.name}`}</span>{" "}
          </h1>
          <h4>Cập nhật lúc : <Moment format="HH:MM DD-MM-YYYY">{country.updated_at}</Moment></h4> 
        </React.Fragment>
       
      ) : (
        <React.Fragment>
          <h1 className={styles.title}>DIỄN BIẾN DỊCH BỆNH TẠI CÁC QUỐC GIA</h1>
          <h4>Cập nhật lúc : <Moment format="HH:MM DD-MM-YYYY">{new_update.updated_at}</Moment></h4> 
        </React.Fragment>
      )}
    </div>
  );
};

Header.propTypes = {
  country: PropTypes.object,
  new_update : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  country: state.corona.country,
  new_update : state.corona.new_update
});

export default connect(mapStateToProps)(Header);
