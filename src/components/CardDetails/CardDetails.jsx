import React from 'react'
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./CardDetails.module.css";
import {Bar} from "react-chartjs-2";
import Moment from "react-moment";
const CardDetails = ({data_item}) => {

  const barChartTotalCases =(
    <Bar
      data={{
        labels : ["Bị nhiễm", "Hồi phục", "Tử vong"],
        datasets : [
          {
            label : "People",
            backgroundColor : [
              "rgba(0, 0, 255, 0.8)",            
              "rgba(0, 255, 0, 0.8)",
              "rgba(255, 0, 0, 0.8)"
            ],
            data : [data_item.confirmed, data_item.recovered, data_item.deaths]
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        responsive : true
      }}
    />
  )

  const barChartNewCases=(
    <Bar
      data={{
        labels : ["Bị nhiễm", "Hồi phục", "Tử vong"],
        datasets : [
          {            
            label : "People",            
            backgroundColor : [
              "rgba(0, 0, 255, 0.8)",            
              "rgba(0, 255, 0, 0.8)",
              "rgba(255, 0, 0, 0.8)"
            ],
            data : [data_item.new_confirmed, data_item.new_recovered, data_item.new_deaths]
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        responsive : true
      }}
    />
  )
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <h3 className={styles.title}>TỔNG SỐ TRƯỜNG HỢP</h3>
          <h5 className={styles.subtitle}><Moment format="DD-MM-YYYY HH:MM Z">{data_item.date}</Moment></h5>
        </div>        
        <div className={styles.content}>
          <div>Nhiễm bệnh:&nbsp; <span className={styles.new_confirmed}>{data_item.confirmed}</span></div>
          <div>Hồi phục:&nbsp; <span className={styles.new_recovered}>{data_item.recovered}</span></div>
          <div>Tử vong:&nbsp; <span className={styles.new_deaths}>{data_item.deaths}</span></div>
        </div>
        <div className={styles.chart}>
          {barChartTotalCases}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <h3 className={styles.title}>TRƯỜNG HỢP MỚI TRONG NGÀY</h3>
          <h5 className={styles.subtitle}> <Moment format="DD-MM-YYYY HH:MM Z">{data_item.date}</Moment></h5>
        </div>
        <div className={styles.content}>
          <div>Nhiễm bệnh:&nbsp; <span className={styles.new_confirmed}>{data_item.new_confirmed}</span></div>
          <div>Hồi phục:&nbsp; <span className={styles.new_recovered}>{data_item.new_recovered}</span></div>
          <div>Tử vong:&nbsp; <span className={styles.new_deaths}>{data_item.new_deaths}</span></div>
        </div>
        <div className={styles.chart}>
          {barChartNewCases}
        </div>
      </div>
    </div>
  )
}

CardDetails.propTypes = {
  data_item : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data_item : state.corona.data_item
})

export default connect(mapStateToProps)(CardDetails)
