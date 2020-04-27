import React from 'react';
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";
import styles from "./CardsHome.module.css";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow : 1,
    margin : "2rem 0",
    [theme.breakpoints.down("sm")] : {
      padding : 0
    },
  },
  card : {
    [theme.breakpoints.down("lg")] : {
      width : 500
    },
    [theme.breakpoints.up("xs")] : {
      width : "90%",
      padding  :"0"
    },
    [theme.breakpoints.up("sm")] : {
      width : 350
    },    
    [theme.breakpoints.up("md")] : {
      width : 400
    },        
    [theme.breakpoints.up("lg")] : {
      width : 320,
      padding : "2rem 4rem"
    },    
    [theme.breakpoints.up("xl")] : {
      marginRight : "2rem",
      width : 400
    },            
    padding : "4rem 5rem"
  }
}))
const Cards = ({new_update : {confirmed, recovered, deaths, date}}) => {
  const classes = useStyles();
  return(
    <Grid container spacing={2} justify="space-between" align="center" className={clsx(styles.container,classes.root)} >
      <Grid item xs={12} lg={3}  className={styles.grid}>
        <Box component={Card} className={clsx(classes.card, styles.confirmed)} boxShadow={4}>
          <CardContent className={styles.card_item}>
            <Typography className={styles.title}>Nhiễm bệnh</Typography>
            <Typography className={clsx(styles.subtitle)}><CountUp start={0} end={confirmed} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Box>
        
      </Grid>
      <Grid item xs={12} lg={3}  className={styles.grid}>
        <Box component={Card} className={clsx(classes.card, styles.recovered)} boxShadow={4} >
          <CardContent className={styles.card_item}>
            <Typography className={clsx(styles.title)}>Hồi phục</Typography>
            <Typography className={clsx(styles.subtitle,styles.text_recovered)}><CountUp start={0} end={recovered} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Box>      
      </Grid>
      <Grid item xs={12} lg={3}  className={styles.grid}>
        <Box component={Card} className={clsx(classes.card, styles.deaths)} boxShadow={4}>
          <CardContent className={styles.card_item}>
            <Typography className={styles.title}>Tử vong</Typography>
            <Typography className={clsx(styles.subtitle, styles.sub_deaths)}><CountUp start={0} end={deaths} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Box>     
      </Grid>
    </Grid>
  )
}

Cards.propTypes = {
  new_update : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  new_update :  state.corona.new_update
})
export default connect(mapStateToProps)(Cards)
