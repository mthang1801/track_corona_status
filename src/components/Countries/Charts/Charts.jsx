import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Line} from "react-chartjs-2";
import styles from "./Charts.module.css";
const Charts = ({corona : {country}}) => {
  console.log(country);
  const ascendingData = [...country.timeline];
  ascendingData.reverse();
  const lineHistoryCountryData = (
    <Line
    options={{
      responsive : true ,
      maintainAspectRatio: false,
      scales :{
        xAxis : [{
          ticks : {
            fontSize : 10
          },             
          gridLineWidth: 0,               
        }],
        yAxis : [{
          ticks : {
            fontSize : 10,                
          },
          gridLineWidth: 0,
        }]
      },
      elements : {
        point : {
          radius : 2
        }
      }
    }}
    data={{
      labels : ascendingData.map(({date}) => date),
      datasets: [
        {
          label: "Xác nhận" ,
          data : ascendingData.map(({confirmed}) => confirmed),              
          strokeColor : "rgba(80,80,80)",
          showLine: true,
          fill : "none",   
          pointBorderWidth: 1,                          
        },
        {
          label: "Hồi phục" ,
          data : ascendingData.map(({recovered}) => recovered),
          backgroundColor : "rgba(0,255,0,.8)",                 
        },
        {
          label : "Tử vong",
          data : ascendingData.map(({deaths}) => deaths),
          backgroundColor : "rgba(255, 0, 0)",                              
        },
      ]
    }}
    />
  )
  return (
    <div className={styles.line_chart}>
      {lineHistoryCountryData}
    </div>
  )
}

Charts.propTypes = {
  corona : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  corona : state.corona
})


export default connect(mapStateToProps)(Charts)
