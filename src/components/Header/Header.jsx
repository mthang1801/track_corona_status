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
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const listImages = [
  {
    imgPath:"images/corona-themes.png"
  },
  {
    imgPath:"images/corona-sub-theme-1.jpg"
  },
  {
    imgPath:"images/corona-sub-theme-2.png"
  }
];

const useStyles = makeStyles((theme) => ({
  root: {  
    flexGrow: 1,  
    maxWidth: 800 ,
    width : "100%",
    margin : "1rem auto",
    display : "flex",
    justifyContent : "center",
    flexDirection : "column",
    textAlign: "center"
  },  
  img: {
    height: 300,
    display: 'block',    
    margin : "auto",
    
    [theme.breakpoints.down("xs")] : {
      display : "none"
    },
    [theme.breakpoints.up("xs")] : {
      width : 350
    },
    [theme.breakpoints.up("sm")] : {
      width : 420
    },
 
    [theme.breakpoints.up("md")] : {
      width : 600,
      height : 350
    },
    [theme.breakpoints.up("lg")] : {
      width : 650,
      height : 350
    },
    [theme.breakpoints.up("xl")] : {
      width : 900,
      height : 500
    },
  
    
  },
}));

let Header = ({new_update : {date} }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);  
 
  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  return (
    <div className={classes.root}>     
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}        
        enableMouseEvents     
        className={styles.animation}  
      >
        {listImages.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>      
      <h1 className={styles.title}>ĐẠI DỊCH CORONAVIRUS 2020</h1>
      <h4 className={styles.subtitle}>Cập nhật vào lúc : <Moment format="HH:MM DD-MM-YYYY Z" >{date}</Moment></h4>
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
