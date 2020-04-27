import React, {useEffect} from 'react'
import {Header, Tables, StatisticCards, Charts} from "../../components/Countries";
import {connect} from "react-redux";
import {Spinner} from "../../components";
import {clearCountry} from "../../actions/corona";
import PropTypes from "prop-types";
import styles from "./Countries.module.css";
import {Link} from "react-router-dom";
const Countries = ({corana : {countries, country, loading }, clearCountry}) => {  
  useEffect( () => {  
    if(country){
      clearCountry();
    }   
  },[loading]);
  if(!countries.length){
    return <Spinner/>
  }
  return (
    <div style={{margin: "2rem"}}>      
      <Header/>  
      {country &&  <StatisticCards/>}  
      {country && <Charts/>}
      <Tables />
      <Link to="/"><i className="fas fa-arrow-left"></i> Trở về trang chủ</Link>
      <div style={{float:"right"}}>
        <Link to="/global"> Xem dữ liệu toàn cầu <i className="fas fa-arrow-right"></i></Link>
      </div>
    </div>
  )
}

Countries.propTypes = {
  corana : PropTypes.object.isRequired,
  clearCountry : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  corana : state.corona,
})

export default connect(mapStateToProps, {clearCountry})(Countries)
