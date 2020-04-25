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

const Cards = ({new_update : {confirmed, recovered, deaths, date}}) => {
  return(
    <Grid container spacing={3} justify="center" align="center" className={styles.container} >
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(styles.card, styles.confirmed)}>
          <CardContent className={styles.card_item}>
            <Typography className={styles.title}>Nhiễm bệnh</Typography>
            <Typography className={clsx(styles.subtitle)}><CountUp start={0} end={confirmed} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Card>
        
      </Grid>
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(styles.card, styles.recovered)}>
          <CardContent className={styles.card_item}>
            <Typography className={clsx(styles.title)}>Hồi phục</Typography>
            <Typography className={clsx(styles.subtitle,styles.text_recovered)}><CountUp start={0} end={recovered} duration={2.5} separator="."></CountUp></Typography>
          </CardContent>
        </Card>      
      </Grid>
      <Grid item xs={12} lg={4} xl={3} className={styles.grid}>
        <Card className={clsx(styles.card, styles.deaths)}>
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
