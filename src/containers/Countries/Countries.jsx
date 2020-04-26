import React, {useEffect} from 'react'
import {Header, Tables, StatisticCards, Charts} from "../../components/Countries";
import {connect} from "react-redux";
import {Spinner} from "../../components";
import {clearCountry} from "../../actions/corona";
import PropTypes from "prop-types";
import styles from "./Countries.module.css";
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
