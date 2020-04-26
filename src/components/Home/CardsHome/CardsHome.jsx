import React from 'react';
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";
import styles from "./CardsHome.module.css";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow : 1,
    margin : "2rem 0"
  },
  card : {
    [theme.breakpoints.down("lg")] : {
      width : 500
    },
    [theme.breakpoints.up("xs")] : {
      width : "90%",
      padding  :"2rem 4rem"
    },
    [theme.breakpoints.up("sm")] : {
      width : 350
    },    
    [theme.breakpoints.up("md")] : {
      width : 400
    },        
    [theme.breakpoints.up("lg")] : {
      width : 320,
      padding : "2rem"
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
    <Grid container spacing={6} justify="center" align="center" className={styles.container,classes.root} >
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(classes.card, styles.confirmed)}>
          <CardContent className={styles.card_item}>
            <Typography className={styles.title}>Nhiễm bệnh</Typography>
            <Typography className={clsx(styles.subtitle)}><CountUp start={0} end={confirmed} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Card>
        
      </Grid>
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(classes.card, styles.recovered)}>
          <CardContent className={styles.card_item}>
            <Typography className={clsx(styles.title)}>Hồi phục</Typography>
            <Typography className={clsx(styles.subtitle,styles.text_recovered)}><CountUp start={0} end={recovered} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Card>      
      </Grid>
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(classes.card, styles.deaths)}>
          <CardContent className={styles.card_item}>
            <Typography className={styles.title}>Tử vong</Typography>
            <Typography className={clsx(styles.subtitle, styles.sub_deaths)}><CountUp start={0} end={deaths} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Card>     
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
