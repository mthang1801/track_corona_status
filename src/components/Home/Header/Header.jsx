import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import styles from "./Header.module.css";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import covervid from "../../../Corona2.mp4"
let Header = ({new_update : {date} }) => {
  return (    
    <div className={styles.header}>
      <div className={styles.video} >
        <video autoPlay loop preload="auto" muted>
          <source src={covervid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       
      </div>
     
      <div className={styles.title}>
          <h1 className={styles.main}>dịch cúm vũ hán 2020</h1>
          <h2 className={styles.sub}>coronavirus sar-ncov-2</h2>
        </div>
    </div>
  );
}

Header.propTypes = {
  new_update : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  new_update : state.corona.new_update
})
export default connect(mapStateToProps)(Header);
